/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import { Accordion, AccordionDetails, AccordionSummary, Button, Divider, Menu, MenuItem, createTheme } from '@mui/material';
import styled from '@emotion/styled';
import IconButton from '@mui/material/IconButton';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import Typography from '@mui/material/Typography';
import List from '@mui/material/List';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import SampleAccordion from './components/SampleAccordion';
const drawerWidth = 300;
const BACKGROUND_SELECTED = 'rgb(0,0,0,1)'
const BACKGROUND_NULL = 'rgb(0,0,0,0)'
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);
const SampleDrawer1 = () => {
  const [accordionData]= React.useState({
     Namaz : {
      Level1:[{
        question:"Namaz me Kitne Farz hai?",
        Urdu:"نماز میں کتنے فرض ہیں؟",
        urduAnswer:"قیام کرنا، رکوع کرنا، قعود کرنا، سجدہ کرنا",
        answer:"Qayam karna , ruku karna , qauma karna,sajda karna"
      }],
      Level2:[{
        question:"Namaz me Kitne Farz hai?",
        Urdu:"نماز میں کتنے فرض ہیں؟",
        urduAnswer:"قیام کرنا، رکوع کرنا، قعود کرنا، سجدہ کرنا",
        answer:"Qayam karna , ruku karna , qauma karna,sajda karna"
      }],
      Level3:[{
        question:"Namaz me Kitne Farz hai?",
        Urdu:"نماز میں کتنے فرض ہیں؟",
        urduAnswer:"قیام کرنا، رکوع کرنا، قعود کرنا، سجدہ کرنا",
        answer:"Qayam karna , ruku karna , qauma karna,sajda karna"
      }]
     },
     Roza : {
      Level1:[],
      Level2:[],
      Level3:[]
     },
     Hujj : {
      Level1:[],
      Level2:[],
      Level3:[]
     },
     Zakat:{
      Level1:[],
      Level2:[],
      Level3:[]
     }
  })
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElTwo, setAnchorElTwo] = useState(null);
  const toggleDrawer = (open,list) => (event) => {
    console.log(list);
   if(list===1){
    console.log('llll')
    setOpenDrawer(open);
   }
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpenDrawer(open);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClick2 = (event) => {
    setAnchorElTwo(event.currentTarget);
  };
  const handleMenuClose2 = () => {
    setAnchorElTwo(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const [appbarText, setAppbarText] = React.useState('Test Mode')
  const [level,setLevel] = React.useState('Level1');
  const [level1,setLevel1] = React.useState('Roman');
  const [language,setLanguage] = React.useState(true);

  useEffect(()=>{
   getAppBarText(value);
  },[language]);
  
  const handleClose1 = (value1) => {
  console.log(value1);
  
  if(value1==='Urdu'){
    if(language){
      setOpenDrawer(false);
    }
    setLanguage(false);
  }else{
  if(!language){
  setOpenDrawer(false);
  }
    setLanguage(true)
  }
 
    setLevel1(value1);
    handleMenuClose();
    //setAnchorElMenu1(null);
  };
  const [value, setValue] = React.useState(null)

  const [open, setOpen] = React.useState(false);
  const theme = createTheme({
    palette: {
      primary: {
        main: "#FFFFFF",
      },
      secondary: {
        main: '#FFFFFF'
      }
    },
  });
  const [listData, setListData] = React.useState([{
    title: 'Namaz',
    urduTitle:'نماز',
    background: BACKGROUND_NULL
  },
  {
    title: 'Roza',
    urduTitle:"روزہ",
    background: BACKGROUND_NULL
  },

  {
    title: 'Hujj',
    urduTitle:"حج",
    background: BACKGROUND_NULL
  },
  {
    title: 'Zakat',
    urduTitle:"زکات",
    background: BACKGROUND_NULL
  },
  ])
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const getLayout = (value) => {
    let oldArray = [...listData]
    oldArray = oldArray.map((e, i) => {
      if (i == value) {
        e.background = BACKGROUND_SELECTED
      } else {
        e.background = BACKGROUND_NULL
      }
      return e

    }
    )
    setListData(oldArray)
    setLevel('Level1');
    switch (value) {
      case 0: setAppbarText(language?'Namaz':'نماز'); break;
      case 1: setAppbarText(language?'Roza':"روزہ"); ; break;
      case 2: setAppbarText(language?'Hujj':"حج" ); ; break;
      case 3: setAppbarText(language?'Zakat':"زکات"); ; break;
      
    }
  }
  const getAppBarText =(value)=>{
    console.log('alll',value,language);
    switch (value) {
      case 0: setAppbarText(language?'Namaz':'نماز'); break;
      case 1: setAppbarText(language?'Roza':"روزہ"); ; break;
      case 2: setAppbarText(language?'Hujj':"حج" ); ; break;
      case 3: setAppbarText(language?'Zakat':"زکات"); ; break;
      
    }
  }
  const getTopicName = (value)=>{
    switch (value) {
      case 0: return 'Namaz'; 
      case 1:return 'Roza'; 
      case 2:return 'Hujj'; 
      case 3:return 'Zakat'; 
      
    }
  }
  
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  return (
    <div >
      {/* <Button onClick={toggleDrawer(true)}>Open Drawer</Button> */}
      <AppBar position="fixed" style={{background:"#000000",color:"#ffffff",justifyContent:'space-between'}} open={open}>
        <Toolbar style={{ display:'flex',flexDirection:language?'row':'row-reverse'}} >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{width:'120px'}} noWrap component="div">
            {appbarText}
          </Typography>
          <div style={{display:'flex',width:'100%',justifyContent:language?'flex-end':'flex-start'}}>
          <Button
        
        onClick={handleMenuClick2}
        endIcon={<ExpandMoreIcon />}
        style={{color:'white',textTransform:'none'}}
      >
       { level}
      </Button>
      <Menu
            anchorEl={anchorElTwo}
            open={Boolean(anchorElTwo)}
            onClose={handleMenuClose2}
            style={{left:language?window.innerWidth-150:16}}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
             <MenuItem onClick={()=>{setLevel('Level1');handleMenuClose2()}}>Level1</MenuItem>
        <MenuItem onClick={()=>{setLevel('Level2');handleMenuClose2()}}>Level2</MenuItem>
        <MenuItem onClick={()=>{setLevel('Level3');handleMenuClose2()}}>Level3</MenuItem>
          </Menu>
     
          </div>
        </Toolbar>
      </AppBar>
      <Drawer anchor={language?"left":"right"} style={{width:'300px'}} open={openDrawer} onClose={toggleDrawer(false)}>
        <div>
         
          <DrawerHeader style={{background:'#000000',color:'#ffffff'}} >
        <div style={{width:'100%',background:'#000000',color:'#ffffff', display:'flex',alignItems:'start', justifyContent:'space-between'}}>
          <div style={{marginTop:'5px'}}><span style={{ width:'50%',padding:'2px 5px 2px 5px', border:'1px solid #ffffff'}}>Guest</span>
          <Button
        
        onClick={handleMenuClick}
        endIcon={<ExpandMoreIcon />}
        style={{color:'white',textTransform:'none',marginLeft:'100px'}}
      >
       { level1}
      </Button>
      <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
             <MenuItem onClick={()=>{handleClose1('Roman');;handleMenuClose()}}>Roman</MenuItem>
        <MenuItem onClick={()=>{handleClose1('English');;handleMenuClose()}}>English</MenuItem>
        <MenuItem onClick={()=>{handleClose1('Urdu');;handleMenuClose()}}>Urdu</MenuItem>
          </Menu>
      
      </div>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <WestOutlinedIcon style={{color:'#ffffff'}} /> : <EastOutlinedIcon style={{color:'#000000'}}/>}
          </IconButton>
        </div>
         
        </DrawerHeader>
        <Divider  />
        <Accordion elevation={0} style={{marginTop:'0px',}} sx={{
          
          padding:0,
              '&:before': {
                  display: 'none',
              }}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{fontWeight:'bold',color:'#000000'}} />}
            sx={{flexDirection:!language?'row-reverse':'row'}}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: '100%',textAlign:!language?'right':'left',fontWeight:'bold',fontSize:'18px', flexShrink: 0 }}>
              {language?'Aamal':'اعمال'}
            </Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: '0px 0px 0px 0px' }}>
            <List sx={{ padding: '0px 0px 0px 0px',marginTop:'0px',flexDirection:'row-reverse' }}>
              {listData.map((text, index) => (
                <ListItem sx={{  background: text.background, color: text.background == BACKGROUND_NULL ? 'black' : 'white',fontSize:'12px',fontWeight:'100' }} key={text} disablePadding>
                  <ListItemButton onClick={() => {setOpenDrawer(false); setValue(index); getLayout(index);  }}>
                   
                    <ListItemText sx={{marginLeft:'10px',fontSize:'12px',fontWeight:'100',textAlign:language?'left':'right'}} primary={language?text.title:text.urduTitle} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
        </div>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {
          <SampleAccordion accordionData={accordionData?.[getTopicName(value)]?.[level] || []} language={language} />
        }

      </Main>
    </div>
  );
};

export default SampleDrawer1;
