import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/system';

const StartExpandMoreIcon = styled(ExpandMoreIcon)({
  marginRight: '18px', // Adjust spacing between icon and text

});

const CustomAccordion = () => {
  return (
    <Accordion>
      <AccordionSummary
      sx={{flexDirection:'row-reverse'}}
        expandIcon={<StartExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Accordion Title</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>Accordion Details</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default CustomAccordion;
