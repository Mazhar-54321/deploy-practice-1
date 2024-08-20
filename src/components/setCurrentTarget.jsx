import React, {  useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogActions, Button,  TextField } from '@mui/material';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const CurrentTargetDialog = ({ open,closePerformanceDialog,savePerformance,qazaNamazData }) => {
  const [currentValues,setCurrentValues] = useState([0,0,0,0,0,0])
  const [value, setValue] = React.useState(dayjs());
  const [days,setDays]= useState(0);
  useEffect(()=>{
    let formattedDate = dayjs(value).format("DD-MMMM-YYYY")
    let updatedData = qazaNamazData?.filter(e=>e.date === formattedDate)[0];
    if(updatedData){
       setCurrentValues(updatedData.individual);
       setDays(updatedData.days);
    }else{
      setDays(0);
      setCurrentValues([0,0,0,0,0,0])
    }
    
  },[value]);
  
  return (
    <Dialog
      open={open}
      onClose={()=>closePerformanceDialog()}
      fullWidth
      maxWidth={false} 
      PaperProps={{
        style: {
          width: '100%', 
          maxWidth: '100vw',
          overflowX: 'hidden', 
        },
      }}
    >
      <DialogContent>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        
        <DatePicker
          label="Select Date"
          format={"DD-MMMM-YYYY"}
          value={value}
          onChange={(newValue) => setValue(newValue)}
          maxDate={dayjs()}
        />
      </DemoContainer>
    </LocalizationProvider>
    <TextField
          fullWidth
          margin="normal"
          label="Enter Number of days of Qaza U prayed"
          type="number"
          value={days}
          onChange={(e)=>{setDays((e.target.value));}}
          variant="outlined"
        />
     <div style={{display:'flex',justifyContent:'space-between'}}> <TextField
               style={{marginRight:'10px'}}

          fullWidth
          margin="normal"
          label="Enter Number of fajr Qaza U prayed"
          type="number"
          value={currentValues[0]}
          InputLabelProps={{
            sx: {
              fontSize: '10px', 
            },
          }}
          onChange={(e)=>{let cValues = [...currentValues]; cValues[0]=e.target.value;setCurrentValues([...cValues])}}
          variant="outlined"
        />
        <TextField
          fullWidth
          InputLabelProps={{
            sx: {
              fontSize: '10px', 
            },
          }}
          margin="normal"
          label="Enter Number of zuhr Qaza U prayed"
          type="number"
          value={currentValues[1]}
          onChange={(e)=>{let cValues = [...currentValues]; cValues[1]=e.target.value;setCurrentValues([...cValues])}}
          variant="outlined"
        />
        </div>
        <div style={{display:'flex',justifyContent:'space-between'}}> <TextField
                  style={{marginRight:'10px'}}
                  InputLabelProps={{
                    sx: {
                      fontSize: '10px', 
                      
                    },
                  }}
          fullWidth
          margin="normal"
          label="Enter Number of asr Qaza U prayed"
          type="number"
          value={currentValues[2]}
          onChange={(e)=>{let cValues = [...currentValues]; cValues[2]=e.target.value;setCurrentValues([...cValues])}}
          variant="outlined"
        />
         <TextField
          fullWidth
          InputLabelProps={{
            sx: {
              fontSize: '10px', 
            },
          }}
          margin="normal"
          label="Enter Number of magrib Qaza U prayed"
          type="number"
          value={currentValues[3]}
          onChange={(e)=>{let cValues = [...currentValues]; cValues[3]=e.target.value;setCurrentValues([...cValues])}}
          variant="outlined"
        />
       </div>
       <div style={{display:'flex',justifyContent:'space-between'}}> 
        <TextField
          fullWidth
          InputLabelProps={{
            sx: {
              fontSize: '10px', 
            },
          }}
          margin="normal"
          label="Enter Number of isha Qaza U prayed"
          type="number"
          value={currentValues[4]}
          style={{marginRight:'10px'}}
          onChange={(e)=>{let cValues = [...currentValues]; cValues[4]=e.target.value;setCurrentValues([...cValues])}}
          variant="outlined"
        />
        <TextField
          fullWidth
          InputLabelProps={{
            sx: {
              fontSize: '10px', 
            },
          }}
          margin="normal"
          label="Enter Number of vitr Qaza U prayed"
          type="number"
          value={currentValues[5]}
          onChange={(e)=>{let cValues = [...currentValues]; cValues[5]=e.target.value;setCurrentValues([...cValues])}}
          variant="outlined"
        />
        </div>
       
      </DialogContent>
      <DialogActions>
        <Button onClick={closePerformanceDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={()=>{
          savePerformance({
            days:Number(days),
            date:dayjs(value).format("DD-MMMM-YYYY"),
            individual:currentValues.map((e)=>Number(e))
          })
        }} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CurrentTargetDialog;
