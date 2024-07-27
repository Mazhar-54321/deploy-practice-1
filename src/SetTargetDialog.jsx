import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';

const MyDialog = ({ open, onClose,data,flag }) => {
  const [years, setYears] = useState(data?.years);
  const [months, setMonths] = useState(data?.months);
  const [days, setDays] = useState(data?.days);

  const handleAdd = () => {
    console.log(years,months,days);
    let totalDays = years*365+months*30+days;
    console.log(totalDays)
    onClose(years,months,days);
  };
  const getFormattedTitle = ()=>{
    let years = data?.years;
    let months = data?.months;
    let days = data?.days;
    let text = 'Your Previous Target is ';
    if(years>1){
        text += `${years}years`
    }
    if(years==1){
        text += `${years}year`
    }
    if(months>1){
        text += ` ${months}months`
    }
    if(months==1){
        text += ` ${months}month`
    }
    if(days>1){
        text += ` ${days}days`
    }
    if(days==1){
        text += ` ${days}day`
    }
    return text;
  }
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
      <DialogTitle>{flag?getFormattedTitle():''}</DialogTitle>
      <DialogContent>
      <TextField
          fullWidth
          margin="normal"
          label="Enter Years"
          type="number"
          value={years}
          onChange={(e)=>{setYears(e.target.value)}}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          label="Enter Months"
          type="number"
          value={months}
          onChange={(e)=>{setMonths(e.target.value)}}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          label="Enter Days"
          type="number"
          value={days}
          onChange={(e)=>{setDays(e.target.value)}}
          variant="outlined"
        />
       
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAdd} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MyDialog;
