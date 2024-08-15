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
import { Box, Button, CircularProgress,ButtonGroup } from '@mui/material';
import { toast } from 'react-toastify';
import GuideLines from './GuideLines';
export default function Students({userId}) {
    const [loading,setLoading] = React.useState(false);
    const [age, setAge] = React.useState('');
    const handleChange = (event) => {
      setAge(event.target.value);
      
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
    <Accordion sx={{ padding: '0px',marginTop:'5px' }}>
      <AccordionSummary
        expandIcon={<ArrowDownwardIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography>Guidelines</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: '0px',marginTop:'5px' }}>
       <GuideLines type={'student'} />
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
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Add student</MenuItem>
          <MenuItem value={20}>Update student</MenuItem>
          <MenuItem value={30}>Delete student</MenuItem>
        </Select>
      </FormControl>
    </>
  </div>

}
    </>
  );
}

