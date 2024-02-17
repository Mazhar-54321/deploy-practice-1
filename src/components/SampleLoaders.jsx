import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { LinearProgress, Skeleton, Snackbar } from '@mui/material';

export default function SampleLoaders() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div style={{height:'100%',width:'100%'}}>
      <CircularProgress />
      <LinearProgress />
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      {/* For other variants, adjust the size with `width` and `height` */}
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width={210} height={60} />
      <Skeleton variant="rounded" width={210} height={60} />
      <Snackbar
        open={true}
        autoHideDuration={6000}
        message="Note archived"
      />
    </div>
  );
}