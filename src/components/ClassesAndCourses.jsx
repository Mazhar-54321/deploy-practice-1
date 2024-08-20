import * as React from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Box, CircularProgress, FormControl, FormHelperText, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';

import { db } from '../firebaseConfig';
import { collection, getDocs,doc,setDoc, query, where } from 'firebase/firestore/lite';
import { storage, ref, uploadBytes, getDownloadURL } from '../firebaseConfig';


import Classes from './Classes';
import { deleteObject } from 'firebase/storage';
import dayjs from 'dayjs';

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

export default function ClassesAndCourses({ classKey, classData, setClasses }) {
  const [courses, setCourses] = React.useState([]);
  const [coursesDataDB,setCoursesDataDB] = React.useState([]);

  const [loading, setLoading] = React.useState(true);

  const [selectedCourse, setSelectedCourse] = React.useState('');
  const [classesData, setClassesData] = React.useState([]);
  const [classesDataDB,setClassesDataDB] = React.useState([]);
  const [age, setAge] = React.useState('Ruhaniyat');


  React.useEffect(() => {
    fetchDocuments();
  }, []);
  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const colRef = collection(db, 'course');
      const colRef1= collection(db,'classes');
      try {
        // Step 1: Get courseKeys for the specified email
        const courseKeys = await getCourseKeys('rebecca.asely@gmail.com');
        // Step 2: Check if these courseKeys exist in the `classes` collection
        const existenceResults = await checkCourseKeysExistence(courseKeys);
    
      } catch (error) {
        console.error('Error in main function: ', error);
      }
      const snapshot = await getDocs(colRef);
      const snapshot1 = await getDocs(colRef1);
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      const docs1 = snapshot1.docs.map(doc => ({
        id: doc.id,
        add:false,
        ...doc.data()
      }));

      setClassesDataDB(docs1.sort((a,b)=>b.dateTime-a.dateTime));
      setCoursesDataDB(docs.sort((a,b)=>b.dateTime-a.dateTime));
      setCourses(docs.filter(e=>e.category=='Ruhaniyat'));
      setSelectedCourse('');
    } catch (err) {
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
      // Iterate through each courseKey and check if it exists in `classes` collection
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
      return ans;
    } catch (error) {
      console.error('Error checking document existence: ', error);
      return {};
    }
  };
  
  
  const handleChange = (event) => {
   let selectedCourse =courses?.filter(e => e.name == event.target.value && e.category==age)?.[0];
   if(selectedCourse.length === 0){
    setClassesData([]);
    setSelectedCourse('');

    return;
   }
    setSelectedCourse(selectedCourse);
    let classData = classesDataDB.filter((e)=>e.courseKey === selectedCourse.courseKey) ?? []
    setClassesData([...classData])

  };
  const addClassHandler = () => {
    const newUuid = crypto.randomUUID();
    let classObj = {
      name: '',
      videoLink: '',
      courseKey:selectedCourse?.courseKey,
      classKey:newUuid,
      courseName:selectedCourse?.name,
      fileURLS: [],
      category:age,
      add:true,
    }
    let existingClassesData = [...classesData];
    existingClassesData.unshift(classObj)
    setClassesData(existingClassesData);
  }
  const saveClassData =async (classData)=>{
    let urls = await handleUpload(classData.fileURLS,classData?.classKey);
    let obj ={
      name : classData.name,
      videoLink : classData.videoLink,
      courseKey:selectedCourse?.courseKey,
      classKey:classData?.classKey,
      courseName:selectedCourse?.name,
      fileURLS:urls,
      category:age,
      dateTime:dayjs().valueOf()
    }
    try {
      setLoading(true);
      const docRef = doc(db, 'classes', classData?.classKey);
      await setDoc(docRef, obj).then(async(e)=>await fetchDocuments());
    } catch (error) {
      console.error('Error saving data:', error);
    } finally{
        setLoading(false);
    }
  }
  const handleUpload = async (files,classKey) => {
    setLoading(true);
    let downloadableURLs = [];
    try {
        for(const file of files){
          if(file.url){
            downloadableURLs.push({url:file.url,name:file.name});
            continue;
          }
          const fileRef = ref(storage, `${classKey}/${file.name}`);
          const snapshot = await uploadBytes(fileRef, file);
          const downloadURL = await getDownloadURL(snapshot.ref);
          downloadableURLs.push({url:downloadURL,name:file.name})
        }
        
       return downloadableURLs;
      
    } catch (error) {
      alert('Error uploading files.');
    } finally {
      setLoading(false);
    }
  };
  const changeClassData = (fieldName,fieldValue,classKey)=>{
   let existingClassesData = [...classesData];
   existingClassesData = existingClassesData.map((e)=>{
    if(e.classKey == classKey){
      e[fieldName]=fieldValue;
    }
    return e;
   })
   setClassesData(existingClassesData);
  }
  const deleteClass = (classKey)=>{
    let existingClassesData = [...classesData];
   existingClassesData = existingClassesData.filter((e)=>e.classKey!=classKey);
   setClassesData(existingClassesData);
  }
  async function updateWholeDocument(classKey,obj) {
    setLoading(true);
    const docRef = doc(db, "classes", classKey);
    let fileURLS  = await handleUpload(obj?.fileURLS,classKey);
    obj.fileURLS = fileURLS;
    try {
        await setDoc(docRef, obj, { merge: false });

    } catch (e) {
        console.error("Error updating document: ", e);
    }
    finally{
      setLoading(false);
    }
}
async function updateFilesInDocument(classKey,obj){
  setLoading(true);
    const docRef = doc(db, "classes", classKey);
    try {
        await setDoc(docRef, obj, { merge: false });

    } catch (e) {
        console.error("Error updating document: ", e);
    }
    finally{
      setLoading(false);
    }
}
async function deleteFile(filePath,classKey,fileName,classData) {
  const fileRef = ref(storage, filePath);
  setLoading(true);
  try {
     await deleteObject(fileRef).then(() => {
      let localData = {...classData};
      let fileURLS = localData?.fileURLS.filter((e)=>e.name!=fileName);
      localData.fileURLS = fileURLS;
      updateFilesInDocument(classKey,localData);
  })
  .catch((error) => {
      console.error("Error deleting file: ", error);
  });
  } catch (error) {
      console.error("Error deleting file: ", error);
  }finally{
    setLoading(false);
  }
}
const handleChange1 = (e)=>{
  setAge(e.target.value);
  setSelectedCourse('');
  setCourses(coursesDataDB.filter(el=>el.category==e.target.value));
}
React.useEffect(()=>{
},[selectedCourse])
  return (
    <div style={{ marginTop: '15px', width: '100%' }}>
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
      <FormControl  size='small' sx={{  width: '98%',marginTop:'10px' }}>
        <InputLabel   id="demo-simple-select-helper-label">Select course category</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={age}
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
      {
        courses ?
          <FormControl size='small' sx={{ width: '98%', marginTop: '15px' }}>
            <InputLabel id="demo-simple-select-helper-label">Select course to add classes</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={courses?.length>0? selectedCourse?.name:''}
              label="Select course to add classes"
              onChange={handleChange}
              size='small'
              MenuProps={{
                PaperProps: {
                  style: {
                    transform: ' translateX(-10px)'
                  },
                },
               
              }}
             
            >
              {courses.map((e) => <MenuItem   value={e.name}>{e.name}</MenuItem>)}

            </Select>
          </FormControl>
          : <p>No courses Added yet</p>}
      {selectedCourse?.name &&
        <div style={{ width: '98%', display: 'flex', justifyContent: 'space-between', marginTop: '10px', marginBottom: '10px' }}>
          <Typography variant='h6'>Add/Update classes</Typography>
          <IconButton onClick={addClassHandler} style={{ paddingRight: '0px' }} aria-label="delete">
            <AddCircleOutlineIcon />
          </IconButton>
        </div>}

     {selectedCourse?.name && <div >{classesData?.map((e) => <Classes  deleteFileFromDB ={deleteFile}
      classKey={e.classKey} deleteClass={deleteClass} updateClassData = {updateWholeDocument} saveClassData={saveClassData} classData={e} key={e.classKey} setClasses={changeClassData} />)}</div>}

    </div>
  );
}