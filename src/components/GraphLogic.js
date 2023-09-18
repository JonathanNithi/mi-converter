import React, { useEffect, useState } from 'react'
import { MenuItem, TextField, Box, Grid } from '@mui/material'

import LineChart from './LineChart';

const HISTORY_URL = `https://api.freecurrencyapi.com/v1/historical?apikey=${process.env.REACT_APP_API_KEY}`

function GraphLogic({fromCurrency, toCurrency}) {

  const [length, setLength] = useState('');
  const [durationChoice, setDurationChoice] = useState(weekDate)
  const [historicalData, setHistoricalData] = useState()
  
  const yesterday = () => {
    let d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toJSON().slice(0,10);
  };

  function weekDate() {
    let d = new Date();
    d.setDate(d.getDate() - 7);
    return d.toJSON().slice(0,10);
  };

  const monthDate = () => {
    let d = new Date();
    d.setDate(d.getDate() - 30);
    return d.toJSON().slice(0,10);
  };

  const sixMonthDate = () => {
    let d = new Date();
    d.setDate(d.getDate() - 180);
    return d.toJSON().slice(0,10);
  };


  const handleLengthChange = (e) => {
    setLength(e.target.value)
    if(e.target.value == '7 days'){
    setDurationChoice(weekDate())
    }
    else if(e.target.value == '1 month'){
      setDurationChoice(monthDate())
    }
    else if(e.target.value == '6 months'){
      setDurationChoice(sixMonthDate())
    }
  }

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${HISTORY_URL}&date_from=${durationChoice}&date_to=${yesterday()}&base_currency=${fromCurrency}&currencies=${toCurrency}`)
      .then(res => res.json())
      .then(res => setHistoricalData(res)) 
      .catch()  
    }

  }, [durationChoice,fromCurrency,toCurrency])

  //console.log(historicalData)
  
  
  return (
    <>
        <Box sx={{width:200, padding:2}}>
          <TextField
              id="outlined-select-timePeriod"
              select
              label="Duration"
              value={length}
              onChange={handleLengthChange}
              fullWidth
          >
            <MenuItem value='7 days'>7 days</MenuItem>
            <MenuItem value='1 month'>1 month</MenuItem>
            <MenuItem value='6 months'>6 months</MenuItem>
          </TextField>
          
        </Box>
        
        {historicalData ? <LineChart data = {historicalData}/> : ''}

        

    </>
  )
}

export default GraphLogic