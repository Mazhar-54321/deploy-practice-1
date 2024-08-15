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

import { db } from '../firebaseConfig';
import { collection, getDocs,doc,setDoc } from 'firebase/firestore/lite';
import { storage, ref, uploadBytes, getDownloadURL } from '../firebaseConfig';


import Classes from './Classes';
import { deleteObject } from 'firebase/storage';

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
  const [loading, setLoading] = React.useState(true);

  const [selectedCourse, setSelectedCourse] = React.useState('');
  const [classesData, setClassesData] = React.useState([]);
  const [classesDataDB,setClassesDataDB] = React.useState([]);

  React.useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const colRef = collection(db, 'course');
        const colRef1= collection(db,'classes');
        const snapshot = await getDocs(colRef);
        const snapshot1 = await getDocs(colRef1);
        const docs = snapshot.docs.reverse().map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        const docs1 = snapshot1.docs.reverse().map(doc => ({
          id: doc.id,
          add:false,
          ...doc.data()
        }));
        console.log(docs1,'selectedCourse')

        setClassesDataDB(docs1);
        setCourses(docs);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);
  const handleChange = (event) => {
   let selectedCourse =courses?.filter(e => e.name == event.target.value)[0];
   console.log(selectedCourse,'selectedCourse')
    setSelectedCourse(selectedCourse);
    let classData = classesDataDB.filter((e)=>e.courseKey === selectedCourse.courseKey) ?? []
    console.log('classData',classData);
    setClassesData([...classData])

  };
  const addClassHandler = () => {
    const newUuid = crypto.randomUUID();
    console.log(newUuid);
    let classObj = {
      name: '',
      videoLink: '',
      courseKey:selectedCourse?.courseKey,
      classKey:newUuid,
      fileURLS: [],
      add:true
    }
    let existingClassesData = [...classesData];
    existingClassesData.push(classObj)
    setClassesData(existingClassesData);
  }
  const saveClassData =async (classData)=>{
    let urls = await handleUpload(classData.fileURLS,classData?.classKey);
    let obj ={
      name : classData.name,
      videoLink : classData.videoLink,
      courseKey:selectedCourse?.courseKey,
      classKey:classData?.classKey,
      fileURLS:urls
    }
    try {
      setLoading(true);
      const docRef = doc(db, 'classes', classData?.classKey);
      await setDoc(docRef, obj);
    } catch (error) {
      console.error('Error saving data:', error);
    } finally{
        setLoading(false);
    }
  }
  const handleUpload = async (files,classKey) => {
    console.log('filess',files);
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
   console.log(existingClassesData,'existingClassesData',classKey);
   setClassesData(existingClassesData);
  }
  const deleteClass = (classKey)=>{
    let existingClassesData = [...classesData];
   existingClassesData = existingClassesData.filter((e)=>e.classKey!=classKey);
   setClassesData(existingClassesData);
  }
  async function updateWholeDocument(classKey,obj) {
    setLoading(true);
    console.log('classKey,',classKey,obj)
    const docRef = doc(db, "classes", classKey);
    let fileURLS  = await handleUpload(obj?.fileURLS,classKey);
    obj.fileURLS = fileURLS;
    try {
        await setDoc(docRef, obj, { merge: false });

        console.log("Document successfully updated!");
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

        console.log("Document successfully updated!");
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
      console.log("File deleted successfully!");
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
      {
        courses ?
          <FormControl size='small' sx={{ width: '98%', marginTop: '15px' }}>
            <InputLabel id="demo-simple-select-helper-label">Select course to add classes</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={selectedCourse?.name}
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
          <Typography variant='h6'>Add classes</Typography>
          <IconButton onClick={addClassHandler} style={{ paddingRight: '0px' }} aria-label="delete">
            <AddCircleOutlineIcon />
          </IconButton>
        </div>}

      <div >{classesData?.map((e) => <Classes  deleteFileFromDB ={deleteFile}
      classKey={e.classKey} deleteClass={deleteClass} updateClassData = {updateWholeDocument} saveClassData={saveClassData} classData={e} key={e.classKey} setClasses={changeClassData} />)}</div>

    </div>
  );
}