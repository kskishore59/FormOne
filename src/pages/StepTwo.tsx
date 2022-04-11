import React, { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, FormLabel } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';


import { auth } from '../config/firebase';
import { CustomSlider } from '../formFields/CustomSlider';
import { CustomDateCom } from '../formFields/DateFieldController';
import { CustomRadioCom } from '../formFields/RadioController';
import { ControllerTexFieldComp } from '../formFields/TextFieldController';
import IPageProps from '../interfaces/page';
import { Step2, steps, updateDetails } from '../store/rootSlice';
import { AppDispatch, RootState } from '../store/store';
import Navbar from '../routes/Navbar';
import { Stepper } from './Stepper';




const StepTwoPage: React.FunctionComponent<IPageProps> = props => {
    const dispatch: AppDispatch = useDispatch();
    const details = useSelector((state: RootState) => state)
    const {firstName, lastName,dob, gender, phoneNumber, annualIncome} = details.yourDetails;
    const {email} = details.token;
    const validationSchema = Yup.object().shape({
          gender: Yup.string()
            .required('Please Select Gender')
            .oneOf(['male', 'female', 'others']),
          annualIncome: Yup.number()
            .required('Please Select Annual Income')
            .min(1, 'Please Select Annual Income of more than 1')
            .typeError('Please select your Annual Income'),
          dob: Yup.string().required('Please select Date of birth'),
          phoneNumber: Yup.number().min(10, 'Please Enter Valid Number')
            .required('Please enter your phone number')
            .typeError('Must be only numbers from 0-9')
  });
  
    const { handleSubmit,  control } = useForm<Step2>({
        resolver: yupResolver(validationSchema),
        defaultValues: {dob, gender, phoneNumber, annualIncome}
      });
      const  push  = useNavigate();
    
      useEffect(() => {
        if (!firstName || !lastName){
          push('/')
        }
      })

    const onClickBack = () => {
      push('/')
    }

    const onSubmit: SubmitHandler<Step2> = (data) => {
        console.log(data)
        dispatch(updateDetails(data))
        dispatch(steps({stepTwo: true}))
        push('/step3')
    };
    return (
    <Box sx={{ flexGrow: 1 }}> 
      <Navbar />   
      <Container style={{minHeight: '100vh', backgroundColor: 'white', display: 'flex', flexDirection: 'column',
        alignItems: 'center',
    }}>
            <p>
                Welcome Home {email}
            </p>
            <Stepper />
      <br/>
      <Box  sx={{ mt: 1, p:2 }} >
      <form onSubmit={handleSubmit(onSubmit)} >
      <CustomDateCom  name="dob" type='' label='Date of Birth' control={control}  />
      <ControllerTexFieldComp name="phoneNumber" type="text" label="Phone Number" control={control}  />
      <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
      <CustomRadioCom name="gender" value={gender} label='Gender' control={control} type="radio" />
      <div>
      <FormLabel htmlFor="customRange2" >Annual Income (LPA) : </FormLabel>
      <CustomSlider name="annualIncome" label='Annual Income' type="slider" control={control} value={annualIncome} />
      </div>
      <div>
      <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{marginBottom: 15, marginTop: 5}}
              >
                Next
        </Button>

        <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={onClickBack}
              >
                Back
              </Button>
      </div>
    </form>
    </Box>
    </Container> 
    </Box>
    );
}                              

export default StepTwoPage;
