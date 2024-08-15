import React, { useEffect, useState } from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore/lite';
import { db } from '../firebaseConfig';

import SignOut from '../SignOut';
import SignIn from '../signIn';
import { Box, CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';
import Admin from './Admin';
export default function StudentPortal() {
    const [user, setUser] = useState(null);
    const [loading,setLoading] = React.useState(false);
    const [userStatus,setUserStatus] = useState({
      admin:{
          email:null
      },
      student:{
          email:null
      }
  })
    useEffect(() => {
        setLoading(true);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setUser(user); 
          checkDocumentExists(user?.email)
          
        });
        
        return () => unsubscribe();
      }, []);
      async function checkDocumentExists(userId) {
        
      
        try {
          let docRef = doc(db, 'admin', userId);

          const docSnap = await getDoc(docRef);
      
          if (docSnap.exists()) {
             setUserStatus((prev)=>({...prev,admin:{email:userId}}))
          } else {
          let docRef1 = doc(db,'student',userId);
           const docSnap = await getDoc(docRef1);
           
           if(docSnap.exists()){
            setUserStatus((prev)=>({...prev,student:{email:userId}}))
           }else{
            toast.error(`${userId} is not registered as a student, please contact Salim Ashrafi @9576800000`)

           }
           
          }
        } catch (error) {
          console.error('Error checking document:', error);
        } finally{
            setLoading(false);
        }
      }
  return (
    <>
    {loading ? <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
        zIndex: 1300, 
      }}
    >
      <CircularProgress />
    </Box>
    :
    <div style={{padding:'5px'}}>
    <div style={{width:'100%',marginBottom:'10px'}}>{!user ? <SignIn />:<SignOut  user={user}/>}</div>
    {userStatus?.admin?.email && <Admin userId ={userStatus?.admin?.email} />}
    </div>
    }
    </>
  );
}

