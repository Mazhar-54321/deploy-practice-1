import React from "react";
import "./AddSubjects.css"
import { Alert, Autocomplete, Backdrop, Button, CircularProgress, Snackbar, TextField } from "@mui/material";
import { addDoc, collection,setDoc } from "firebase/firestore";
import { writeBatch, doc } from "firebase/firestore"; 

import { db } from "../../firebase";

const sems = ['1-1', '1-2', '2-1', '2-2', '3-1', '3-2', '4-1', '4-2']
export const AddSubjects = () => {
    const [multipleValues, setMultipleValues] = React.useState('')
    const [open, setOpen] = React.useState(false)
    const [snackbar, setSnackbar] = React.useState({
        show: false,
        severity: 'info',
        message: ''
    })
    const [subjectObj, setSubjectObj] = React.useState({
        sem: '',
        subject: '',
    })
    const showSnackbar = (show, severity, message) => {
        setSnackbar({
            show: show,
            severity: severity,
            message: message
        })
    }

    const saveInfoToDatabase = async () => {
        

        try{
            setOpen(true)
        let batch=writeBatch(db)        
        subjectObj.subject.split('\n').filter(e => e.trim().length > 0).forEach((e) => {
            let document = doc(db, `${subjectObj.sem}`,`${e}`);
            batch.set(document, {subject: e});
          })
          console.log(batch)
         await batch.commit()
         showSnackbar(true,'success','Data Uploaded Successfully')
         setOpen(false)
        }catch(err){
            showSnackbar(true,'error','Data Upload Failed')
            setOpen(false)
        }
        setSubjectObj({
            sem: '',
            subject: '',
        })
    }
    return (
        <div className="parent-container">
            <Snackbar
                open={snackbar.show}
                onClose={() => setSnackbar({
                    show: false,
                    severity: 'info',
                    message: ''
                })}
                autoHideDuration={2000}
            >
                <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={() => setOpen(false)}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                onChange={(e) => { setSubjectObj(prevObject => ({ ...prevObject, sem: e.target.innerText })); }}
                options={sems}
                value={subjectObj.sem}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Select Sem" />}
            />


            <TextField
                id="outlined-multiline-static"
                label="Enter Subjects"
                multiline
                value={subjectObj.subject}
                sx={{ width: 300 }}
                onChange={(e) => setSubjectObj(prevObj => ({ ...prevObj, subject: e.target.value }))}
                rows={4}
               
            />
            <Button variant="contained" onClick={saveInfoToDatabase}>Upload</Button>
        </div>
    )
}