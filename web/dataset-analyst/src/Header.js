import { Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';


function Header() {
  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" color="inherit" component="div">
            Dataset Analyst
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar></Toolbar>
    </React.Fragment>
  )
}

export default Header;
