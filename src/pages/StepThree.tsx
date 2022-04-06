import { yupResolver } from '@hookform/resolvers/yup';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Container } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import '../components/styles/styles.css';
import { auth } from '../config/firebase';
import { ControllerTexFieldComp } from '../customComponents/TextFieldController';
import IPageProps from '../interfaces/page';
import { Step3, updateDetails } from '../store/rootSlice';
import { AppDispatch, RootState } from '../store/store';
import Navbar from './Navbar';
import { Stepper } from './Stepper';



const StepThree: React.FunctionComponent<IPageProps> = props => {
    const location = useLocation()
    const dispatch: AppDispatch = useDispatch();
    const details = useSelector((state: RootState) => state.userForm.yourDetails)
    const {firstName, lastName, gender, phoneNumber, annualIncome, dob,doorNo, street, zipCode} = details
    const validationSchema = Yup.object().shape({
      doorNo: Yup.number()
          .required('Door No. is required').min(2),
      street: Yup.string()
          .required('Street Name is required'),
      zipCode: Yup.number()
        .required('Zip Code is required')
        .min(6)
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
        console.log(details)
        push('/result')
    };
    return (
    <Box sx={{ flexGrow: 1 }}>     
      <Navbar />
      <Container style={{minHeight: '100vh', textAlign: 'center'}}>
            <p>
                Welcome Home {auth.currentUser?.email}<br />
            </p>
            <Stepper />
      <br/>
      <Box  sx={{ mt: 1 }}>
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
                >
                  Next
                </Button>
                <br/>
                <br/>
        <Button
        fullWidth
        variant="contained"
        color="primary"
        type='button'
        onClick={onClickBack}
      >Back</Button>
    </form>
    </Box>
    </Container>
        
    </Box>
    );
}                              

export default StepThree;
