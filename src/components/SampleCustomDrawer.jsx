import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import SampleAutocomplete from './SampleAutocomplete';
import SampleButtons from './SampleButtons';
import SamplePagination from './SamplePagination';
import SampleAccordion from './SampleAccordion';
import SampleTextFields from './SampleTextFields';
import SampleTable from './SampleTable';
import VerticalLinearStepper from './SampleStepper';
import SampleRatings from './SampleRatings';
import SampleMenu from './SampleMenu';
import SampleLoaders from './SampleLoaders';
import SampleList from './SampleList';
import SampleAlert from './SampleFeedbacks';
import SampleAvatars from './SampleAvatars';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import MotionPhotosAutoIcon from '@mui/icons-material/MotionPhotosAuto';

import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';

import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { AddSubjects } from './AddSubjects/AddSubjects';

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

export default function SampleCustomDrawer() {
  const theme = useTheme();
  const [listData, setListData] = React.useState([{
    title: 'Accordion',
    background: BACKGROUND_NULL
  },
  {
    title: 'Autocomplete',
    background: BACKGROUND_NULL
  },

  {
    title: 'Avatars',
    background: BACKGROUND_NULL
  },
  {
    title: 'Buttons',
    background: BACKGROUND_NULL
  },
  {
    title: 'Feedbacks',
    background: BACKGROUND_NULL
  },
  {
    title: 'List',
    background: BACKGROUND_NULL
  },
  {
    title: 'Loaders',
    background: BACKGROUND_NULL
  },
  {
    title: 'Menu',
    background: BACKGROUND_NULL
  },
  {
    title: 'Pagination',
    background: BACKGROUND_NULL
  },
  {
    title: 'Ratings',
    background: BACKGROUND_NULL
  },
  {
    title: 'Stepper',
    background: BACKGROUND_NULL
  },
  {
    title: 'Table',
    background: BACKGROUND_NULL
  },
  {
    title: 'Text Fields',
    background: BACKGROUND_NULL
  },])
  const [appbarText, setAppbarText] = React.useState('Test Mode')
  const [open, setOpen] = React.useState(false);
  const [element, setElement] = React.useState(<SampleTextFields />)
  const [value, setValue] = React.useState(null)
  const handleDrawerOpen = () => {
    setOpen(true);
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
    switch (value) {
      case 0: setAppbarText('ADD SUBJECTS'); setElement(<AddSubjects />); break;
      case 1: setAppbarText('ADD NOTES'); setElement(<SampleAutocomplete />); break;
      case 2: setAppbarText('EDIT SUBJECTS'); setElement(<SampleAvatars />); break;
      case 3: setAppbarText('EDIT NOTES'); setElement(<SampleButtons />); break;
      case 4: setAppbarText('GRANT PERMISSION'); setElement(<SampleAlert />); break;
      case 5: setAppbarText('REMOVE PERMISSION'); setElement(<SampleList />); break;
      case 6: setAppbarText('UPDATE FEES'); setElement(<SampleLoaders />); break;
    
    }
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={open}>
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
          <Typography variant="h6" noWrap component="div">
            {appbarText}
          </Typography>
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
            {theme.direction === 'ltr' ? <WestOutlinedIcon /> : <EastOutlinedIcon />}
          </IconButton>
        </DrawerHeader>
       <List style={{margin:'0px 0px 0px 0px', width:drawerWidth}}>
        <ListItem onClick={()=>{setOpen(false);getLayout(0)}} style={{width:drawerWidth}}>
            <ListItemText style={{width:drawerWidth}}>
                <div   style={{marginLeft:'-30px',marginRight:'50px', cursor:'pointer',color:'black',background:'white', display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',width:drawerWidth}}>
                <MotionPhotosAutoIcon /> 
                 <div>Add Subjects</div>
                
                </div>
            </ListItemText>
            <ListItemIcon ></ListItemIcon>
        </ListItem>
       </List>
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