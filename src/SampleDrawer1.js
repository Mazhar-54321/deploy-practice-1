/* eslint-disable default-case */
import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Accordion, AccordionDetails, AccordionSummary, AppBar, IconButton, Menu, MenuItem, Toolbar, Typography, createTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import styled from '@emotion/styled';
import SampleTextFields from './components/SampleTextFields';
import SampleAlert from './components/SampleFeedbacks';
import SampleList from './components/SampleList';
import SampleAccordion from './components/SampleAccordion';
import SampleAutocomplete from './components/SampleAutocomplete';
import SampleAvatars from './components/SampleAvatars';
import SampleButtons from './components/SampleButtons';
const drawerWidth = 300;
const BACKGROUND_SELECTED = 'rgb(0,0,0,1)'
const BACKGROUND_NULL = 'rgb(0,0,0,0)'
export default function SampleDrawer1() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
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
  const [anchorElMenu1, setAnchorElMenu1] = React.useState(null);
  const [level,setLevel] = React.useState('Level 1');
  const [level1,setLevel1] = React.useState('Roman');
  const [element, setElement] = React.useState(<SampleTextFields />)

  const openMenu = Boolean(anchorElMenu);
  const openMenu1 = Boolean(anchorElMenu1);

  const handleClick = (event) => {
    setAnchorElMenu(event.currentTarget);
  };
  const handleClose = (level) => {
    setLevel(level);
    setAnchorElMenu(null);
  };
  const handleClick1 = (event) => {
    setAnchorElMenu1(event.currentTarget);
  };
  const handleClose1 = (value) => {
    setLevel1(value)
    setAnchorElMenu1(null);
  };
  
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const getLayout = (value) => {
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
        // case 4: setAppbarText('Sample Alerts'); setElement(<SampleAlert />); break;
        // case 5: setAppbarText('Sample List'); setElement(<SampleList />); break;
        // case 6: setAppbarText('Sample Loaders'); setElement(<SampleLoaders />); break;
        // case 7: setAppbarText('Sample Menu'); setElement(<SampleMenu />); break;
        // case 8: setAppbarText('Sample Pagination'); setElement(<SamplePagination />); break;
        // case 9: setAppbarText('Sample Rating'); setElement(<SampleRatings />); break;
        // case 10: setAppbarText('Sample Stepper'); setElement(<VerticalLinearStepper />); break;
        // case 11: setAppbarText('Sample Accordion'); setElement(<SampleTable />); break;
        // case 12: setAppbarText('Sample Text'); setElement(<SampleTextFields />)
      }
    }
    
  }
  const handleMobileMenuOpen = (event) => {
    console.log(event.currentTarget);
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));
  return (
    <div>
      {['left', 'right', 'top', 'bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          <AppBar position="fixed" style={{background:"#000000",color:"#ffffff"}} open={open}>
        <Toolbar  style={{display:'flex',flexDirection:'row-reverse'}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer('right', true)}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{width:'120px'}} noWrap component="div">
            {appbarText}
          </Typography>
          <div style={{display:'flex',flexDirection:'row-reverse', width:'100%',justifyContent:'flex-end'}}>
          <Button
        id="basic-button"
        aria-controls={openMenu ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<ExpandMoreIcon />}
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
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
           <DrawerHeader style={{background:'#000000',color:'#ffffff'}} >
        <div style={{width:'100%',background:'#000000',color:'#ffffff', display:'flex',alignItems:'start', justifyContent:'space-between'}}>
          <div style={{marginTop:'5px'}}><span style={{ width:'50%',padding:'2px 5px 2px 5px', border:'1px solid #ffffff'}}>Guest</span>
          <Button
        id="basic-button1"
        aria-controls={openMenu1 ? 'basic-menu1' : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu1 ? 'true' : undefined}
        onClick={handleClick1}
        endIcon={<ExpandMoreIcon />}
        style={{color:'white',textTransform:'none',marginLeft:'100px'}}
      >
       { level1}
      </Button>
      <Menu
        id="basic-menu1"
        anchorEl={anchorElMenu1}
        open={openMenu1}
        onClose={handleClose1}
        MenuListProps={{
          'aria-labelledby': 'basic-button1',
        }}
      >
        <MenuItem onClick={()=>handleClose1('Roman')}>Roman</MenuItem>
        <MenuItem onClick={()=>handleClose1('English')}>English</MenuItem>
        <MenuItem onClick={()=>handleClose1('Urdu')}>Urdu</MenuItem>
      </Menu>
      </div>
          <IconButton onClick={toggleDrawer(anchor, false)}>
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
           //expandIcon={elements[i] ? <RemoveIcon sx={{color:'#000000'}} /> : <AddIcon sx={{color:'#000000'}}/>}
            expandIcon={<ExpandMoreIcon style={{fontWeight:'bold',color:'#000000'}} />}
            style={{ margin: '0px 0px -15px 0px' }}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: '100%',fontWeight:'bold',fontSize:'18px', textAlign:'left', flexShrink: 0 }}>
              Aamal E Saleha
            </Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: '0px 0px 0px 0px' }}>
            <List sx={{ padding: '0px 0px 0px 0px',marginTop:'0px' }}>
              {listData.map((text, index) => (
                <ListItem sx={{  background: text.background, color: text.background == BACKGROUND_NULL ? 'black' : 'white',fontSize:'12px',fontWeight:'100' }} key={text} disablePadding>
                  <ListItemButton onClick={()=>{getLayout(index); toggleDrawer(anchor, false) }}>
                    {/* <ListItemIcon sx={{ color: text.background == BACKGROUND_NULL ? 'black' : 'white' }}>
                    </ListItemIcon> */}
                    <ListItemText sx={{marginLeft:'10px',fontSize:'12px',fontWeight:'100'}} primary={text.title} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
          </SwipeableDrawer>
          <Main >
        <DrawerHeader />
        {
          element
        }

      </Main>
        </React.Fragment>
      ))}
    </div>
  );
}