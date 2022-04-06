import { Slider } from '@material-ui/core';
import { ChangeEvent, FC, useState } from 'react';
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
    onBlur,
    onChange
  }) => {

  return (
            <Controller
                    name={name}
                    defaultValue=''
                    control={control}
                    render={({field: {onChange, value}, fieldState}) => (<Slider
                        valueLabelDisplay="auto"
                        aria-label="Default"
                        defaultValue={10}
                        value={value}
                        aria-labelledby="input-slider"
                        onChange={(event: ChangeEvent<{}>, newValue: number | number[]) => {
                            onChange(newValue)
                        }}
                        min={10}
                        max={50}
                      />)}
            />)
}