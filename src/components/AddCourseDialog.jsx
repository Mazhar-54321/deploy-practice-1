import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TextField } from '@mui/material';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Classes from './Classes';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddCourseDialog({open,setOpen}) {

    const [age, setAge] = React.useState('');
    const handleChange = (event) => {
        setAge(event.target.value);
        if(event.target.value === '10'){
            
        }
      };
    const [classesData,setClassesData] = React.useState({})

  const handleClose = () => {
    setOpen();
  };
  const addClassHandler =()=>{
    const newUuid = crypto.randomUUID();
    console.log(newUuid);
    let classObj ={
      className : '',
      videoLink:'',
      files:[]
    }
    setClassesData((prev)=>({...prev,[newUuid]:classObj}));
  }
  return (
    <React.Fragment>
      
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Cancel
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <TextField sx={{margin:'10px',width:'90%'}} id="outlined-basic" label="Enter course name" size='small'  variant="outlined" />
        <TextField sx={{margin:'10px',width:'90%'}} id="outlined-basic" label="Enter course fees" size='small'  variant="outlined" />
        <FormControl sx={{  width: '90%',margin:'10px' }}>
        <InputLabel id="demo-simple-select-helper-label">Select course category</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={age}
          size='small'
          label="Select course category"
          onChange={handleChange}
        >
          
          <MenuItem value={10}>General</MenuItem>
          <MenuItem value={20}>Hikmat</MenuItem>
          <MenuItem value={30}>Ruhaniyat</MenuItem>
        </Select>
      </FormControl>
        <TextField sx={{margin:'10px',width:'90%'}} id="outlined-basic" label="Enter course description" size='small' multiline rows={2}  variant="outlined" />
       <div style={{width:'90%',display:'flex',justifyContent:'space-between',margin:'10px'}}>
        <Typography variant='h6'>Add classes</Typography>
        <IconButton onClick={addClassHandler} style={{paddingRight:'0px'}} aria-label="delete">
  <AddCircleOutlineIcon />
</IconButton>
       </div>
       <div >{Object.keys(classesData).map((e)=><Classes classKey={e} classData={classesData[e]} key={e} setClasses={setClassesData} />)}</div>
      </Dialog>
    </React.Fragment>
  );
}