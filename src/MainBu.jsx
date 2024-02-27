import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const MainBu = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MyApp
          </Typography>
          <Button onClick={toggleDrawer}>Open Drawer</Button>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={openDrawer} onClose={toggleDrawer}>
        <div>
          <Button onClick={handleMenuClick}>Drawer Menu</Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleMenuClose}>Drawer Menu Item 1</MenuItem>
            <MenuItem onClick={handleMenuClose}>Drawer Menu Item 2</MenuItem>
            <MenuItem onClick={handleMenuClose}>Drawer Menu Item 3</MenuItem>
          </Menu>
        </div>
      </Drawer>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MyApp
          </Typography>
          <Button onClick={handleMenuClick}>App Bar Menu</Button>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleMenuClose}>App Bar Menu Item 1</MenuItem>
        <MenuItem onClick={handleMenuClose}>App Bar Menu Item 2</MenuItem>
        <MenuItem onClick={handleMenuClose}>App Bar Menu Item 3</MenuItem>
      </Menu>
    </div>
  );
};

export default MainBu;
