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
import Pagination from '@mui/material/Pagination';

import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TablePagination from '@mui/material/TablePagination';

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
  const urduNumbers  = {
    1: '۱',
    2: '۲',
    3: '۳',
    4: '۴',
    5: '۵',
    6: '۶',
    7: '۷',
    8: '۸',
    9: '۹',
    10: '۱۰',
    11: '۱۱',
    12: '۱۲',
    13: '۱۳',
    14: '۱۴',
    15: '۱۵',
    16: '۱۶',
    17: '۱۷',
    18: '۱۸',
    19: '۱۹',
    20: '۲۰',
    21: '۲۱',
    22: '۲۲',
    23: '۲۳',
    24: '۲۴',
    25: '۲۵',
    26: '۲۶',
    27: '۲۷',
    28: '۲۸',
    29: '۲۹',
    30: '۳۰',
    31: '۳۱',
    32: '۳۲',
    33: '۳۳',
    34: '۳۴',
    35: '۳۵',
    36: '۳۶',
    37: '۳۷',
    38: '۳۸',
    39: '۳۹',
    40: '۴۰',
    41: '۴۱',
    42: '۴۲',
    43: '۴۳',
    44: '۴۴',
    45: '۴۵',
    46: '۴۶',
    47: '۴۷',
    48: '۴۸',
    49: '۴۹',
    50: '۵۰',
    51: '۵۱',
    52: '۵۲',
    53: '۵۳',
    54: '۵۴',
    55: '۵۵',
    56: '۵۶',
    57: '۵۷',
    58: '۵۸',
    59: '۵۹',
    60: '۶۰',
    61: '۶۱',
    62: '۶۲',
    63: '۶۳',
    64: '۶۴',
    65: '۶۵',
    66: '۶۶',
    67: '۶۷',
    68: '۶۸',
    69: '۶۹',
    70: '۷۰',
    71: '۷۱',
    72: '۷۲',
    73: '۷۳',
    74: '۷۴',
    75: '۷۵',
    76: '۷۶',
    77: '۷۷',
    78: '۷۸',
    79: '۷۹',
    80: '۸۰',
    81: '۸۱',
    82: '۸۲',
    83: '۸۳',
    84: '۸۴',
    85: '۸۵',
    86: '۸۶',
    87: '۸۷',
    88: '۸۸',
    89: '۸۹',
    90: '۹۰',
    91: '۹۱',
    92: '۹۲',
    93: '۹۳',
    94: '۹۴',
    95: '۹۵',
    96: '۹۶',
    97: '۹۷',
    98: '۹۸',
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
  const [appbarText, setAppbarText] = React.useState(language?'Intro':'تعارف')
  const [level,setLevel] = React.useState('Level1');
  const [level1,setLevel1] = React.useState('Roman');
  

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
    switch (value) {
      case 0: setAppbarText(language?'Namaz':'نماز'); break;
      case 1: setAppbarText(language?'Roza':"روزہ"); ; break;
      case 2: setAppbarText(language?'Hujj':"حج" ); ; break;
      case 3: setAppbarText(language?'Zakat':"زکات"); ; break;
      default :  setAppbarText(language?'Intro':'تعارف');
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
      return `last Question of ${count}`
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
    <div  style={{fontFamily:language?'Geist':'Arabic'}}>
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
          <Typography variant="h6" style={{width:'120px',fontWeight:'600'}} noWrap component="div">
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
        <MenuItem onClick={()=>{handleClose1('Urdu');;handleMenuClose()}}>Urdu</MenuItem>
          </Menu>
      
      </div>
          
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
                <ListItem 
                sx={{  background: text.background, color: text.background == BACKGROUND_NULL ? 'black' : 'white',fontSize:'12px',fontWeight:'100' }} 
                key={text+','+index} 
                disablePadding>
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
        {( appbarText!=='Intro' && appbarText!=='تعارف')&&
        accordionData?.[getTopicName(value)]?.[level].length>8&&
        <TablePagination
        component="div"
        count={Math.round(accordionData?.[getTopicName(value)]?.[level].length)}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{'.MuiTablePagination-selectLabel':{marginRight:'-30px'},'.MuiTablePagination-selectIcon, .MuiTablePagination-select':{display:'none',marginRight:'0px'}}}
        labelRowsPerPage='Showing'
        labelDisplayedRows={({from,to,count})=>getLabelText(from,to,count)}
      />
              }
        {
         ( appbarText!=='Intro' && appbarText!=='تعارف')? <SampleAccordion urduNumbers={urduNumbers} start={start} index={index} setIndex={setIndex} accordionData={accordionData?.[getTopicName(value)]?.[level].slice(8*page,8*page+8) || []} language={language} />:
        <Typography style={{textAlign:language?'left':'right',fontWeight:'600'}}>{language?'Ye Website banane ka maqsad sunni musalmano ko unke aqaid aur aamal me maloomat faraham karna hai. Alhamdulilah ye website evolve hoti rahegi':'یہ ویب سائٹ بنانے کا مقصد سنی مسلمانوں کو ان کے عقائد اور اعمال میں معلومات فراہم کرنا ہے۔ الحمدُ للہ، یہ ویب سائٹ مستقبل میں بھی ترقی کرتی رہے گی۔'}</Typography>
        }

      </Main>
    </div>
  );
};

export default SampleDrawer1;
