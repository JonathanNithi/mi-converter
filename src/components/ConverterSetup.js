import React from 'react'
import { MenuItem, TextField } from '@mui/material'

function ConverterSetup({currencyOptions,
  selectedCurrency,
  onChangeCurrency,
  onChangeAmount,
  amount,
  defaultValue,
  inputTitle,
  selectTitle}) {
  return (
    <div>
        <TextField
          id="outlined-number"
          label={inputTitle}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          style = {{width: 150, margin: 5}}
          value={amount} 
          onChange={onChangeAmount} 
        />
        <TextField
          id="outlined-select-currency"
          select
          label={selectTitle}
          defaultValue={defaultValue}
          style = {{ margin: 5}}
          value={selectedCurrency} 
          onChange={onChangeCurrency}
        >
          {currencyOptions.map(option => (
          <MenuItem key={option} value={option}>{option}</MenuItem>
        ))}
        </TextField>
    </div>
  )
}

export default ConverterSetup