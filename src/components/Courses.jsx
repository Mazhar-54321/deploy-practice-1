import React, { useEffect, useState } from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { doc, getDoc, collection, query, where, getDocs, setDoc } from 'firebase/firestore/lite';
import { storage, ref, uploadBytes, getDownloadURL } from '../firebaseConfig';
import { db } from '../firebaseConfig';
import dayjs from 'dayjs';


import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PlayCircleOutlineSharpIcon from '@mui/icons-material/PlayCircleOutlineSharp';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import SignOut from '../SignOut';
import SignIn from '../signIn';
import { Box, Button, CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';
import GuideLines from './GuideLines';
import AddCourseDialog from './AddCourseDialog';
export default function Courses({userId}) {
    const [loading,setLoading] = React.useState(false);
    const [age, setAge] = React.useState('');
    const [dialog,setDialog] = useState({
        addCourse:false,
        updateCourse:false,
        deleteCourse:false
    })

  const handleChange = (event) => {
    setAge(event.target.value);
    setDialog((prev)=>({...prev,addCourse:true}));
    if(event.target.value === '10'){
        
    }
  };
  const saveCourse =async (courseKey,courseData,courseLogo)=>{
    let url = await handleUpload(courseLogo,courseKey);
    courseData.url = url
    courseData.courseKey = courseKey;
    courseData.dateTime = dayjs().valueOf();
    try {
      const docRef = doc(db, 'course', courseKey);
      await setDoc(docRef, courseData);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  
  }
  const handleUpload = async (files,courseKey) => {
    setLoading(true);
    try {
        
        const fileRef = ref(storage, courseKey);

        const snapshot = await uploadBytes(fileRef, files);

        // Get the download URL
        const downloadURL = await getDownloadURL(snapshot.ref);
       return downloadURL;
      
    } catch (error) {
      console.error('Error uploading files: ', error);
      alert('Error uploading files.');
    } finally {
      //setUploading(false);
      setLoading(false);
    }
  };
  const handleCourseData = async (courseKey,courseData) => {
    try {
      const docRef = doc(db, 'courseData', courseKey); 
    } catch (error) {
      console.error('Error saving document: ', error);
    }
  };
  return (
    <>
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
        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
        zIndex: 1200, 
      }}
    >
      <CircularProgress />
    </Box>
    :
    <div style={{width:'98%',marginTop:'10px'}}>
    <Accordion sx={{ padding: '0px',marginTop:'5px' }}>
      <AccordionSummary
        expandIcon={<ArrowDownwardIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography>Guidelines</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: '0px',marginTop:'5px' }}>
       <GuideLines type={'course'} />
       <div style={{alignItems:'end',width:'100%',textAlign:'end',padding:'5px'}}><Button variant="contained" style={{textTransform:'none',marginRight:'10px'}} startIcon={<PlayCircleOutlineSharpIcon />}>
  Watch Video
</Button></div>
      </AccordionDetails>
    </Accordion>
    <>
    <FormControl size='small' sx={{  minWidth: '100%',marginTop:'15px' }}>
        <InputLabel id="demo-simple-select-helper-label">Select type of operation</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={age}
          label="Select type of operation"
          onChange={handleChange}
          MenuProps={{
            PaperProps: {
              style: {
                transform: ' translateX(-10px)'
              },
            },
           
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Add course</MenuItem>
          <MenuItem value={20}>Update course</MenuItem>
          <MenuItem value={30}>Delete course</MenuItem>
        </Select>
      </FormControl>
    </>
  </div>

}
{dialog?.addCourse && <AddCourseDialog  open={true} saveCourse={saveCourse} setOpen={()=>{setDialog((prev)=>({...prev,addCourse:false}));setAge('')}}/> }
    </>
  );
}

