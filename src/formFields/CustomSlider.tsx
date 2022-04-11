import { Slider } from '@material-ui/core';
import { Box } from '@mui/material';
import { ChangeEvent, FC } from 'react';
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
    type?: string;
    control: any;
    maxLength?: number;
    onBlur?: () => void;
    onChange?: (value: string | number) => void;
}

  

export  const CustomSlider: FC<TextFieldProps> = ({
    name,
    label,
    control,
    value,
    onBlur,
    onChange
  }) => {

  return (
            <Controller
                    name={name}
                    defaultValue=''
                    control={control}
                    render={({field: {onChange, value}, fieldState}) => (
                        <>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <p style={{marginRight: '10px',backgroundColor: 'skyblue', padding: '10px'}}> 0</p>
                        <Slider
                        valueLabelDisplay="auto"
                        aria-label="Default"
                        defaultValue={value}
                        aria-labelledby="input-slider"
                        onChange={(event: ChangeEvent<{}>, newValue: number | number[]) => {
                            onChange(newValue)
                        }}
                        min={0}
                        max={50}
                      />

                      <p style={{marginLeft: '10px', backgroundColor: 'skyblue', padding: '10px'}}>50</p>
                      
                      </Box>
                      {fieldState.error ? <p style={{color: '#d32f2f',fontFamily: '"Roboto","Helvetica","Arial",sans-serif', fontSize: '12px', marginLeft: '15px'}}>{fieldState.error.message}</p> : ''}

                      </>)}
            />)
}
