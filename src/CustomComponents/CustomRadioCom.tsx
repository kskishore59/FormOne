import { FormControlLabel, RadioGroup, Radio } from '@mui/material';
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

  

export  const CustomRadioCom: FC<TextFieldProps> = ({
    name,
    label,
    control,
    type,
    onBlur,
    onChange
  }) => {

  return (
            <Controller
                    name={name}
                    defaultValue=''
                    control={control}
                    render={({field: {onChange}, fieldState}) => (<RadioGroup
                        onChange={onChange}
                        aria-labelledby="demo-radio-buttons-group-label"
                        id='gender'
                        row
                      >
                        <FormControlLabel   value="female" control={<Radio />} label="Female" />
                        <FormControlLabel    value="male" control={<Radio />} label="Male" />
                        <FormControlLabel   value="other" control={<Radio />} label="Other" />
                  </RadioGroup>)}
            />)
}