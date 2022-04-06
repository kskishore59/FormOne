import React, { FC } from 'react'
import { TextField } from '@mui/material'


type Props = {
    field: any,
    fieldState: any,
    label: string,
    type: string,
}

export const CustomTextField: FC<Props>= ({
    field, 
    fieldState,
    label,
    type,
    ...otherProps
  }) => {
  return (
            <TextField
                    {...field}                   
                    margin="normal"
                    required
                    fullWidth                  
                    label={label}               
                    autoComplete={type}
                    autoFocus
                    error={fieldState.error ? true : false}
                    helperText={
                      fieldState.error ? fieldState.error.message : ''
                    }
                />
  )
}