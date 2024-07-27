// src/SignIn.js

import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from './firebaseConfig';
import { Button } from '@mui/material';

function SignIn() {
  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // The signed-in user info
      const user = result.user;
      console.log('User:', user);
      // You can handle additional actions here, like redirecting or saving user info
    } catch (error) {
      console.error('Error during sign-in:', error);
      // Handle Errors here.
    }
  };

  return (
    <div style={{width:'100%',textAlign:'end',marginTop:'10px'}}>
      <Button style={{textTransform:'none'}} variant='contained'  onClick={handleSignIn}>Sign in with Google</Button>
    </div>
  );
}

export default SignIn;
