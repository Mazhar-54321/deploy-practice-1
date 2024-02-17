import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
export default function SampleAlert() {
    const [open, setOpen] = React.useState(true);
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert  variant="filled" severity="error">
        This is an error alert — check it out!
      </Alert>
      <Alert variant="outlined" severity="warning">
        This is a warning alert — check it out!
      </Alert>
      <Alert variant="outlined" severity="info">
        This is an info alert — check it out!
      </Alert>
      <Alert variant="outlined" severity="success">
        This is a success alert — check it out!
      </Alert>
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Close me!
        </Alert>
      </Collapse>
    </Stack>
  );
}