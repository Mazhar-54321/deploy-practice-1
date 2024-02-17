import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PhoneIcon from '@mui/icons-material/Phone';
import SampleAutocomplete from '../components/SampleAutocomplete';
import SampleButtons from '../components/SampleButtons';
import SampleRatings from '../components/SampleRatings';
import SampleTextFields from '../components/SampleTextFields';
import SampleAvatars from '../components/SampleAvatars';
import SampleList from '../components/SampleList';
import SampleTable from '../components/SampleTable';
import SampleAlert from '../components/SampleFeedbacks';
import SampleLoaders from '../components/SampleLoaders';
import SampleAccordion from '../components/SampleAccordion';
import SamplePagination from '../components/SamplePagination';
import SampleMenu from '../components/SampleMenu';
import SampleStepper from '../components/SampleStepper';
import { useTheme } from '@mui/material/styles';
import SmartButtonSharpIcon from '@mui/icons-material/SmartButtonSharp';
import MotionPhotosAutoIcon from '@mui/icons-material/MotionPhotosAuto';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import RttIcon from '@mui/icons-material/Rtt';
import FaceRoundedIcon from '@mui/icons-material/FaceRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import TableRestaurantRoundedIcon from '@mui/icons-material/TableRestaurantRounded';
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
import AutorenewSharpIcon from '@mui/icons-material/AutorenewSharp';
import AccountTreeSharpIcon from '@mui/icons-material/AccountTreeSharp';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';
import MenuIcon from '@mui/icons-material/Menu';
import LinkIcon from '@mui/icons-material/Link';
import { AdminActivity } from './AdminActivity/AdminActivity';
import { AddSubjects } from './AddSubjects/AddSubjects';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function SampleVerticalTabs() {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100vh' }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
                        <Tab icon={<MotionPhotosAutoIcon />} iconPosition='top' label="Add Subjects" {...a11yProps(0)} />
                        <Tab icon={<SmartButtonSharpIcon />} iconPosition='top' label="Add Notes" {...a11yProps(1)} />
                        <Tab  icon={<StarOutlineIcon />} iconPosition='top' label="Edit Subjects" {...a11yProps(2)} />
                        <Tab  icon={<RttIcon />} iconPosition='top' label="Edit Notes" {...a11yProps(3)} />
                        <Tab icon={<FaceRoundedIcon />} iconPosition='top' label="Grant Permission" {...a11yProps(4)} />
                        <Tab icon={<FormatListBulletedRoundedIcon />} iconPosition='top' label="Remove Permission" {...a11yProps(5)} />
                        <Tab icon={<TableRestaurantRoundedIcon />} iconPosition='top' label="Update Fees" {...a11yProps(6)} />

                      
      </Tabs>
      <TabPanel value={value} index={0} dir={theme.direction}>
                        <AddSubjects />
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        <SampleButtons />
                    </TabPanel>
                    <TabPanel value={value} index={2} dir={theme.direction}>
                        <SampleRatings />
                    </TabPanel>
                    <TabPanel value={value} index={3} dir={theme.direction}>
                        <SampleTextFields />
                    </TabPanel>
                    <TabPanel value={value} index={4} dir={theme.direction}>
                        <SampleAvatars />
                    </TabPanel>
                    <TabPanel value={value} index={5} dir={theme.direction}>
                        <SampleList />
                    </TabPanel>
                    <TabPanel value={value} index={6} dir={theme.direction}>
                        <SampleTable />
                    </TabPanel>
                    <TabPanel value={value} index={7} dir={theme.direction}>
                        <SampleAlert />
                    </TabPanel>
                    <TabPanel value={value} index={8} dir={theme.direction}>
                        <SampleLoaders />
                    </TabPanel>
                    <TabPanel value={value} index={9} dir={theme.direction}>
                        <SampleAccordion />
                    </TabPanel>
                    <TabPanel value={value} index={10} dir={theme.direction}>
                        <SamplePagination />
                    </TabPanel>
                    <TabPanel value={value} index={11} dir={theme.direction}>
                        <SampleMenu />
                    </TabPanel>
                    <TabPanel value={value} index={12} dir={theme.direction}>
                        <SampleStepper />
                    </TabPanel>
    </Box>
  );
}