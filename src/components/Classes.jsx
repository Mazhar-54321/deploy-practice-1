import * as React from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { IconButton, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';

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

export default function Classes({classKey,classData,setClasses,saveClassData,deleteClass,updateClassData,deleteFileFromDB}) {
  console.log('classData1',classData);
    const [data,setData] = React.useState(classData);
    const handleFiles = (files)=>{
      let filesData = Array.from(classData.fileURLS);
      console.log(Array.from(files).map(e=>e.type));
      let selectedFiles = Array.from(files).filter((e)=>!filesData.some(el=>el.name==e.name)).filter((e)=>e.type.includes('pdf')||e.type.includes('image'))
      if(Array.from(files).length != selectedFiles.length){
        toast.error('duplicate files and non pdf/images are discarded');
      }
      setClasses('fileURLS',Array.from([...filesData,...selectedFiles]),classKey);
    }
    const handleDelete = ()=>{
          deleteClass(classKey)
    }
    const handleFileDelete = (fileName)=>{
      let filesArray =Array.from(classData.fileURLS);
      console.log(classData?.add,'classData?.add');
      let fileObj = filesArray.filter((e)=>e.name==fileName)[0]
      filesArray = filesArray.filter((e)=>e.name!=fileName);

      if(!(classData?.add) && (fileObj?.url)){
        deleteFileFromDB(`${classData?.classKey}/${fileName}`,classKey,fileName,classData)
      }
      setClasses('fileURLS',Array.from(filesArray),classKey);
       
    }
  const changeClassData = (fieldName,fieldValue)=>{
   setClasses(fieldName,fieldValue,classKey);
  }

  return (
    <div style={{width:'98%',marginBottom:'15px'}}>
      <Accordion sx={{padding:'0px !important'}}>
        <AccordionSummary
        sx={{marginBottom:'0px !important'}}
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
         <div style={{display:'flex',width:'100%'}}> <Typography style={{width:'60%',alignContent:'center'}}>{classData?.name}</Typography>
         <Button disabled={!(classData?.name?.length>=4 && classData?.videoLink.length>0 && classData?.fileURLS.length>0)} onClick={()=>{classData?.add?saveClassData(classData):updateClassData(classKey,classData)}} variant='text' style={{textTransform:'none'}}>{classData?.add?'Save':'Update'}</Button>
         {classData?.add && <IconButton onClick={handleDelete} style={{paddingRight:'0px',width:'10%'}} aria-label="delete">
  <DeleteIcon />
</IconButton>}
         </div>
        </AccordionSummary>

        <AccordionDetails sx={{padding:'0px !important'}} >
        <TextField  defaultValue={classData['name']} onChange={(e)=>changeClassData('name',e.target.value)} sx={{margin:'10px',width:'90%'}} id="outlined-basic" label="Enter class name" size='small'  variant="outlined" />
        <TextField value={classData['videoLink']} onChange={(e)=>changeClassData('videoLink',e.target.value)} sx={{margin:'10px',width:'90%'}} id="outlined-basic" label="Enter video link" size='small'  variant="outlined" />
        <div style={{display:'flex',justifyContent:'flex-start'}} >
            <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      sx={{margin:'10px',textTransform:'none'}}
      startIcon={<CloudUploadIcon />}

    >
      Upload file
      <VisuallyHiddenInput multiple type="file" onChange={(e)=>handleFiles(e.target.files)} />
    </Button>
    <span style={{fontSize:'10px',opacity:'0.5',alignContent:'center'}}> only images and pdf are accepted</span>
    </div>
    {classData?.fileURLS && <Stack style={{margin:'10px'}} direction="row" flexWrap={'wrap'} rowGap={1} spacing={1}>
     { classData?.fileURLS.map(e=><Chip label={e.name} variant='outlined' onDelete={()=>handleFileDelete(e.name)} />)
      }
    </Stack>}
        </AccordionDetails>
      </Accordion>
     
    </div>
  );
}