import React, { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, FormLabel } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';


import '../components/Styles/styles.css';
import { auth } from '../config/firebase';

import { ControllerTexFieldComp } from '../customComponents/TextFieldController';
import IPageProps from '../interfaces/page';
import { Step2, updateDetails } from '../store/rootSlice';
import { AppDispatch, RootState } from '../store/store';
import Navbar from './Navbar';
import { Stepper } from './Stepper';
import { CustomDateCom } from '../customComponents/DateFieldController';
import { CustomRadioCom } from '../customComponents/RadioController';
import { CustomSlider } from '../customComponents/CustomSlider';




const StepTwoPage: React.FunctionComponent<IPageProps> = props => {
    const dispatch: AppDispatch = useDispatch();
    const details = useSelector((state: RootState) => state.yourDetails)
    const {firstName, lastName,dob, gender, phoneNumber, annualIncome} = details
    const validationSchema = Yup.object().shape({
          gender: Yup.string()
            .required('Please Select Gender'),
          annualIncome: Yup.number()
            .required('Please Select Annual Income'),
          dob: Yup.string().required('Please select Date of birth'),
          phoneNumber: Yup.string().min(10, 'Please Enter Valid Number').max(10)
            .required('Please enter your phone number')
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
        push('/step3')
    };
    return (
    <Box sx={{ flexGrow: 1 }}> 
      <Navbar />   
      <Container style={{minHeight: '100vh', backgroundColor: 'white', textAlign: 'center'}}>
            <p>
                Welcome Home {auth.currentUser?.email}<br />
            </p>
            <Stepper />
      <br/>
      <Box  sx={{ mt: 1 }} >
      <form onSubmit={handleSubmit(onSubmit)} >
      <CustomDateCom  name="dob" type='' label='Date of Birth' control={control}  />
      <ControllerTexFieldComp name="phoneNumber" type="text" label="Phone Number" control={control}  />
      
      <CustomRadioCom name="gender" label='Gender' control={control} type="radio" />
      <br/>
      <br/>
      <div>
      <FormLabel htmlFor="customRange2" className="form-label label">Annual Income (LPA) : </FormLabel>
      <CustomSlider name="annualIncome" label='Annual Income' type="slider" control={control} />
      </div>
      <div>
      <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Next
        </Button>
        <br/> 
        <br/>
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
