import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Courses from './Courses';
import Students from './Students';
import ClassesAndCourses from './ClassesAndCourses';

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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
    <Box sx={{ width: '100%'}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider',padding:'5px' }}>
        <Tabs variant='scrollable' scrollButtons='auto' value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab style={{textTransform:'none',fontWeight:'bolder'}} label="Course" {...a11yProps(0)} />
          <Tab style={{textTransform:'none',fontWeight:'bolder'}} label="Classes" {...a11yProps(1)} />
          <Tab style={{textTransform:'none',fontWeight:'bolder'}} label="Student" {...a11yProps(2)} />
          <Tab style={{textTransform:'none',fontWeight:'bolder'}} label="Product" {...a11yProps(3)} />
          <Tab style={{textTransform:'none',fontWeight:'bolder'}} label="Event" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Courses userId={userId} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ClassesAndCourses />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Students userId={userId} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Product
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        Event
      </CustomTabPanel>
    </Box>
  );
}
