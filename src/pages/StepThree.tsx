import React, { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Container } from '@mui/material';
import Button from '@mui/material/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';


<<<<<<< Updated upstream
import '../components/Styles/styles.css';
import { auth } from '../config/firebase';
=======
import { auth } from '../config/firebase';
import { ControllerTexFieldComp } from '../formFields/TextFieldController';
>>>>>>> Stashed changes
import IPageProps from '../interfaces/page';
import { Step3, steps, updateDetails } from '../store/rootSlice';
import { AppDispatch, RootState } from '../store/store';
import Navbar from '../routes/Navbar';
import { Stepper } from './Stepper';
import { ControllerTexFieldComp } from '../customComponents/TextFieldController';



const StepThree: React.FunctionComponent<IPageProps> = props => {
    const dispatch: AppDispatch = useDispatch();
    const details = useSelector((state: RootState) => state)
    const { gender, phoneNumber, annualIncome, dob,doorNo, street, zipCode} = details.yourDetails
    const{email} = details.token;
    const validationSchema = Yup.object().shape({
      doorNo: Yup.number()
          .required('Door No. is required').min(2).typeError('Please enter only Numbers from 0-9'),
      street: Yup.string()
          .required('Street Name is required'),
      zipCode: Yup.number()
        .required('Zip Code is required')
        .min(6, 'Zip code must be 6 characters').max(6)
        .typeError('Please enter only Numbers from 0-9')
  });
 
    const { handleSubmit, control } = useForm<Step3>({
      resolver: yupResolver(validationSchema),
        defaultValues:  {doorNo, street, zipCode}
      });


    const  push = useNavigate();

    useEffect(() => {
      if (!gender || !phoneNumber || !annualIncome || !dob){
          push('/step2')
      }
    })

    const onClickBack = () => {
      push('/step2')
    }

    const onSubmit: SubmitHandler<Step3> = (data) => {
        console.log(data)
        dispatch(updateDetails(data))
        dispatch(steps({stepThree: true}))
        console.log(details)
        push('/result')
    };
    return (
    <Box sx={{ flexGrow: 1 }}>     
      <Navbar />
      <Container style={{minHeight: '100vh', backgroundColor: 'white', display: 'flex', flexDirection: 'column',
        alignItems: 'center',
    }}>
            <p>
                Welcome Home {email}<br />
            </p>
            <Stepper />
      <Box  sx={{ mt: 2, width: '50%'  }}>
      <form onSubmit={handleSubmit(onSubmit)} >
      
      <ControllerTexFieldComp
          type="number"
          name="doorNo"
          label="Door No"
          control={control}
        />

<ControllerTexFieldComp
          type="text"
          name="street"
          label="Street Name"
          control={control}
        />

<ControllerTexFieldComp
          type="number"
          name="zipCode"
          label="Zip Code"
          control={control}
        />

              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  style={{marginTop: 10, marginBottom: 3}}
                >
                  Next
                </Button>
        <Button
        fullWidth
        variant="contained"
        color="primary"
        type='button'
        onClick={onClickBack}
        style={{marginTop: 10, marginBottom: 10}}
      >Back</Button>
    </form>
    </Box>
    </Container>
        
    </Box>
    );
}                              

export default StepThree;
