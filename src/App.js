// @ts-nocheck
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SampleDrawer1 from './SampleDrawer1';
// @ts-ignore
import FirebaseAuth from './firebaseAuth';
import React, { useEffect, useState } from 'react';
import 'firebaseui/dist/firebaseui.css';
import { app } from './firebaseConfig';
import SignIn from './signIn';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import SignOut from './SignOut';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: '#FFFFFF'
    }
  },
});
function App() {
  const [user, setUser] = useState(null);
  useEffect( ()=>{
   console.log(user)
  },user)
  useEffect(() => {
    // Set up an observer on the Auth object to listen for changes in the user's sign-in state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // @ts-ignore
      setUser(user); // Update the user state with the current user or null if not signed in
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);
  return (
    <div className="App">
       {!user ? <SignIn />:<SignOut />}
      <ThemeProvider theme={theme}>
         <SampleDrawer1 app={app} /> 
        
      
      </ThemeProvider>
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />    </div>
  );
}

export default App;
