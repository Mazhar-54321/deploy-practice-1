// src/SignIn.js

import React, { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from './firebaseConfig';
import { Box, Button, CircularProgress } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

function SignIn() {
  const [loader,setLoader] = useState(false);
  const handleSignIn = async () => {
    setLoader(true);
    try {
      
      const result = await signInWithPopup(auth, googleProvider);
    } catch (error) {
      setLoader(false);
    }
    finally{
      setLoader(false);
    }
  };

  return (
    <div className='ali' style={{width:'100%',textAlign:'end',marginTop:'10px'}}>
      {loader ? <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: to create an overlay effect
        zIndex: 1300, // Higher than other components
      }}
    >
      <CircularProgress />
    </Box>
      :<Button startIcon={<GoogleIcon />} style={{textTransform:'none'}} variant='outlined'  onClick={handleSignIn}>Sign in with Google</Button>
    }
    </div>
  );
}

export default SignIn;
