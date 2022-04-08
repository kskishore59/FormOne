import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { auth } from '../config/firebase';
import { ControllerTexFieldComp } from '../customComponents/TextFieldController';
import IPageProps from '../interfaces/page';
import { Step1, updateDetails } from '../store/rootSlice';
import { AppDispatch, RootState } from '../store/store';
import { Stepper } from './Stepper';
import Navbar from './Navbar';


const HomePage: React.FunctionComponent<IPageProps> = props => {
    const dispatch: AppDispatch = useDispatch();
    const details = useSelector((state: RootState) => state.yourDetails)
    const {firstName, lastName} = details;
    const validationSchema = Yup.object().shape({
      firstName: Yup.string()
          .required('First Name is required'),
      lastName: Yup.string()
          .required('Last Name is required'),
  });

    const { handleSubmit, control } =useForm({
      resolver: yupResolver(validationSchema),
      defaultValues: {firstName, lastName}
    });

    const history = useNavigate();

    const onSubmit: SubmitHandler<Step1> = (data) => {
        console.log(data)
        dispatch(updateDetails(data))
        console.log(details)
        history('/step2')
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
      <br/>
    <Box  sx={{ mt: 1 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <ControllerTexFieldComp name="firstName" value={firstName} autoFocus={true} type="text" label="First Name"
                      control={control}  />
                  <ControllerTexFieldComp name="lastName" value={lastName} type="text" label="Last Name"
                      control={control}  />
                      <br/>
                      <br/>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Next
                </Button>
          </form>
            </Box>
        </Container>
        
    </Box>
    );
}                              

export default HomePage;