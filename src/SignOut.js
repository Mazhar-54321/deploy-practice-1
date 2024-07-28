// src/SignOut.js

import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { Button, Typography } from '@mui/material';

function SignOut({user}) {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div style={{display:'flex',width:'100%',marginTop:'10px', justifyContent:'space-between'}}>
      <Typography>Welcome {user?.displayName}</Typography>
      <Button style={{textTransform:'none'}} variant='contained' onClick={handleSignOut}>Sign Out</Button>
    </div>
  );
}

export default SignOut;
