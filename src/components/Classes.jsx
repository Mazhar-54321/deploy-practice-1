import * as React from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';


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

export default function Classes({classKey,classData,setClasses}) {
    const [data,setData] = React.useState(classData);
    const [files,setFiles] = React.useState([]);
    const handleFiles = (files)=>{
        console.log(files,'files')
     setFiles(files);
    }
    const handleDelete = ()=>{

    }

  return (
    <div style={{margin:'10px',width:'90%'}}>
      <Accordion sx={{padding:'0px !important'}}>
        <AccordionSummary
        sx={{marginBottom:'0px !important'}}
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>{data?.className}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{padding:'0px !important'}} >
        <TextField onChange={(e)=>setData((prev)=>({...prev,className:e.target.value}))} sx={{margin:'10px',width:'90%'}} id="outlined-basic" label="Enter class name" size='small'  variant="outlined" />
        <TextField onChange={(e)=>setData((prev)=>({...prev,videoLink:e.target.value}))} sx={{margin:'10px',width:'90%'}} id="outlined-basic" label="Enter video link" size='small'  variant="outlined" />
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
    {files && <Stack style={{margin:'10px'}} direction="row" flexWrap={'wrap'} rowGap={1} spacing={1}>
     { Object.keys(files).map(e=><Chip label={files[e].name} variant='outlined' onDelete={handleDelete} />)
      }
    </Stack>}
        </AccordionDetails>
      </Accordion>
     
    </div>
  );
}