import Accordion from '@mui/material/Accordion';
import * as React from 'react'
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function SampleAccordion({urduNumbers,start,language,accordionData,index,setIndex}) {
  const [expanded, setExpanded] = React.useState(index);
  const [elements, setElements] = React.useState([false]);
  console.log(index);
  const handleChange = (panel) => (event, isExpanded) => {
    if(panel===index){
      setExpanded(-1);
      setIndex(-1);
    }else{
    setExpanded(panel);
    setIndex(panel);
    }
    let newElements = [...elements]
    newElements[panel] = !newElements[panel]
    setElements(newElements)
  };
 
  const AccordionStyle = {
    '&:before': {
      backgroundColor: 'transparent !important',
    },
  };
  const getQuestionLabel =(question,index)=>{
    console.log(question,index);
    if(language){
      return `Q${start+index}) ${question}`
    }else{
      let ans=question
      return ans
    }
  };
  return (
    <div style={{ display: 'flex', flexDirection:'column', rowGap: '5px' }}>
      {
        accordionData?.map((element, i) => {
          return (
            <Accordion  key={element+','+i} elevation={0} disableGutters  sx={{
              '&:before': {
                  display: 'none',
              }
          }} expanded={i===index} onChange={handleChange(i)}>
              <AccordionSummary
               sx={{flexDirection:!language?'row-reverse':'row'}}
                expandIcon={i===index ? <RemoveIcon sx={{color:'#000000'}} /> : <AddIcon sx={{color:'#000000'}}/>}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                // style={{paddingLeft:'0px',marginLeft:'0px',display:'flex',flexDirection:'row', justifyContent:'flex-start'}}
              >
                <Typography sx={{width:'100%',textAlign:!language?'right':'left', paddingLeft:'0px',fontWeight:'900',fontSize:language?'14px':'14px' }}>
               { language? getQuestionLabel(element?.question,i):getQuestionLabel(element?.Urdu,i)}
               
                </Typography>
                {!language&&<><span>({urduNumbers[i+start]} </span><span style={{fontSize:'12px'}}>س</span></>}
                {/* <Typography sx={{ color: 'text.secondary' }}>I am an accordion Really</Typography> */}
              </AccordionSummary>
              <AccordionDetails sx={{textAlign:!language?'right':'left',padding:'0px', paddingLeft:'10px'}}>
                <Typography sx={{marginLeft:'5px',padding:'5px',paddingTop:'0px',fontSize:language?'12px':'12px',fontWeight:'400',fontFamily:language?'Manrope':'Arabic'}}>
                {/* {language?element?.answer.split('\n').map(e=><div key={e}>{e}</div>):element?.urduAnswer.split('\n').map(e=><div key={e}>{e}</div>)} */}
                {language? element?.answer.split('\n').map(e=><div style={{fontWeight:'550',fontFamily:'Manrope !important'}} key={e}>{e}</div>) :element?.urduAnswer.split('\n').map(e=><div style={{font:'20px',fontWeight:'550'}} key={e}>{e}</div>)}
                </Typography>
              </AccordionDetails>
            </Accordion>
          )
        })
      }
     

    </div>
  );
}