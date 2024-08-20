import React, { useEffect, useState } from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore/lite';
import { db } from '../firebaseConfig';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PlayCircleOutlineSharpIcon from '@mui/icons-material/PlayCircleOutlineSharp';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Box, Button, CircularProgress,ButtonGroup, Stack, Chip } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import PdfDialog from './pdfDialog';

export default function StudentPage({userId}) {
    const [loading,setLoading] = React.useState(false);
    const [selectedCourseCategory,setSelectedCourseCategory] = useState('');
    const [selectedCourse,setSelectedCourse]= useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [dialog,setDialog] = useState({
      addCourse:false,
      updateCourse:false,
      deleteCourse:false
  })
  const [courseCategoryMenuData,setCourseCategoryMenuData] = useState({});
  const [courseMenuData,setCourMenuData] = useState({});
  const [classMenuData,setClassMenuData] = useState({});
  const [classInfo,setClassInfo] = useState({});

  React.useEffect(() => {
    fetchDocuments();
  }, []);
    const fetchDocuments = async () => {
        setLoading(true);
        try {
            const courseKeys = await getCourseKeys(userId);
            const existenceResults = await checkCourseKeysExistence(courseKeys);
            let formattedResult =  existenceResults.reduce((acc,obj)=>(acc[obj.category] = [...(acc[obj.category] || []), obj], acc),{});
            let newObject={}
            for(const key of Object.keys(formattedResult)){
                let values = formattedResult[key];
                values =values.reduce((acc,obj)=>(acc[obj.courseName] = [...(acc[obj.courseName] || []), obj], acc),{});
                newObject[key]=values;
            }
            setCourseCategoryMenuData(newObject);
        } catch (error) {
            console.error('Error in main function: ', error);
        } finally {
            setLoading(false);
        }
    };
  const getCourseKeys = async (email) => {
    try {
      const q = query(collection(db, 'registeredCourses'), where('name', '==', email));
      const querySnapshot = await getDocs(q);
  
      const courseKeys = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data().courses;
        data.forEach(e=> courseKeys.push(e.courseKey))
        
      });
      return courseKeys;
    } catch (error) {
      console.error('Error getting courseKeys: ', error);
      return [];
    }
  };
  const checkCourseKeysExistence = async (courseKeys) => {
    try {
      const results = {};
      const ans = [];
      for (const key of courseKeys) {
        const q = query(collection(db, 'classes'), where('courseKey', '==', key));
        const querySnapshot = await getDocs(q);
        if(!querySnapshot.empty){
          
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            ans.push(data);
            
          });
        }
        results[key] = !querySnapshot.empty;  // `true` if documents exist, `false` otherwise
      }
      console.log('ans',ans);
      //ans=ans.sort((a,b)=>a.dateTime-b.dateTime);
      return ans;
    } catch (error) {
      console.error('Error checking document existence: ', error);
      return {};
    }
  };
    const handleCourseCategory = (event) => {
      setSelectedCourseCategory(event.target.value); 
      setCourMenuData(courseCategoryMenuData?.[event.target.value])
      setClassMenuData(courseCategoryMenuData?.[event.target.value]?.[selectedCourse]?.sort((a,b)=>a.dateTime-b.dateTime))
      setClassInfo({})
    };
    const handleCourse = (event) => {
        setSelectedCourse(event.target.value); 
        setClassMenuData(courseCategoryMenuData?.[selectedCourseCategory]?.[event.target.value]?.sort((a,b)=>a.dateTime-b.dateTime))
        setClassInfo({})

      };
      const handleClass = (event) => {
        setSelectedClass(event.target.value); 
        setClassInfo(event.target.value)
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
    <div>
    
    <>
    <FormControl size='small' sx={{  minWidth: '100%',marginTop:'15px' }}>
        <InputLabel id="demo-simple-select-helper-label">Select course category</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={selectedCourseCategory}
          label="Select course category"
          onChange={handleCourseCategory}
          MenuProps={{
            PaperProps: {
              style: {
                transform: ' translateX(-10px)'
              },
            },
           
          }}
        >
          
          { Object.keys(courseCategoryMenuData).length>0&& Object.keys(courseCategoryMenuData).map((e)=><MenuItem value={e}>{e}</MenuItem>)}
          
        </Select>
      </FormControl>
      <FormControl size='small' sx={{  minWidth: '100%',marginTop:'15px' }}>
        <InputLabel id="demo-simple-select-helper-label">Select course </InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={selectedCourse}
          label="Select course"
          onChange={handleCourse}
          MenuProps={{
            PaperProps: {
              style: {
                transform: ' translateX(-10px)'
              },
            },
           
          }}
        >
          
          { Object.keys(courseMenuData).length>0&& Object.keys(courseMenuData).map((e)=><MenuItem value={e}>{e}</MenuItem>)}
          
        </Select>
      </FormControl>
      <FormControl size='small' sx={{  minWidth: '100%',marginTop:'15px' }}>
        <InputLabel id="demo-simple-select-helper-label">Select class </InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={selectedClass}
          label="Select class"
          onChange={handleClass}
          MenuProps={{
            PaperProps: {
              style: {
                transform: ' translateX(-10px)',
                maxHeight:'350px'
              },
            },
           
          }}
        >
          
          { classMenuData?.length>0&& classMenuData?.map((e)=><MenuItem value={e}>{e.name}</MenuItem>)}
          
        </Select>
      </FormControl>
    </>
    {Object.keys(classInfo).length>0 &&
    <div style={{  minWidth: '100%',marginTop:'15px' }}>
        <Typography variant='h5' style={{textAlign:'center',marginBottom:'10px',fontWeight:'bold'}} >Class Details</Typography>
        <Card >
      
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {classInfo.name}
        </Typography>
        
{classInfo?.fileURLS && <Stack style={{margin:'20px',marginLeft:'0px',marginRight:'0px'}} direction="row" flexWrap={'wrap'} rowGap={1} spacing={1}>
     { classInfo?.fileURLS.map((e,i)=><Chip onClick={()=>{window.open(e.url, '_blank');}} style={{minWidth:'150px'}} label={e.name} variant='outlined'  />)
      }
      {classInfo?.fileURLS?.length == 0 && <Typography variant='h6'>No files available</Typography>}
    </Stack>}
      </CardContent>
      <CardActions>
        <Button size="small" variant='contained' onClick={()=>{window.open(classInfo.videoLink, '_blank')}}>Watch Video</Button>
      </CardActions>
    </Card>
    </div>}
  </div>

}
    </>
  );
}

