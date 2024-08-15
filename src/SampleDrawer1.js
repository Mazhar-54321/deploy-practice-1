// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import { Accordion, AccordionDetails, AccordionSummary, Button, Divider, ListItemIcon, Menu, MenuItem, createTheme } from '@mui/material';
import styled from '@emotion/styled';
import IconButton from '@mui/material/IconButton';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Pagination from '@mui/material/Pagination';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TablePagination from '@mui/material/TablePagination';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import SampleAccordion from './components/SampleAccordion';
import SignIn from './signIn';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import SignOut from './SignOut';
import QazaNamaz from './components/QazaNamaz';
import ExampleTree from './components/ExampleTree';
import WelcomeScreen from './components/WelcomeScreen';
import logo from './assets/logo.png'
import StudentPortal from './components/StudentPortal';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import EventIcon from '@mui/icons-material/Event';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import GroupIcon from '@mui/icons-material/Group';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
const drawerWidth = 300;
const BACKGROUND_SELECTED = 'rgb(0,0,0,1)'
const BACKGROUND_NULL = 'rgb(0,0,0,0)'

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 50,
  height: 50,
}));
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));
const welcomeContent = `Hamari koshish hai ki logon ke ruhani safar ko behtar banaya jaye Miya Huzoor ke
 guidance ke tehat aur unki problems ko solve kiya jaye. Saath hi, Quadria silsila ki teachings ko har jagah phelaya jaye aur unki 
 marifat logon tak pahunchaya jaye, 
taaki zindagi mein ek naya rang aur sudhar aaye. Is website ko banane ka ek hi maqsad hai ki Allah ka qurb hasil ho jaye aur
hum apne buzrugo ke raste par yani sirate mustaqeem par aa jaye. Inshallah Taala miya huzoor aur hamarey silsile ke tamam buzrogo ki
barkat se iska faizaan mashriq wo magrib me phel jaye. Inshallah is website me apko miya huzoor se mutaaliq jo khusoosan India se related hai
uski malumat mil jayegi . Is website me tarbiyat courses , appointment , miya huzoor ki zindagi ke haalat , events , products aur mazeed bahot si 
activities available hai . Is website ko Khalifa Miya huzoor Salim Tariqi maintain karte hai . Aur koi bhi payment bina Salim Ashrafi ki
ijazat ke bagair na karey aur unse personally phone karke hi transaction karey . Unka contact number hai 9576800000 `

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
const SampleDrawer1 = ({app}) => {
  const urduNumbers = {
    1: '١',
    2: '٢',
    3: '٣',
    4: '٤',
    5: '٥',
    6: '٦',
    7: '٧',
    8: '٨',
    9: '٩',
    10: '١٠',
    11: '١١',
    12: '١٢',
    13: '١٣',
    14: '١٤',
    15: '١٥',
    16: '١٦',
    17: '١٧',
    18: '١٨',
    19: '١٩',
    20: '٢٠',
    21: '٢١',
    22: '٢٢',
    23: '٢٣',
    24: '٢٤',
    25: '٢٥',
    26: '٢٦',
    27: '٢٧',
    28: '٢٨',
    29: '٢٩',
    30: '٣٠',
    31: '٣١',
    32: '٣٢',
    33: '٣٣',
    34: '٣٤',
    35: '٣٥',
    36: '٣٦',
    37: '٣٧',
    38: '٣٨',
    39: '٣٩',
    40: '٤٠',
    41: '٤١',
    42: '٤٢',
    43: '٤٣',
    44: '٤٤',
    45: '٤٥',
    46: '٤٦',
    47: '٤٧',
    48: '٤٨',
    49: '٤٩',
    50: '٥٠',
    51: '٥١',
    52: '٥٢',
    53: '٥٣',
    54: '٥٤',
    55: '٥٥',
    56: '٥٦',
    57: '٥٧',
    58: '٥٨',
    59: '٥٩',
    60: '٦٠',
    61: '٦١',
    62: '٦٢',
    63: '٦٣',
    64: '٦٤',
    65: '٦٥',
    66: '٦٦',
    67: '٦٧',
    68: '٦٨',
    69: '٦٩',
    70: '٧٠',
    71: '٧١',
    72: '٧٢',
    73: '٧٣',
    74: '٧٤',
    75: '٧٥',
    76: '٧٦',
    77: '٧٧',
    78: '٧٨',
    79: '٧٩',
    80: '٨٠',
    81: '٨١',
    82: '٨٢',
    83: '٨٣',
    84: '٨٤',
    85: '٨٥',
    86: '٨٦',
    87: '٨٧',
    88: '٨٨',
    89: '٨٩',
    90: '٩٠',
    91: '٩١',
    92: '٩٢',
    93: '٩٣',
    94: '٩٤',
    95: '٩٥',
    96: '٩٦',
    97: '٩٧',
    98: '٩٨',
  }
  
  ;  
  const [accordionData]= React.useState({
     Namaz : {
      Level1:[{
        question:"Namaz ki shartey kitni hai?",
        Urdu:"نماز کی شرائط کتنی ہیں؟",
        urduAnswer:`نماز کی ٦ شرائط ہیں۔ \n١) طہارت (بدن، کپڑے اور جگہ کا پاک ہونا) \n٢) سترِ عورت یعنی مرد کو ناف سے گھٹنوں تک چھپانا \n٣) قبلہ کی طرف منہ کرنا \n٤) وقت \n٥) نیت \n٦) تکبیر تحریمہ
        `,
        answer:`Namaz ki 6 shartey hai.\n1)Taharat(Badan,Kapdey aur jagah ka paak hona)\n2)Sitr e aurat yani mard ko naaf se ghutno tak chupana \n3)Qibla ki taraf muh karna \n4)Waqt \n5)Niyyat
        \n6)Takbeer e Tehreema`
      },
      {
        question:"Namaz me kitni cheeze Farz hai?",
        Urdu:`نماز میں کِتنی چیزیں فرض ہیں؟`,
        urduAnswer:`نماز میں ٦ چیزیں فرض ہیں: \n١) قیام \n٢) قراءت \n٣) رکوع \n٤) سجدہ \n٥) قعدہ آخرہ \n٦) خروج
        `,
        answer:"Namaz me 6 cheeze farz hai. \n 1)Qayam \n 2)Qiraat \n 3)ruku \n4)Sajda\n5)Qayda Aakhira\n6)Khurroj"
      },{
        question:"Namaz me Kitne Wajibat hai?",
        Urdu:"نماز میں کتنی واجبات ہیں؟",
        urduAnswer:`نماز میں ١٤ واجبات ہیں \n١) تکبیر تحریمہ میں اللہ اکبر کہنا \n٢) الحمد شریف پڑھنا \n٣) فرض کی پہلی ٢ رکعتوں میں اور (سنت، نفل اور وتر) کی ہر رکعت میں الحمد شریف کے ساتھ دوسری سورت بھی پڑھنا \n٤) فرض نماز کی پہلی ٢ رکعتوں میں قراءت کے بعد متسلسل رکوع کرنا \n٥) سجدہ میں دونوں پاؤں کی ٣-٣ انگلیوں کا پیٹ زمین سے لگانا \n٦) دونوں سجدوں کے درمیان کوئی رکن فاصل نہ ہونا \n٧) تدلیل ارکان \n٨) قیامہ یعنی رکوع سے سیدھا کھڑا ہونا \n٩) جلسہ یعنی دونوں سجدوں کے درمیان سیدھا بیٹھنا \n١٠) قعدہ اولہ میں تشہد کے دوران کچھ نہ پڑھنا \n١١) ہر قعدے میں پورا تشہد پڑھنا \n١٢) لفظ سلام دو بار کہنا \n١٣) وتر میں دعا خنوت پڑھنا \n١٤) رکوع کا ہر رکعت میں ایک بار ہونا اور سجدوں کا دو ہی بار ہونا۔`,
        answer:`Namaz me 14 wajib hai \n1)Takbeer e Tehreema me Allahu Akbar Kehna \n2)Alhand Shareef Padhna \n3)Farz ki pehli 2 rakato me aur (sunnat,nafl aur witr) ki har rakaat me Alhamd Shareef ke Saath dusri surat bhi padhna \n
        4)Farz namaz ki pehli 2 rakato me qirat ke baad mutasalan ruku karna \n5) Sajda me dono pao ki 3-3 ungliyo ka pait zameen se lagana \n 6)Dono sajdo ke darmiyan koi rukun fasil na hona\n7)
        7)Taddel e arkan \n8)Qauma yani ruku se seedha khada hona \n9)jalsa yani dono sajdo ke darmiyan seedha baithna \n10) Qayda oola me tashahud ke dauran kuch na padhna \n 11)har qaida me pura tashahud padhna \n
        12)Lafz salam 2 baar kehna \n 13)Witr me dua e khunoot padha \n 14)Ruku ka har rakat me ek hi bar hona aur sajdo ka 2 hi bar hona `
      },
      {
        question:"Agar surah fatiha ke baad surah padhan bhul jaye to kya karey?",
        Urdu:"اگر سورۃ فاتحہ کے بعد سورۃ پڑھنے بھول جائے تو کیا کریں؟",
        urduAnswer:"اگر رکوع میں یاد آئے تو کھڑا ہو جائے اور سورۃ ملائے، پھر رکوع کرے اور آخر میں سجدہ سہو کرے۔",
        answer:"Agar ruku me yaad aaye to khada ho jaye aur surat milaye phir ruku karey aur aakhir me sajda sahu karey"
      },{
        question:"Jamat farz hai ya wajib?",
        Urdu:"جماعت فرض ہے یا واجب؟",
        urduAnswer:"جماعت واجب ہے۔",
        answer:"Jamat wajib hai"
      },
      {
        question:"Imamat ka sab se zyada haqdar kaun hai?",
        Urdu:"امامت کا سب سے زیادہ حقدار کون ہے؟",
        urduAnswer:"امامت کا سب سے زیادہ حقدار وہ ہے جو نماز اور طہارت کے احکام سب سے زیادہ جانتا ہو۔ وہ شخص جو تجوید کا علم زیادہ جانتا ہو۔ پھر جو سب سے زیادہ متقی ہو۔",
        answer:"Imamat ka sabse zyada haqdar wo hai jo namaz aur taharat ke ahkam sabse zyada janta ho . wo shaqs jo tajweed ka ilm zyada janta ho. phir jo sab se zyada mutaqqi ho."
      },{
        question:"Jis Shaqs ko dua e khunoot yaad na ho wo kya karey?",
        Urdu:"جس شخص کو دعائے خنوت یاد نہ ہو وہ کیا کرے؟",
        urduAnswer:"رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
        answer:"Rabbana Aatina fid dunya hasanatau wa fil aaqirati hasanatau waqina azaban naar"
      },
      {
        question:"Agar dua e qunoot na padhe to kya hukm hai?",
        Urdu:"اگر دعائے قنوت نہ پڑھی جائے تو اس کا حکم ہوگا کہ نماز درست ہوگی۔",
        urduAnswer:"اگر جان بوجھ کر نہ پڑھے تو وتر دوبارہ پڑھے اور بھول جائے تو سجدہ سہو کرے۔",
        answer:"Agar jaan bugh kar na padhe to witr dobara padhe aur bhool jaye to sajda sahu karey"
      },{
        question:"Din aur rat me kul kitni namazey farz hai?",
        Urdu:"دن اور رات میں کُل کتنی نمازیں فرض ہیں؟",
        urduAnswer:"دن وو رات میں کل پانچ نمازیں فرض ہیں۔\n١) فجر\n٢) ظہر\n٣) عصر\n٤) مغرب\n٥) عشاء۔",
        answer:"Din wo raat me kul paanch namazey farz hai . \n1)fajr\n2)zuhr\n3)asr\n4)magrib\n5)isha"
      },{
        question:"Din aur rat me kul kitni namazey farz hai?",
        Urdu:"دن اور رات میں کُل کتنی نمازیں فرض ہیں؟",
        urduAnswer:"دن وو رات میں کل پانچ نمازیں فرض ہیں۔\n١) فجر\n٢) ظہر\n٣) عصر\n٤) مغرب\n٥) عشاء۔",
        answer:"Din wo raat me kul paanch namazey farz hai . \n1)fajr\n2)zuhr\n3)asr\n4)magrib\n5)isha"
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
  const [start,setStart] = React.useState(1);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const [index,setIndex] = React.useState(-1);
  const [currentLayout,setCurrentLayout] = useState(<WelcomeScreen  welcomeContent={welcomeContent}/>)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElTwo, setAnchorElTwo] = useState(null);
  const toggleDrawer = (open,list) => (event) => {
   if(list===1){
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
  const db = getFirestore(app);

// Get a list of cities from your database
async function getCities(db) {
  const citiesCol = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}
useEffect(()=>{getCities(db)},[]);
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
  const [language,setLanguage] = React.useState(true);
  const [appbarText, setAppbarText] = React.useState(language?'Welcome':'تعارف')
  const [level,setLevel] = React.useState('Level1');
  const [level1,setLevel1] = React.useState('Roman');
  const [topicIndex,setTopicIndex] = useState(-1);

  useEffect(()=>{
   getAppBarText(value);
  },[language]);
  
  const handleClose1 = (value1) => {
  
  if(value1==='Urdu'){
    if(language){
      setOpenDrawer(false);
      setPage(0);
      setIndex(-1);
    }
    setLanguage(false);
  }else{
  if(!language){
  setOpenDrawer(false);
  setPage(0);
  setIndex(-1);
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
  const [listData, setListData] = React.useState(
    
     {
      "miyahuzzor": [
    {
      title: 'Shijra Shareef',
      urduTitle:"Shijra Shareef",
      background: BACKGROUND_NULL,
      
    },
    {
      title: 'Mamulat',
      urduTitle:"Mamulat",
      background: BACKGROUND_NULL
    },
    {
      title: 'Haalat e Zindagi',
      urduTitle:"Haalat e Zindagi",
      background: BACKGROUND_NULL
    },
    {
      title: 'Riyazaat',
      urduTitle:"Riyazaat",
      background: BACKGROUND_NULL
    },
    {
      title: 'Goal',
      urduTitle:"Goal",
      background: BACKGROUND_NULL
    },
   
  // {
  //   title: 'Qaza Namaz',
  //   urduTitle:"Qaza Namaz",
  //   background: BACKGROUND_NULL
  // },
  ],
"others":[ {
  title: 'Courses',
  urduTitle:"Courses",
  background: BACKGROUND_NULL,
  icon:<MenuBookIcon />
},
{
  title: 'Products',
  urduTitle:"Products",
  background: BACKGROUND_NULL,
  icon:<HomeRepairServiceIcon />
},
{
  title: 'Events',
  urduTitle:"Events",
  background: BACKGROUND_NULL, 
  icon:<EventIcon />

},
{
  title: 'Appointment',
  urduTitle:"Appointment",
  background: BACKGROUND_NULL,
  icon:<EventAvailableIcon />

},
{
  title: 'Student Portal',
  urduTitle:"Student Portal",
  background: BACKGROUND_NULL,
  icon:<GroupIcon />

},
{
  title: 'Whatsapp',
  urduTitle:"Whatsapp",
  background: BACKGROUND_NULL,
  icon:<WhatsAppIcon />

}] })
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const getLayout = (value,parentIndex,title) => {
    setTopicIndex(title);
    let obj ={...listData};
    let keys = Object.keys(obj);
    keys.forEach(e=>{
      if(e==parentIndex){
        let oldArray = [...listData[parentIndex]]
        oldArray = oldArray.map((e, i) => {
          if (i == value) {
            e.background = BACKGROUND_SELECTED
          } else {
            e.background = BACKGROUND_NULL
          }
          return e
    
        }
        )
        obj[e]=oldArray;
      }else{
        
        let oldArray = [...listData[e]]
        oldArray = oldArray.map((e, i) => {
            e.background = BACKGROUND_NULL;
          return e
    
        }
        )
        obj[e]=oldArray;
      }
    })
    setListData(obj)
    setAppbarText(title);
    switch(title){
      case 'Shijra Shareef':setCurrentLayout(<ExampleTree />) ;break;
      case 'Student Portal':setCurrentLayout(<StudentPortal />);break;
    }
   
  }
  const getAppBarText =(value)=>{
    switch (value) {
      case 0: setAppbarText(language?'Namaz':'نماز'); break;
      case 1: setAppbarText(language?'Roza':"روزہ"); ; break;
      case 2: setAppbarText(language?'Hujj':"حج" ); ; break;
      case 3: setAppbarText(language?'Zakat':"زکات"); ; break;
      default :  setAppbarText(language?'Welcome':'تعارف');
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
  const getLabelText =(from,to,count)=>{
    setStart(from);
    if(from!==to){
      return `Q${from}) to Q${to}) of ${count}`
    }else{
      return `last of ${count}`
    }
  }

  const getLabelTextUrdu =(from,to,count)=>{
    if(language){
      getLabelTextUrdu(from,to,count);
      
    }else{
    setStart(from);
    if(from!==to){
      return `${urduNumbers[to]})-${urduNumbers[from]}) میں سے ${urduNumbers[count]}کل`
    }else{
      let ans =` میں سے ${urduNumbers[count]}کل`
      return ans+ `آخری سوال`;
    }
  }
  };
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
    <div  style={{fontFamily:language?'Montserrat, sans-serif' :'Arabic',padding:'0px'}}>
      <AppBar position="fixed" sx={{'.MuiToolbar-root':{paddingLeft:language?'10px':'0px',paddingRight:language?'0px':'0px'}}} style={{background:"#000000",color:"#ffffff",justifyContent:'space-between'}} open={open}>
        <Toolbar sx={{'.MuiIconButton-root':{marginRight:language?'16px':'0px'}}} style={{ display:'flex',flexDirection:language?'row':'row-reverse'}} >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
            edge="start"
            sx={{ mr: 0, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Badge
      color="secondary"
      overlap="circular"
      style={{marginLeft:'-20px'}}
      sx={{
         
        '.MuiBadge-dot': {
          backgroundColor: 'red',
        },
      }}
    >
      <StyledAvatar alt="Profile Picture" src={logo} />
    </Badge>
          <Typography variant="h6" style={{width:'250px',fontWeight:'600'}} noWrap component="div">
            {appbarText}
          </Typography>
          
        </Toolbar>
      </AppBar>
      <Drawer anchor={language?"left":"right"} sx={{
          width: '70vw',  
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: '70vw',  // Must match the width defined above
            boxSizing: 'border-box',
          },
        }} open={openDrawer} onClose={toggleDrawer(false)}>
        <div>
         
          
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
              {language?'Miya huzoor':'اعمال'}
            </Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: '0px 0px 0px 0px' }}>
            <List sx={{ padding: '0px 0px 0px 0px',marginTop:'0px',flexDirection:'row-reverse' }}>
              {listData['miyahuzzor'].map((text, index) => (
                <ListItem 
                sx={{  background: text.background, color: text.background == BACKGROUND_NULL ? 'black' : 'white',fontSize:'12px',fontWeight:'100' }} 
                key={text+','+index} 
                disablePadding>
                  <ListItemButton onClick={() => {setOpenDrawer(false); setValue(index); getLayout(index,'miyahuzzor',text.title);  }}>
                    
                    <ListItemText sx={{marginLeft:'10px',fontSize:'12px',fontWeight:'100',textAlign:language?'left':'right'}} primary={language?text.title:text.urduTitle} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
        <Divider style={{background:'#000000'}}/>
        <List sx={{ padding: '0px 0px 0px 0px',marginTop:'0px',flexDirection:'row-reverse' }}>
              {listData['others'].map((text, index) => (
                <>
                <ListItem 
                sx={{  background: text.background, color: text.background == BACKGROUND_NULL ? 'black' : 'white',fontSize:'12px',fontWeight:'100' }} 
                key={text+','+index} 
                disablePadding>
                  <ListItemButton onClick={() => {setOpenDrawer(false); setValue(index); getLayout(index,'others',text.title);  }}>
                  <ListItemIcon sx={{  background: text.background, color: text.background == BACKGROUND_NULL ? 'black' : 'white',fontSize:'12px',fontWeight:'100' }} >
                     {text.icon}
                    </ListItemIcon>
                    <ListItemText sx={{marginLeft:'5px',fontSize:'12px',fontWeight:'bold',textAlign:language?'left':'right'}} primary={language?text.title:text.urduTitle} />
                   
                  </ListItemButton>

                </ListItem>
                 {index !=listData['others'].length-1 && <Divider/>}
                 </>
              ))}
            </List>
        </div>
      </Drawer>
      <Main id='main-class' style={{padding:'0px',margin:'0px'}} open={open}>
        <DrawerHeader />
        {( appbarText!=='Welcome' && appbarText!=='تعارف')&&
        accordionData?.[getTopicName(value)]?.[level].length>8
        
              }
        {
        //  ( appbarText!=='Intro' && appbarText!=='تعارف' && appbarText != 'Qaza Namaz' )
        //  ?
        //  <> 
         
        //  <SampleAccordion urduNumbers={urduNumbers} start={start} index={index} setIndex={setIndex} topicIndex={topicIndex} accordionData={accordionData?.[getTopicName(value)]?.[level].slice(8*page,8*page+8) || []} language={language} /></>
        //  :
        //  appbarText !== 'Qaza Namaz' ? (<Typography style={{textAlign:language?'left':'right',fontWeight:'600',padding:'0px'}}>
        //   {language?'Ye Website banane ka maqsad sunni musalmano ko unke akhaid aur aamal me maloomat faraham karna hai. Alhamdulilah ye website evolve hoti rahegi':'یہ ویب سائٹ بنانے کا مقصد سنی مسلمانوں کو ان کے عقائد اور اعمال میں معلومات فراہم کرنا ہے۔ الحمدُ للہ، یہ ویب سائٹ مستقبل میں بھی ترقی کرتی رہے گی۔'}
        //   </Typography>
        //   ):
        //   <QazaNamaz />
        currentLayout
        }

      </Main>
    </div>
  );
};

export default SampleDrawer1;
