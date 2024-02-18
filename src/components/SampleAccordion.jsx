import Accordion from '@mui/material/Accordion';
import * as React from 'react'
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function SampleAccordion() {
  const [expanded, setExpanded] = React.useState(false);
  const [elements, setElements] = React.useState([false])
  const handleChange = (panel) => (event, isExpanded) => {
    console.log("kkkk",panel,isExpanded)
    setExpanded(isExpanded ? panel : false);
    let newElements = [...elements]
    newElements[panel] = !newElements[panel]
    setElements(newElements)
  };
  const AccordionStyle = {
    '&:before': {
      backgroundColor: 'transparent !important',
    },
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: '10px' }}>
      {
        elements.map((element, i) => {
          return (
            <Accordion elevation={0} disableGutters  sx={{
              '&:before': {
                  display: 'none',
              }
          }} expanded={elements[i]} onChange={handleChange(i)}>
              <AccordionSummary
                expandIcon={elements[i] ? <RemoveIcon /> : <AddIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                // style={{paddingLeft:'0px',marginLeft:'0px',display:'flex',flexDirection:'row', justifyContent:'flex-start'}}
              >
                <Typography sx={{ width: '100%',marginLeft:'-20px',paddingLeft:'0px' }}>
                  Namaz me Kitne Farz Hai?
                </Typography>
                {/* <Typography sx={{ color: 'text.secondary' }}>I am an accordion Really</Typography> */}
              </AccordionSummary>
              <AccordionDetails sx={{paddingLeft:'0px'}}>
                <Typography sx={{marginLeft:'0px',paddingLeft:'0px'}}>
                 Namaz me 4 farz hai . muh dhona,haath dhona,masah karna aur pair dhona
                </Typography>
              </AccordionDetails>
            </Accordion>
          )
        })
      }
     

    </div>
  );
}