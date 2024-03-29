import logo from './logo.svg';
import './App.css';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import SampleDrawer from './SampleDrawer';
import SampleDrawer1 from './SampleDrawer1';
import MainBu from './MainBu';
import CustomAccordion from './CustomAccordion';

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: '#FFFFFF'
    }
  },
});
function App() {

 
  return (
    <div className="App">
      
      <ThemeProvider theme={theme}>
         <SampleDrawer1 /> 
        
      
      </ThemeProvider>
    </div>
  );
}

export default App;
