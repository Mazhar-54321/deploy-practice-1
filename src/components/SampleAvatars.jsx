import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import Chip from '@mui/material/Chip';

export default function SampleAvatars() {
    const handleDelete = () => {
        console.info('You clicked the delete icon.');
      };
  return (
    <Stack direction="row" spacing={2}>
      <Avatar>H</Avatar>
      <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
      <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
      <Badge badgeContent={4} color="primary">
      <MailIcon color="action" />
    </Badge>
    <Chip label="Chip Outlined" variant="outlined" />
    <Chip label="Deletable" variant="outlined" onDelete={handleDelete} />
    </Stack>
  );
}