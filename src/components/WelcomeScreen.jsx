import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
const WelcomeScreen =({welcomeContent})=> {
 
    
  return (
    <div style={{padding:'10px'}}>
   <Typography variant="h6" component="h2">
  {welcomeContent}
</Typography>
    </div>
  );
}
export default WelcomeScreen;

