// src/FirebaseAuth.js

import React, { useEffect } from 'react';
import * as firebaseui from 'firebaseui';
import { getAuth, EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { auth } from './firebaseConfig';

function FirebaseAuth() {
  useEffect(() => {
    // FirebaseUI configuration
    const uiConfig = {
      signInSuccessUrl: '/', // Redirect URL after sign-in
      signInOptions: [
        EmailAuthProvider.PROVIDER_ID,
        GoogleAuthProvider.PROVIDER_ID,
        // Add other providers here (e.g., Facebook)
      ],
      // Other UI configuration options
    };

    // Initialize the FirebaseUI Widget
    const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
    
    // Start the FirebaseUI Widget
    console.log('FirebaseUI Instance:', ui);
  console.log('UI Configuration:', uiConfig);
    ui.start('#firebaseui-auth-container', uiConfig);
    
    // Cleanup FirebaseUI instance on component unmount
    return () => ui.delete();
  }, []);

  return <div id="firebaseui-auth-container">Hi</div>;
}

export default FirebaseAuth;
