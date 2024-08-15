import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Chip, TextField } from '@mui/material';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Classes from './Classes';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { toast } from 'react-toastify';



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
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
export default function AddCourseDialog({open,setOpen,saveCourse}) {

    const [age, setAge] = React.useState('');
    const handleChange = (event) => {
        setAge(event.target.value);
       setCourseData((prev)=>({...prev,'category':event.target.value}))
      };
    const [classesData,setClassesData] = React.useState({});
    const [isSaveEnabled,setIsSaveEnabled] = React.useState(false);
    const [courseData,setCourseData] = React.useState({
      name:'',
      fees:'',
      description:'',
      category:null,
    })
    const [courseLogo,setCourseLogo] = React.useState(null)
    const [courseDataErrorMessages,setCourseDataErrorMessages] = React.useState({
      name:{
        error:false,
        val:'Name must be atleast 5 chars'
      },
      fees:{
        error:false,
        val:'Fees must be greater than 100'
      },
      fees:{
        error:false,
        val:'description must be atleast 5 chars'
      },
      category:{
        val:'category cant be empty',
        error:false
      }
    })
  React.useEffect(()=>{
    setIsSaveEnabled(courseData?.name?.length>=5 && courseData?.fees>=100 && courseData?.category && courseData?.description?.length>=5 && courseLogo) 
  },[courseData,courseLogo])
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
  const saveCourseToDB = ()=>{
    const courseKey = crypto.randomUUID();
    saveCourse(courseKey,courseData,courseLogo);
    handleClose();
  }
  const handleFiles = (files)=>{
    console.log(files[0]);
    if(files[0].type.includes("image")){
    setCourseLogo(files[0])
    }else{
      toast.error('only images are accepted');
    }
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
            <Button disabled={!isSaveEnabled}   autoFocus color="inherit" onClick={saveCourseToDB}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        
        <TextField 
        helperText={courseDataErrorMessages.name.val} sx={{margin:'10px',width:'90%'}} id="outlined-basic" onChange={(e)=>setCourseData((prev)=>({...prev,"name":e.target.value}))} label="Enter course name" size='small'  variant="outlined" />
        
        <TextField 
        helperText={courseDataErrorMessages.fees.val} sx={{margin:'10px',width:'90%'}} id="outlined-basic" type='number' onChange={(e)=>setCourseData((prev)=>({...prev,"fees":e.target.value}))} label="Enter course fees" size='small'  variant="outlined" />
        
        <FormControl  size='small' sx={{  width: '90%',margin:'10px' }}>
        <InputLabel   id="demo-simple-select-helper-label">Select course category</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={age}
          label="Select course category"
          onChange={handleChange}
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
       
        <TextField helperText={'Description is mandatory atleast 5 chars'} sx={{margin:'10px',width:'90%'}} onChange={(e)=>setCourseData((prev)=>({...prev,"description":e.target.value}))} id="outlined-basic" label="Enter course description" size='small' multiline rows={2}  variant="outlined" />
       <div style={{width:'90%',display:'flex',justifyContent:'space-between',margin:'10px'}}>
       <div style={{display:'flex',flexDirection:'column',alignContent:'center'}}><Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      sx={{margin:'10px',textTransform:'none'}}
      startIcon={<CloudUploadIcon />}

    >
      Upload Course Image
      <VisuallyHiddenInput  type="file" onChange={(e)=>handleFiles(e.target.files)} />
      </Button>
      <span style={{fontSize:'10px',opacity:'0.5',alignContent:'center',margin:'10px',marginTop:'0px'}}> only images are accepted</span>
      </div>
     
       </div>
       {courseLogo && <div style={{alignContent:'start',margin:'10px'}}><Chip  label={courseLogo?.name} variant='outlined'></Chip></div>}
       {/* <div style={{width:'90%',display:'flex',justifyContent:'space-between',margin:'10px'}}>
        <Typography variant='h6'>Add classes</Typography>
        <IconButton onClick={addClassHandler} style={{paddingRight:'0px'}} aria-label="delete">
  <AddCircleOutlineIcon />
</IconButton>
       </div>
       
       <div >{Object.keys(classesData).map((e)=><Classes classKey={e} classData={classesData} key={e} setClasses={setClassesData} />)}</div> */}
      </Dialog>
    </React.Fragment>
  );
}