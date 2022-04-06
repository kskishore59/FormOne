import { TextField } from '@mui/material';
import { FC } from 'react';
import { Controller } from 'react-hook-form';

export interface TextFieldProps {
    name: string;
    label?: string;
    error?: boolean;
    helperText?: string;
    placeholder?: string;
    password?: boolean;
    number?: boolean;
    enableDecimal?: boolean;
    value?: any;
    inputRef?: any;
    fullWidth?: boolean;
    multiline?: boolean;
    rows?: number;
    type: string;
    control: any;
    maxLength?: number;
    onBlur?: () => void;
    onChange?: (value: string | number) => void;
}

  

export  const ControllerTexFieldComp: FC<TextFieldProps> = ({
    name,
    label,
    control,
    type,
    value,
    onBlur,
    onChange
  }) => {

  return (
            <Controller
                    name={name}
                    defaultValue=''
                    control={control}
                    render={({field, fieldState}) => (<TextField
                    {...field}                   
                    margin="normal"
                    type={type}
                    required
                    fullWidth 
                    value={value}               
                    label={label}               
                    autoComplete={type}
                    autoFocus
                    error={fieldState.error ? true : false}
                    helperText={
                      fieldState.error ? fieldState.error.message : ''
                    }
                />)}
            />)
}