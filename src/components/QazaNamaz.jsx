import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { app } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import SignOut from '../SignOut';
import SignIn from '../signIn';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, TextField, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { db } from '../firebaseConfig';
import { addDoc, collection, doc, getDoc,setDoc,updateDoc } from 'firebase/firestore/lite';
import MyDialog from '../SetTargetDialog';
import { toast } from 'react-toastify';
import CurrentTargetDialog from './setCurrentTarget';

 const rows =[{
  name:'Fajr',
  target:365,
  completed:200,
  pending:100
 },
 {
  name:'Zohr',
  target:365,
  completed:200,
  pending:100
 },
 {
  name:'Asr',
  target:365,
  completed:200,
  pending:100
 },
 {
  name:'Magrib',
  target:365,
  completed:200,
  pending:100
 },
 {
  name:'Isha',
  target:365,
  completed:200,
  pending:100
 },
 {
  name:'Vitr',
  target:365,
  completed:200,
  pending:100
 }]
export default function DatePickerValue() {
  const [isDialogOpen,setIsDialogOpen] = React.useState(false);
  const [isPerformanceDialogOpen,setIsPerformanceDialogOpen] = React.useState(false);
  const [value, setValue] = React.useState(dayjs());
  const [user, setUser] = React.useState(null);
  const [age, setAge] = React.useState('');
  const [isUserDataExist,setIsUserDataExist] = React.useState(false);
  const [target,setTarget] = React.useState({years:0,months:0,days:0});
  const [format,setFormat] = React.useState({
    target:{
      years:0,months:0,days:0, individual:new Array(6).fill(0)
    },
    data:[{
      date:new Date(),
      days:0,individual:new Array(6).fill(0)
    }]
  })
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  async function updateDocumentField(collectionName, documentId, data) {
    try {
      // Reference to the document
      const docRef = doc(db, collectionName, documentId);
      console.log('docRef',docRef);
      // Get the document snapshot
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        // Document exists, update it
       await updateDoc(docRef, data);
       setTarget((prev)=>({...prev,days:data?.days,months:data?.months,years:data?.years}))
      } else {
        // Document does not exist, create it
        await setDoc(docRef, data);
        console.log("Document successfully created!");
      }
    } catch (error) {
      console.error("Error updating or adding document:", error);
    }
  }
  const changeTarget = (years,months,days)=>{
    if(years+months+days === 0){
      toast.error('Invalid selection');
      console.log('Invalid session')
      return;
    }
     setIsDialogOpen(true);
    updateDocumentField('qaza_namaz',user?.email,{...format,target:{...format.target,years:years,months:months,days:days}})
  }
  const closeDialog=(years,months,days)=>{
    changeTarget(years,months,days);
    setIsDialogOpen(false);
  }
  
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); 
      checkDocumentExists("qaza_namaz", user?.email).then(exists => {
        if (exists) {
          setIsUserDataExist(true);
          setTarget({years:exists.target.years,months:exists.target.months,days:exists.target.days})
          console.log("dataexists",exists)
          console.log("The document with ID 'abcd' exists.");
        } else {
          setIsUserDataExist(false);

          console.log("The document with ID 'abcd' does not exist.");
        }
      });
    });
    
    return () => unsubscribe();
  }, []);
  async function checkDocumentExists(collectionName, documentId) {
    try {
      const docRef = doc(db, collectionName, documentId);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        console.log("Document exists:", docSnap.data());
        return docSnap.data(); // Document exists
      } else {
        console.log("No such document!");
        return false; // Document does not exist
      }
    } catch (error) {
      console.error("Error getting document:", error);
      return false; // In case of error, return false
    }
  }
  
  

  return (
    <div className='mazhar' style={{display:'flex',flexDirection:'column'}}>
 { isDialogOpen && <MyDialog data={target} flag={isUserDataExist} open ={true} onClose={closeDialog}/> }
 { true && <CurrentTargetDialog data={target} flag={isUserDataExist} open ={true} onClose={closeDialog}/> }
 
        <div style={{width:'100%',marginBottom:'10px'}}>{!user ? <SignIn />:<SignOut  user={user}/>}</div>
        {user &&  <div>
            <div style={{display:'flex',width:'100%',height:'40px',marginTop:'10px', marginBottom:'20px', justifyContent:'space-between'}} >
               
               <Button onClick={changeTarget} style={{width:'50%',  textTransform:'none'}} variant='contained' >{isUserDataExist ? 'View and update target':'Set Target'}</Button>
            </div>
           {isUserDataExist && <div style={{marginTop:'10px',marginBottom:'10px'}}>
            <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>See Progress</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* <div style={{display:'flex',margin:0,padding:0, width:'100%',flexDirection:'column'}}>
            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginBottom:'10px'}}>
              <span style={{alignContent:'end', fontSize:'10px',color:'black',fontWeight:'bold'}}>Fajr</span>
              <span style={{alignContent:'end', fontSize:'10px',color:'green',fontWeight:'bold'}}>Target:365</span>
              <span style={{alignContent:'end', fontSize:'10px',color:'blue',fontWeight:'bold'}}>Completed:25</span>
              <span style={{alignContent:'end', fontSize:'10px',color:'red',fontWeight:'bold'}}>Pending:245</span>
              </div>
              <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginBottom:'10px'}}>
              <span style={{alignContent:'end', fontSize:'10px',color:'black',fontWeight:'bold'}}>Zohr</span>
              <span style={{alignContent:'end', fontSize:'10px',color:'green',fontWeight:'bold'}}>Target:365</span>
              <span style={{alignContent:'end', fontSize:'10px',color:'blue',fontWeight:'bold'}}>Completed:25</span>
              <span style={{alignContent:'end', fontSize:'10px',color:'red',fontWeight:'bold'}}>Pending:245</span>
              </div><div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginBottom:'10px'}}>
              <span style={{alignContent:'end', fontSize:'10px',color:'black',fontWeight:'bold'}}>Asr</span>
              <span style={{alignContent:'end', fontSize:'10px',color:'green',fontWeight:'bold'}}>Target:365</span>
              <span style={{alignContent:'end', fontSize:'10px',color:'blue',fontWeight:'bold'}}>Completed:25</span>
              <span style={{alignContent:'end', fontSize:'10px',color:'red',fontWeight:'bold'}}>Pending:245</span>
              </div><div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginBottom:'10px'}}>
              <span style={{alignContent:'end', fontSize:'10px',color:'black',fontWeight:'bold'}}>Magrib</span>
              <span style={{alignContent:'end',marginLeft:'-20px', fontSize:'10px',color:'green',fontWeight:'bold'}}>Target:365</span>
              <span style={{alignContent:'end', fontSize:'10px',color:'blue',fontWeight:'bold'}}>Completed:25</span>
              <span style={{alignContent:'end', fontSize:'10px',color:'red',fontWeight:'bold'}}>Pending:245</span>
              </div><div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginBottom:'10px'}}>
              <span style={{alignContent:'end', fontSize:'10px',color:'black',fontWeight:'bold'}}>Isha</span>
              <span style={{alignContent:'end', fontSize:'10px',color:'green',fontWeight:'bold'}}>Target:365</span>
              <span style={{alignContent:'end', fontSize:'10px',color:'blue',fontWeight:'bold'}}>Completed:25</span>
              <span style={{alignContent:'end', fontSize:'10px',color:'red',fontWeight:'bold'}}>Pending:245</span>
              </div><div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginBottom:'10px'}}>
              <span style={{alignContent:'end', fontSize:'10px',color:'black',fontWeight:'bold'}}>Vitr</span>
              <span style={{alignContent:'end', fontSize:'10px',color:'green',fontWeight:'bold'}}>Target:365</span>
              <span style={{alignContent:'end', fontSize:'10px',color:'blue',fontWeight:'bold'}}>Completed:25</span>
              <span style={{alignContent:'end', fontSize:'10px',color:'red',fontWeight:'bold'}}>Pending:245</span>
              </div>

          </div> */}
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
          {rows.map((row) => (
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
            </div>}
           {isUserDataExist && <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        
        <DatePicker
          label="Select Date"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          maxDate={dayjs()}
        />
      </DemoContainer>
    </LocalizationProvider>}
    {isUserDataExist &&<Box sx={{ minWidth: 120 , marginTop:'10px' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Entry Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Select Entry Type"
          onChange={handleChange}
        >
          <MenuItem value={0}>Days</MenuItem>
          <MenuItem value={1}>Individual</MenuItem>
        </Select>
      </FormControl>
    </Box>}
    {isUserDataExist && age == '0' && <div>0</div>}
    {isUserDataExist && age == '1' && <div>1</div>}
    </div>}
    </div>
    
  );
}

