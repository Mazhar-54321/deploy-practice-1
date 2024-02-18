/* eslint-disable default-case */
/* eslint-disable react/jsx-no-undef */
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import AccountCircle from '@mui/icons-material/AccountCircle';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';

import { Accordion, AccordionDetails, AccordionSummary, Button, Menu, MenuItem, createTheme } from '@mui/material';
import SampleAutocomplete from './components/SampleAutocomplete';
import SampleTextFields from './components/SampleTextFields';
import SampleAccordion from './components/SampleAccordion';
import SampleAvatars from './components/SampleAvatars';
import SampleButtons from './components/SampleButtons';
import SampleList from './components/SampleList';
import SampleAlert from './components/SampleFeedbacks';
import SampleLoaders from './components/SampleLoaders';
import SampleMenu from './components/SampleMenu';
import SamplePagination from './components/SamplePagination';
import SampleTable from './components/SampleTable';
import VerticalLinearStepper from './components/SampleStepper';

const drawerWidth = 300;
const BACKGROUND_SELECTED = 'rgb(0,0,0,1)'
const BACKGROUND_NULL = 'rgb(0,0,0,0)'
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

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

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function SampleDrawer() {
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
    background: BACKGROUND_NULL
  },
  {
    title: 'Roza',
    background: BACKGROUND_NULL
  },

  {
    title: 'Hujj',
    background: BACKGROUND_NULL
  },
  {
    title: 'Zakat',
    background: BACKGROUND_NULL
  },
  ])

  const [appbarText, setAppbarText] = React.useState('Test Mode')
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const menuId = 'primary-search-account-menu';
  const isMenuOpen = Boolean(anchorEl);
  const [element, setElement] = React.useState(<SampleTextFields />)
  const [value, setValue] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const [anchorElMenu, setAnchorElMenu] = React.useState(null);
  const [level,setLevel] = React.useState('Level 1');
  const openMenu = Boolean(anchorElMenu);
  const handleClick = (event) => {
    console.log(event.currentTarget);
    setAnchorElMenu(event.currentTarget);
  };
  const handleClose = (level) => {
    setLevel(level);
    setAnchorElMenu(null);
  };
  
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const getLayout = (value) => {
    console.log(value)
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
      case 0: setAppbarText('Namaz'); setElement(<SampleAccordion />); break;
      case 1: setAppbarText('Roza'); setElement(<SampleAutocomplete />); break;
      case 2: setAppbarText('Hujj'); setElement(<SampleAvatars />); break;
      case 3: setAppbarText('Zakat'); setElement(<SampleButtons />); break;
      case 4: setAppbarText('Sample Alerts'); setElement(<SampleAlert />); break;
      case 5: setAppbarText('Sample List'); setElement(<SampleList />); break;
      case 6: setAppbarText('Sample Loaders'); setElement(<SampleLoaders />); break;
      case 7: setAppbarText('Sample Menu'); setElement(<SampleMenu />); break;
      case 8: setAppbarText('Sample Pagination'); setElement(<SamplePagination />); break;
      case 9: setAppbarText('Sample Rating'); setElement(<SampleRatings />); break;
      case 10: setAppbarText('Sample Stepper'); setElement(<VerticalLinearStepper />); break;
      case 11: setAppbarText('Sample Accordion'); setElement(<SampleTable />); break;
      case 12: setAppbarText('Sample Text'); setElement(<SampleTextFields />)
    }
  }
  const handleMobileMenuOpen = (event) => {
    console.log(event.currentTarget);
    setMobileMoreAnchorEl(event.currentTarget);
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" style={{background:"#000000",color:"#ffffff"}} open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{width:'120px'}} noWrap component="div">
            {appbarText}
          </Typography>
          <div style={{display:'flex',width:'100%',justifyContent:'flex-end'}}>
          <Button
        id="basic-button"
        aria-controls={openMenu ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu ? 'true' : undefined}
        onClick={handleClick}
        style={{color:'white',textTransform:'none'}}
      >
       { level}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorElMenu}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={()=>handleClose('Level1')}>Level1</MenuItem>
        <MenuItem onClick={()=>handleClose('Level2')}>Level2</MenuItem>
        <MenuItem onClick={()=>handleClose('Level3')}>Level3</MenuItem>
      </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <WestOutlinedIcon style={{color:'#000000'}} /> : <EastOutlinedIcon style={{color:'#000000'}}/>}
          </IconButton>
        </DrawerHeader>
       
        <Accordion elevation={0} style={{marginTop:'0px',}} sx={{
          
          padding:0,
              '&:before': {
                  display: 'none',
              }}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{fontWeight:'bold',color:'#000000'}} />}
            style={{ margin: '0px 0px -15px 0px' }}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: '100%',fontWeight:'bold', textAlign:'left', flexShrink: 0 }}>
              Aamal
            </Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: '0px 0px 0px 0px' }}>
            <List sx={{ padding: '0px 0px 0px 0px',marginTop:'0px' }}>
              {listData.map((text, index) => (
                <ListItem sx={{  background: text.background, color: text.background == BACKGROUND_NULL ? 'black' : 'white' }} key={text} disablePadding>
                  <ListItemButton onClick={() => { setValue(index); getLayout(index); handleDrawerClose() }}>
                    {/* <ListItemIcon sx={{ color: text.background == BACKGROUND_NULL ? 'black' : 'white' }}>
                    </ListItemIcon> */}
                    <ListItemText sx={{marginLeft:'10px',}} primary={text.title} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
        {/* <Accordion elevation={0} sx={{
              '&:before': {
                  display: 'none',
              }}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            style={{ margin: '0px 0px -15px 0px' }}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: '100%',textAlign:'left', flexShrink: 0 }}>
              Mamulat-e-Ahle-Sunnat
            </Typography>
          </AccordionSummary>
          <AccordionDetails >
            <List   >
              {listData.map((text, index) => (
                <ListItem  style={{  background: text.background, color: text.background == BACKGROUND_NULL ? 'black' : 'white' }} key={text} >
                  <ListItemButton onClick={() => { setValue(index); getLayout(index); handleDrawerClose() }}>
                   
                    <ListItemText style={{alignItems:'flex-start'}} primary={text.title} />
                    <ListItemIcon style={{alignItems:'flex-start', color: text.background == BACKGROUND_NULL ? 'black' : 'white' }}>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion> */}
        {/* <List disablePadding>
          <ListItem disablePadding key={"Contact Us"}>
            <ListItemButton>
              
              <ListItemText primary={"Contact Us"} />
              <ListItemIcon >
                <InboxIcon style={{marginLeft:'30px'}} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding key={"About Us"}>
            <ListItemButton>
              
              <ListItemText primary={"About Us"} />
              <ListItemIcon>
                <InboxIcon  style={{marginLeft:'30px'}}/>
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List> */}
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {
          element
        }

      </Main>
    </Box>
  );
}