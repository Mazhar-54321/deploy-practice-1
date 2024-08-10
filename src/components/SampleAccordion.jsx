import Accordion from '@mui/material/Accordion';
import * as React from 'react'
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ExampleTree from './ExampleTree';

export default function SampleAccordion({urduNumbers,start,language,accordionData,index,setIndex,topicIndex}) {
  const [expanded, setExpanded] = React.useState(index);
  const [elements, setElements] = React.useState([false]);
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
 console.log(index,'indexindex');
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
       topicIndex == 'Shijra Shareef' ? <ExampleTree  />:<>Under Maintenance</>
      }
     

    </div>
  );
}