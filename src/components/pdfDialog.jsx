import React, { useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';

function PdfDialog({ pdfUrl,setOpen }) {

 

  return (
    <div>
      
      <Dialog
        open={true}
        onClose={()=>{setOpen(false)}}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>PDF Viewer</DialogTitle>
        <DialogContent>
          <iframe
            src={pdfUrl}
            style={{ width: '100%', height: '80vh' }}
            frameBorder="0"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PdfDialog;
