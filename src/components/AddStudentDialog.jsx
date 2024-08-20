import React,{useEffect,useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Accordion, AccordionDetails, AccordionSummary, Box, Checkbox, Chip, CircularProgress, Divider, ListItemText, OutlinedInput, Stack, TextField } from '@mui/material';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import Classes from './Classes';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { toast } from 'react-toastify';
import { collection, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore/lite';
import { db } from '../firebaseConfig';



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      transform: ' translateX(-5px)'
    },
  },
};

export default function AddStudentDialog({open,setOpen,isUpdate}) {

    const [courseCategory, setCourseCategory] = useState('');
    const [loading,setLoading]= useState(false);
    const [isSaveEnabled,setIsSaveEnabled] = useState(false);
    const [availableCourses,setAvailableCourses] = useState([]);
    const [showAvailableCourses,setShowAvailableCourses] = useState([]);
    const [registeredStudentList,setRegisteredStudentsList] = useState([]);
    const [studentData,setStudentData] = useState({
      email:'',
      courseList:{
        General:[],
        Ruhaniyat:[],
        Hikmat:[]
      }
    })
    const [registeredCourses,setRegisteredCourses]=useState({});
    const [courseDataErrorMessages] = useState({
      name:{
        error:false,
        val:'Enter valid gmail id'
      },
      fees:{
        error:false,
        val:'Fees must be greater than 100'
      },
      fees:{
        error:false,
        val:'description must be atleast 5 chars'
      },
      category:{
        val:'category cant be empty',
        error:false
      }
    })
    const [registeredStudentId,setRegisteredStudentID]=useState('')
    
    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
     
      setStudentData((prev)=>({...prev,courseList:{...prev.courseList,[courseCategory]: typeof value === 'string' ? value.split(',') : value}}))
    };
    const handleChange1 = (event) => {
     setCourseCategory(event.target.value);
     setShowAvailableCourses(availableCourses.filter(e=>e.category==event.target.value));
     if(isUpdate){
      setStudentData((prev)=>({...prev,courseList:{...prev.courseList,[event.target.value]:registeredCourses[studentData?.email]?.[event.target.value]?.map(e=>e.name)}}))
     }
    };
   
   
    
    
  useEffect(()=>{
      setLoading(true);
      const fetchCourses = async () => {
        try {
          const colRef = collection(db, 'course');
          const snapshot = await getDocs(colRef);
          const docs = snapshot.docs.reverse().map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setAvailableCourses(docs);
          setCourseCategory('Ruhaniyat');
          setShowAvailableCourses(docs.filter(e=>e.category=='Ruhaniyat'))
          
        } catch (err) {
        } finally {
          setLoading(false);
        }
      };
      const fetchStudents = async ()=>{
        try {
          const colRef = collection(db, 'registeredCourses');
          const snapshot = await getDocs(colRef);
          
          const docs = snapshot.docs.reverse().map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          let ids=docs.map((e)=>({email:e.name,id:e.id}))
          setRegisteredStudentID(ids)
          let registeredCourseList = docs.map((e)=>({[e.name]:e.courses.reduce((acc, obj) => (acc[obj.category] = [...(acc[obj.category] || []), obj], acc), {})}))
          setRegisteredCourses(Object.assign({}, ...registeredCourseList));
          setRegisteredStudentsList(docs.map((e)=>e.name));
          registeredCourseList = Object.assign({}, ...registeredCourseList);
          setStudentData((prev)=>({...prev,email:docs[0].name,courseList:{...prev.courseList,
            'Ruhaniyat':registeredCourseList[docs[0].name]?.['Ruhaniyat']?.map(e=>e.name),
            'Hikmat':registeredCourseList[docs[0].name]?.['Hikmat']?.map(e=>e.name),
            'General':registeredCourseList[docs[0].name]?.['General']?.map(e=>e.name),

          }}))
          
        } catch (err) {
        } finally {
          setLoading(false);
        }
      }
      isUpdate && fetchStudents();
      fetchCourses();
    },[])
  useEffect(()=>{
    setIsSaveEnabled((studentData?.email?.length>3 && (studentData?.courseList?.General?.length>0 ||studentData?.courseList?.Hikmat?.length>0||studentData?.courseList?.Ruhaniyat?.length>0))) 
  },[studentData])

  const handleClose = () => {
    setOpen();
  };
 
  const saveCourseToDB =async ()=>{
    if(isUpdate){
      const courseKey = crypto.randomUUID();
    let ruhaniyatGrantedCourses = studentData?.courseList?.Ruhaniyat??[];
    let hikmatGrantedCourses = studentData?.courseList?.Hikmat??[];
    let generalGrantedCourses = studentData?.courseList?.General??[];
     ruhaniyatGrantedCourses=ruhaniyatGrantedCourses?.map((e)=>{return ( availableCourses)?.find(el=>el.name==e&&el.category=='Ruhaniyat')})?.map(e=>({courseKey:e.courseKey,category:e.category,name:e.name}))
    hikmatGrantedCourses=hikmatGrantedCourses?.map((e)=>availableCourses?.find(el=>el.name==e&&el.category=='Hikmat'))?.map(e=>({courseKey:e.courseKey,category:e.category,name:e.name}))
    generalGrantedCourses=generalGrantedCourses?.map((e)=>availableCourses?.find(el=>el.name==e&&el.category=='General'))?.map(e=>({courseKey:e.courseKey,category:e.category,name:e.name}))
    let coursesData =[...ruhaniyatGrantedCourses,...hikmatGrantedCourses,...generalGrantedCourses];
    try {
      const docRef = doc(db, 'registeredCourses',registeredStudentId.filter(e=>e.email==studentData?.email)[0].id );
      await updateDoc(docRef, {name:studentData?.email,courses:coursesData});
    } catch (error) {
      console.error('Error saving data:', error);
    }
    }else{
    const courseKey = crypto.randomUUID();
    let ruhaniyatGrantedCourses = studentData?.courseList?.Ruhaniyat;
    let hikmatGrantedCourses = studentData?.courseList?.Hikmat;
    let generalGrantedCourses = studentData?.courseList?.General;
    ruhaniyatGrantedCourses=ruhaniyatGrantedCourses.map((e)=>{return ( availableCourses)?.find(el=>el.name==e&&el.category=='Ruhaniyat')}).map(e=>({courseKey:e.courseKey,category:e.category,name:e.name}))
    hikmatGrantedCourses=hikmatGrantedCourses.map((e)=>availableCourses?.find(el=>el.name==e.name&&el.category=='Hikmat')).map(e=>({courseKey:e.courseKey,category:e.category,name:e.name}))
    generalGrantedCourses=generalGrantedCourses.map((e)=>availableCourses?.find(el=>el.name==e.name&&el.category=='General')).map(e=>({courseKey:e.courseKey,category:e.category,name:e.name}))
    let coursesData =[...ruhaniyatGrantedCourses,...hikmatGrantedCourses,...generalGrantedCourses];
    try {
      const docRef = doc(db, 'registeredCourses', courseKey);
      await setDoc(docRef, {name:studentData?.email,courses:coursesData});
    } catch (error) {
      console.error('Error saving data:', error);
    }
    
    }
    handleClose();
  }
 
  const handleGrantedAccess = (key,value)=>{
    let studentsData = {...studentData};
    let courseData = studentData['courseList'][key];
    courseData=courseData.filter((e)=>e!=value)
    let courseList = {...studentsData['courseList']}
    courseList[key]=courseData;
    setStudentData((prev)=>({...prev,courseList:courseList}))

  }
  const getFormattedGrantedCourses = (key,list)=>{
   if(list?.length>0){
    return (
      <div style={{display:'flex',flexDirection:'column',margin:'10px'}}>
        <Accordion sx={{ padding: '0px',marginTop:'5px' }}>
      <AccordionSummary
        expandIcon={<ArrowDownwardIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography>{key}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: '0px',marginTop:'5px' }}>
      <Stack style={{margin:'10px'}} direction="row" flexWrap={'wrap'} rowGap={1} spacing={1}>
     { list.map(e=><Chip style={{minWidth:'100px'}} label={e} variant='outlined' onDelete={()=>handleGrantedAccess(key,e)}  />)
      }
    </Stack>
     
      </AccordionDetails>
    </Accordion>
        
      </div>
    )
   }else{
    return <></>
   }
  }
  return (
    <React.Fragment>
      
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
         {loading && <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          zIndex: 1200,
        }}
      >
        <CircularProgress />
      </Box>}
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Cancel
            </Typography>
            <Button disabled={!isSaveEnabled}   autoFocus color="inherit" onClick={saveCourseToDB}>
              {!isUpdate ?'Save':'Update'}
            </Button>
          </Toolbar>
        </AppBar>
        
        {isUpdate ?<>
          <FormControl  size='small' sx={{  width: '90%',margin:'10px' }}>
        <InputLabel   id="demo-simple-select-helper-label">Select student</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={studentData?.email}
          label="Select course category"
          onChange={(e)=>{setStudentData((prev)=>({...prev,email:e.target.value,courseList:{...prev.courseList,[courseCategory]:registeredCourses[e.target.value]?.[courseCategory]?.map(e=>e.name)}}))}}
          MenuProps={{
            PaperProps: {
              style: {
                transform: ' translateX(-5px)'
              },
            },
           
          }}
          
        >
          {registeredStudentList?.map((e)=><MenuItem value={e}>{e}</MenuItem>)}
          
        </Select>
        <FormHelperText>{'Must select one of the students'}</FormHelperText>
      </FormControl>
        </>:
         <TextField 
        helperText={courseDataErrorMessages.name.val} sx={{margin:'10px',width:'90%'}} id="outlined-basic" onChange={(e)=>setStudentData((prev)=>({...prev,email:e.target.value}))} label="Enter gmail id" size='small'  variant="outlined" 
        />}
        <FormControl  size='small' sx={{  width: '90%',margin:'10px' }}>
        <InputLabel   id="demo-simple-select-helper-label">Select course category</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={courseCategory}
          label="Select course category"
          onChange={handleChange1}
          MenuProps={{
            PaperProps: {
              style: {
                transform: ' translateX(-5px)'
              },
            },
           
          }}
          
        >
          
          <MenuItem value={'General'}>General</MenuItem>
          <MenuItem value={'Hikmat'}>Hikmat</MenuItem>
          <MenuItem value={'Ruhaniyat'}>Ruhaniyat</MenuItem>
        </Select>
        <FormHelperText>{'Must select one of the category'}</FormHelperText>
      </FormControl>
         <FormControl size='small' sx={{ width: '90%',margin:'10px' }}>
        <InputLabel id="demo-multiple-checkbox-label">Select courses to give access</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={studentData.courseList[courseCategory]??[]}
          onChange={handleChange}
          input={<OutlinedInput label="Select courses to give access" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {showAvailableCourses?.map((name) => (
            <MenuItem key={name.courseKey} value={name.name}>
              <Checkbox checked={studentData.courseList[courseCategory]?.indexOf(name.name) > -1} />
              <ListItemText primary={name.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography style={{width:'90%',margin:'10px',textAlign:'center'}} variant='h5'>Access Granted</Typography>
      {
        Object.keys(studentData?.courseList).map((e)=>(getFormattedGrantedCourses(e,studentData?.courseList[e])))
      }
       </Dialog>
    </React.Fragment>
  );
}