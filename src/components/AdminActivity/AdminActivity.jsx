import React from "react";
import "./AdminActivity.css"
import { Autocomplete } from "@mui/material";
import { addDoc, collection } from "firebase/firestore"; 
import { db } from "../../firebase";
export const AdminActivity = () => {
    const [notesObj,setNotesObj] = React.useState({
        sem:['1-1','1-2','2-1','2-2','3-1','3-2','4-1','4-2'],
        subject : '',
        topicName:'',
        notesURL:'',
        videoURL:''
    })
    React.useEffect(()=>{
        const dbCall=async()=>{
            try {
                const docRef = await addDoc(collection(db, "users1"), {
                  first: "Alan",
                  middle: "Mathison",
                  last: "Turing",
                  born: 1912
                });
              
                console.log("Document written with ID: ", docRef.id);
              } catch (e) {
                console.error("Error adding document: ", e);
              }
        }
        dbCall()
       
    },[])
    return (
        <div className="parent-container">
            {/* <Autocomplete
                disablePortal
                id="combo-box-demo"
                onChange={(e) => { setLabel(e.target.innerText); setOpen(true) }}
                options={top100Films}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Movie" />}
            /> */}
        </div>
    )
}