import React, { useEffect, useState } from 'react'
import { EditOrDeleteEvent, NoDataWidget } from './Event';
import { collection, db, getDocs } from '../firebaseConfig';
import { Box, CircularProgress } from '@mui/material';

const DisplayEvents = () => {
  const[loading,setLoading]=useState(false);  
  const [events,setEvents]=useState([]);
  useEffect(()=>{
   fetchEvents();
  },[])  
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const eventsCollection = collection(db, "events"); // "events" collection reference
      const eventsSnapshot = await getDocs(eventsCollection); // Saara data fetch karo
      const eventsList = eventsSnapshot.docs.map((doc) => ({
        id: doc.id, // Document ID
        ...doc.data(), // Document ka data
      }));
      setEvents(eventsList); // State mein save karo
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div style={{ padding: "20px" }}>
       { loading ? (
    <Box
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
              zIndex: 1200,
            }}
          >
            <CircularProgress />
          </Box>
  ):
  (
  Boolean(events?.length)?<EditOrDeleteEvent  eventData={events} showEditDelete={false} />:<NoDataWidget />)
  }
    </div>
  )
}

export default DisplayEvents
