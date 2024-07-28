import * as React from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import SignOut from '../SignOut';
import SignIn from '../signIn';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, CircularProgress, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { db } from '../firebaseConfig';
import {  doc, getDoc,setDoc,updateDoc } from 'firebase/firestore/lite';
import MyDialog from '../SetTargetDialog';
import { toast } from 'react-toastify';
import CurrentTargetDialog from './setCurrentTarget';
import dayjs from 'dayjs';

 
 const indexToSalahMap = {
  0:"Fajr",
  1:"Zohr",
  2:"Asr",
  3:"Magrib",
  4:"Isha",
  5:"Vitr"
 }
export default function DatePickerValue() {
  const [isDialogOpen,setIsDialogOpen] = React.useState(false);
  const [tableData,setTableData] = React.useState([]);
  const [isPerformanceDialogOpen,setIsPerformanceDialogOpen] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [isUserDataExist,setIsUserDataExist] = React.useState(false);
  const [qazaNamazData,setQazaNamazData] = React.useState({data:[], target:{years:0,months:0,days:0}});
  const [docRef,setDocRef] = React.useState(null);
  const [loading,setLoading] = React.useState(false);
  const [format] = React.useState({
    target:{
      years:0,months:0,days:0, individual:new Array(6).fill(0)
    },
    data:[{
      date:dayjs().format("DD-MMMM-YYYY"),
      days:0,individual:new Array(6).fill(0)
    }]
  })
  
  async function updateDocumentField(collectionName, documentId, data) {
    setLoading(true);
    try {
      const docRef = doc(db, collectionName, documentId);
      let docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
       await updateDoc(docRef, data).then( (el)=>{
        
       }).catch((err)=>{toast.error(err)});
       
       docSnap = await getDoc(docRef)
       setQazaNamazData({...docSnap.data()})
      } else {
        // Document does not exist, create it
         await setDoc(docRef, data);
         docSnap = await getDoc(docRef)
         setQazaNamazData({...docSnap.data()})
        setIsUserDataExist(true);
      }
    } catch (error) {
    } finally{
      setLoading(false);
    }
  }
  
  const changeTarget = (years,months,days)=>{
    if(years+months+days === 0){
      toast.error('Invalid selection');
      
      return;
    }
     setIsDialogOpen(true);
     
    updateDocumentField('qaza_namaz',user?.email,{...qazaNamazData,data:[{
      date:dayjs().format("DD-MMMM-YYYY"),
      days:0,individual:new Array(6).fill(0)
    }], target:{years:years,months:months,days:days}})
  }
  const closeDialog=(year,month,day)=>{
    if(year == undefined){
      return;
    }
    changeTarget(year,month,day);
    setIsDialogOpen(false);
  }
  const savePerformance =async (performance)=>{
    setLoading(true);
    setIsPerformanceDialogOpen(false);
    console.log('performance',performance)
    const docRef = doc(db, "qaza_namaz", user?.email);
    try{
    if(!docRef){
     console.log('not available')
    }else{
      let updatedData = {...qazaNamazData};
      let data = updatedData.data.filter((e)=>e.date== performance.date)[0];
      if(data){
        // data.days += performance.days;
        // console.log(data);1

        // data.individual = data.individual.map((e,i)=>(e+(performance.individual[i]))); 
        updatedData.data = updatedData.data.map((e=>e.date== performance.date?performance:e));
      }else{
        let semiData = updatedData.data
        semiData.push(performance);
        updatedData.data =  semiData;
      }
      console.log('updatedDaat',updatedData)
      try{
      await setDoc(docRef, updatedData);
     const docSnap = await getDoc(docRef)
         setQazaNamazData({...docSnap.data()})
      }catch(err){
       console.log(err)
      }finally{
        setLoading(false);
      }
    }}catch(err){
      console.log(err)
    }finally{
      setLoading(false);
    }

  }
  React.useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); 
      checkDocumentExists("qaza_namaz", user?.email).then(exists => {
        if (exists) {
          setIsUserDataExist(true);
          setQazaNamazData(exists)
          
        } else {
          setIsUserDataExist(false);

        }
      }).finally(()=>{
        setLoading(false);
      });
    });
    
    return () => unsubscribe();
  }, [,user]);

 

  React.useEffect(()=>{
    let years = Number(qazaNamazData?.target?.years);
    let months = Number(qazaNamazData?.target?.months);
     
    let days = Number(qazaNamazData?.target?.days);
    let totalDays = years*365 + months*30 + days;
    months += (Math.floor(days/30));
    days = (Math.floor(days%30));
    years += (Math.floor(months/12));
    months = (Math.floor(months%12));
    let text = '';
    if(years>1){
        text += `${years}years`
    }
    if(years==1){
        text += `${years}year`
    }
    if(months>1){
        text += ` ${months}months`
    }
    if(months==1){
        text += ` ${months}month`
    }
    if(days>1){
        text += ` ${days}days`
    }
    if(days==1){
        text += ` ${days}day`
    }
    let individuals = [0,0,0,0,0,0];
    qazaNamazData.data.forEach((e)=>{
        individuals=individuals.map((el)=>el+e.days);
        e.individual.forEach((al,i)=>{
          individuals[i]+=al
        })
    })
    let performanceTableData = [0,1,2,3,4,5].map((e,i)=>({
      name:indexToSalahMap[i],
      target:`${totalDays} days`,
      completed:`${individuals[i]} days`,
      pending:`${totalDays-individuals[i]} days`
     }))
     setTableData([...performanceTableData]);
  },[qazaNamazData]);
  async function checkDocumentExists(collectionName, documentId) {
    try {
      const docRef = doc(db, collectionName, documentId);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        // @ts-ignore
        setDocRef(docRef);
        return docSnap.data(); 
      } else {
        return false; 
      }
    } catch (error) {
      return false;
    }
  }
  const closePerformanceDialog = ()=>{
    setIsPerformanceDialogOpen(false);
  }
  
  
  

  return (
    <div className='mazhar' style={{display:'flex',flexDirection:'column'}}>
     {loading ? <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: to create an overlay effect
        zIndex: 1300, // Higher than other components
      }}
    >
      <CircularProgress />
    </Box>
 :(<>
 {/* {!user ? <SignIn />:<SignOut  user={user}/>} */}
 { isDialogOpen && <MyDialog data={qazaNamazData?.target} flag={isUserDataExist} open ={true} setIsDialogOpen = {setIsDialogOpen} onClose={closeDialog}/> }
 { isPerformanceDialogOpen && <CurrentTargetDialog qazaNamazData={qazaNamazData?.data} savePerformance={savePerformance} closePerformanceDialog={closePerformanceDialog} data={qazaNamazData?.target} flag={isUserDataExist} open ={true} onClose={closeDialog}/> }
 
        <div style={{width:'100%',marginBottom:'10px'}}>{!user ? <SignIn />:<SignOut  user={user}/>}</div>
        {user &&  <div>
            <div style={{display:'flex',width:'100%',height:'40px',marginTop:'10px', marginBottom:'20px', justifyContent:'space-between'}} >
               
               <Button onClick={()=>setIsDialogOpen(true)} style={{textTransform:'none'}} variant='contained' >{isUserDataExist ? 'View and update target':'Set Target'}</Button>
            </div>
           {isUserDataExist && 
           <div style={{marginTop:'10px',marginBottom:'10px'}}>
            <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>See Progress</Typography>
        </AccordionSummary>
        <AccordionDetails>
          
          <TableContainer component={Paper}>
      <Table sx={{maxWidth:'500px',borderCollapse:'collapse',border:'0' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{border:0}}>Prayer</TableCell>
            <TableCell style={{border:0}} >Target</TableCell>
            <TableCell style={{border:0}} >Completed</TableCell>
            <TableCell style={{border:0}} >Pending</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData?.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell style={{border:0}} component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell style={{border:0,fontWeight:'bold',color:'black'}}>{row.target}</TableCell>
              <TableCell style={{border:0,fontWeight:'bold',color:'green'}}>{row.completed}</TableCell>
              <TableCell style={{border:0,fontWeight:'bold',color:'blue'}}>{row.pending}</TableCell>
              <TableCell style={{border:0,fontWeight:'bold',color:'red'}}>{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </AccordionDetails>
      </Accordion>
      <Button  onClick={()=>setIsPerformanceDialogOpen(true)} style={{textTransform:'none',marginTop:'10px'}} variant='contained' >{ 'Update Qaza Namaz'}</Button>
            </div>}
           {

           }
    
    </div>}
    </>)}
    </div>
    
  );
}

