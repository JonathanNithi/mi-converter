import './App.css';
import { AppBar, CssBaseline, Toolbar, Typography } from '@mui/material';
import MainArea from './components/MainArea';

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <div className='header'>
        
        <AppBar position='relative' sx={{ bgcolor: 'secondary.main' }}>
          <Toolbar >
            <Typography variant='h5'> Mission Possible Currency Converter </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <div className='body'>
        <Typography variant='h5' align='left' sx={{ padding: '20px' }}> Welcome to the currency converter portal </Typography>
        <MainArea />
      </div>

      <div className='footer'>
        <CssBaseline />
        <AppBar position='relative' sx={{ bgcolor: 'secondary.main' }}>
            <Typography align='center'> All rights reserved </Typography>
        </AppBar>
      </div>
    </div>
  );
}

export default App;
