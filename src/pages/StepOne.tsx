import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

<<<<<<< Updated upstream
import { auth } from '../config/firebase';
=======
import { ControllerTexFieldComp } from '../formFields/TextFieldController';
>>>>>>> Stashed changes
import IPageProps from '../interfaces/page';
import { Step1, steps, updateDetails } from '../store/rootSlice';
import { AppDispatch, RootState } from '../store/store';
import { Stepper } from './Stepper';
<<<<<<< Updated upstream
import Navbar from './Navbar';
import { ControllerTexFieldComp } from '../customComponents/TextFieldController';
=======
import Navbar from '../routes/Navbar';
>>>>>>> Stashed changes


const HomePage: React.FunctionComponent<IPageProps> = props => {
    const dispatch: AppDispatch = useDispatch();
    const details = useSelector((state: RootState) => state)
    const {firstName, lastName} = details.yourDetails;
    const{email} = details.token;
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
        dispatch(steps({stepOne: true}))
        console.log(details)
        history('/step2')
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
           
    <Box  sx={{ mt: 5, width: '50%' }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <ControllerTexFieldComp name="firstName" value={firstName} autoFocus={true} type="text" label="First Name"
                      control={control}  />
                  <ControllerTexFieldComp name="lastName" value={lastName} type="text" label="Last Name"
                      control={control}  />
                      
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mb: 2 }}
                  style={{marginTop: '20px'}}
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