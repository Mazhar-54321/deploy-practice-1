import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const CurrentTargetDialog = ({ open, onClose,data,flag }) => {
  const [currentValues,setCurrentValues] = useState([0,0,0,0,0,0])
  const [value, setValue] = React.useState(dayjs());
  const [days,setDays]= useState(0);
 
  
  return (
    <Dialog
      open={open}
      onClose={()=>onClose()}
      fullWidth
      maxWidth={false} // Ensures the dialog is full width
      PaperProps={{
        style: {
          width: '100%', // Ensures the dialog content takes up the full width
          maxWidth: '100vw', // Optional: Ensures the dialog does not exceed the viewport width
          overflowX: 'hidden', // Prevents horizontal scrollbars
        },
      }}
    >
      <DialogContent>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        
        <DatePicker
          label="Select Date"
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
          onChange={(e)=>{setDays(e.target.value);}}
          variant="outlined"
        />
      <TextField
          fullWidth
          margin="normal"
          label="Enter Number of fajr Qaza U prayed"
          type="number"
          value={currentValues[0]}
          onChange={(e)=>{setCurrentValues((prev)=>prev.map((e,i)=>e=i==0?e.target.value:e))}}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          label="Enter Number of zuhr Qaza U prayed"
          type="number"
          value={currentValues[1]}
          onChange={(e)=>{setCurrentValues((prev)=>prev.map((e,i)=>e=i==1?e.target.value:e))}}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          label="Enter Number of asr Qaza U prayed"
          type="number"
          value={currentValues[2]}
          onChange={(e)=>{setCurrentValues((prev)=>prev.map((e,i)=>e=i==2?e.target.value:e))}}
          variant="outlined"
        />
         <TextField
          fullWidth
          margin="normal"
          label="Enter Number of magrib Qaza U prayed"
          type="number"
          value={currentValues[3]}
          onChange={(e)=>{setCurrentValues((prev)=>prev.map((e,i)=>e=i==3?e.target.value:e))}}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          label="Enter Number of isha Qaza U prayed"
          type="number"
          value={currentValues[4]}
          onChange={(e)=>{setCurrentValues((prev)=>prev.map((e,i)=>e=i==4?e.target.value:e))}}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          label="Enter Number of vitr Qaza U prayed"
          type="number"
          value={currentValues[5]}
          onChange={(e)=>{setCurrentValues((prev)=>prev.map((e,i)=>e=i==5?e.target.value:e))}}
          variant="outlined"
        />
       
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={()=>{

        }} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CurrentTargetDialog;
