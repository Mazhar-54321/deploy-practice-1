import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Courses from './Courses';
import Students from './Students';
import ClassesAndCourses from './ClassesAndCourses';
import Activity from './Activity';
import Product from './Product';
import ProductMiddleware from './ProductMiddleware';
import VideoMiddleware from './VideoMiddleware';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Admin({userId}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%',padding:'0px'}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs variant='scrollable' scrollButtons={true} allowScrollButtonsMobile={true} value={value} onChange={handleChange} aria-label="basic tabs example">
          {/* <Tab style={{textTransform:'none',fontWeight:'bolder'}} label="Course" {...a11yProps(0)} />
          <Tab style={{textTransform:'none',fontWeight:'bolder'}} label="Classes" {...a11yProps(1)} />
          <Tab style={{textTransform:'none',fontWeight:'bolder'}} label="Student" {...a11yProps(2)} /> */}
          <Tab style={{textTransform:'none',fontWeight:'bolder'}} label="Product" {...a11yProps(0)} />
          <Tab style={{textTransform:'none',fontWeight:'bolder'}} label="Event" {...a11yProps(1)} />
          <Tab style={{textTransform:'none',fontWeight:'bolder'}} label="Video" {...a11yProps(2)} />
        </Tabs>
      </Box>
      {/* <CustomTabPanel value={value} index={0}>
        <Courses userId={userId} />
        Under rennovation
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ClassesAndCourses />
        Under rennovation
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Students userId={userId} />
        Under rennovation
      </CustomTabPanel> */}
      <CustomTabPanel value={value} index={0}>
        <ProductMiddleware />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Activity />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <VideoMiddleware />
      </CustomTabPanel>
    </Box>
  );
}
