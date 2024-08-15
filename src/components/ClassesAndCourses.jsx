import * as React from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Box, CircularProgress, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';

import { db} from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore/lite';
import Classes from './Classes';

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

export default function ClassesAndCourses({classKey,classData,setClasses}) {
    const [courses,setCourses] = React.useState([]);
    const [loading,setLoading] = React.useState(true);

    const [selectedCourse,setSelectedCourse] = React.useState('');
    const [classesData,setClassesData] = React.useState({});

    React.useEffect(() => {
        const fetchDocuments = async () => {
          try {
            const colRef = collection(db, 'course');
            const snapshot = await getDocs(colRef);
            const docs = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            setCourses(docs);
          } catch (err) {
          } finally {
            setLoading(false);
          }
        };
    
        fetchDocuments();
      }, []);
    const handleChange = (event) => {
        
        setSelectedCourse(courses?.filter(e=>e.name==event.target.value)[0]);
       
      };
    const addClassHandler =()=>{
        const newUuid = crypto.randomUUID();
        console.log(newUuid);
        let classObj ={
          className : '',
          videoLink:'',
          files:[]
        }
        setClassesData((prev)=>({...prev,[newUuid]:classObj}));
      }
  return (
    <div style={{marginTop:'15px',width:'90%'}}>
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
      {
       courses? 
       <FormControl size='small' sx={{  width: '100%',marginTop:'15px' }}>
        <InputLabel id="demo-simple-select-helper-label">Select course to add classes</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={selectedCourse?.name}
          label="Select course to add classes"
          onChange={handleChange}
        >
            {courses.map((e)=><MenuItem value={e.name}>{e.name}</MenuItem>)}
          
        </Select>
      </FormControl>
      : <p>No courses Added yet</p>}
      {selectedCourse?.name && 
      <div style={{width:'100%',display:'flex',justifyContent:'space-between',margin:'10px'}}>
        <Typography variant='h6'>Add classes</Typography>
        <IconButton onClick={addClassHandler}  style={{paddingRight:'0px'}} aria-label="delete">
  <AddCircleOutlineIcon />
</IconButton>
       </div>}
       
       <div >{Object.keys(classesData).map((e)=><Classes classKey={e} classData={classesData} key={e} setClasses={setClassesData} />)}</div>
     
    </div>
  );
}