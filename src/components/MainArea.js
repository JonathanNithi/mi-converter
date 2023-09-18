import React, { useEffect, useState } from 'react';
import ConverterSetup from './ConverterSetup';
import { CssBaseline,  Typography } from '@mui/material';
import '../MainArea.css'
import GraphLogic from './GraphLogic';


const BASE_URL = `https://api.freecurrencyapi.com/v1/latest?apikey=${process.env.REACT_APP_API_KEY}`
const DETAIL_URL = `https://api.freecurrencyapi.com/v1/currencies?apikey=${process.env.REACT_APP_API_KEY}`

function MainArea() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [currencyDetails, setCurrencyDetails] = useState()


  //const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)

  //Removed the function of converting from both inputs to make sure no confusion is there when using the UI
//   let toAmount, fromAmount
//   if (amountInFromCurrency) {
//     fromAmount = amount
//     toAmount = amount * exchangeRate
//     toAmount = Math.round((toAmount  + Number.EPSILON) * 100) / 100

//   } else {
//     toAmount = amount
//     fromAmount = amount / exchangeRate
//     fromAmount = Math.round((fromAmount  + Number.EPSILON) * 100) / 100
//   }

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(res => {
        const firstCurrency = Object.keys(res.data)[0]
        setCurrencyOptions(Object.keys(res.data))
        setFromCurrency(`USD`)
        setToCurrency(firstCurrency)
        setExchangeRate(res.data[firstCurrency])
      })
  }, [])

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      
        fetch(`${BASE_URL}&base_currency=${fromCurrency}&currencies=${toCurrency}`)
            .then(res => res.json())
            .then(res => setExchangeRate(Math.round((res.data[toCurrency] + Number.EPSILON) * 100) / 100)) //Math.round((res.data[toCurrency] + Number.EPSILON) * 100) / 100
            .catch()

        fetch(`${DETAIL_URL}&currencies=${fromCurrency},${toCurrency}`)
            .then(res => res.json())
            .then(res => setCurrencyDetails(res.data)) 
            .catch(error => {
                console.log(error)
            })
    }
  }, [fromCurrency, toCurrency])

  

  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    //setAmountInFromCurrency(true)
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    //setAmountInFromCurrency(false)
  }

  
  console.log(currencyDetails)

  return (
    <>
        <Typography variant='h5' paddingBottom={3}>Enter value to convert</Typography>
        <div className='converter'>
            
            <ConverterSetup
                currencyOptions={currencyOptions}
                selectedCurrency={fromCurrency}
                onChangeCurrency={e => setFromCurrency(e.target.value)}
                onChangeAmount={handleFromAmountChange}
                amount={amount}
                defaultValue = "USD"
                inputTitle='Amount to convert'
                selectTitle='Base Currency'
            />
            <Typography variant='h4' display={'flex'} alignItems={'center'} justifyContent={'center'}>=</Typography>
            <ConverterSetup
                currencyOptions={currencyOptions}
                selectedCurrency={toCurrency}
                onChangeCurrency={e => setToCurrency(e.target.value)}
                onChangeAmount={handleToAmountChange}
                amount={Math.round(((amount * exchangeRate) + Number.EPSILON) * 100) / 100}
                defaultValue = 'AUD'
                inputTitle='Converted amount'
                selectTitle='Target Currency'
            />

        </div>
        
        {((fromCurrency != null && toCurrency != null) && currencyDetails != null) ? 
        (<Typography variant='h5' padding={3}>1 {currencyDetails[fromCurrency]?.name} is equal to {exchangeRate} {currencyDetails[toCurrency]?.name}</Typography>) : ''}
    
        
        <GraphLogic fromCurrency={fromCurrency} toCurrency={toCurrency}/>
        
        </>
  );
}

export default MainArea;
