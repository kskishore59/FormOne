import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
//import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import '../components/Styles/styles.css';
import { auth } from '../config/firebase';
import { ControllerTexFieldComp } from '../CustomComponents/ControllerComp';
import IPageProps from '../interfaces/page';
import { updateDetails } from '../Store/rootSlice';
import { AppDispatch, RootState } from '../Store/store';
//import { Step1, UserDetails } from '../Store/rootSlice';
//import { AppDispatch } from '../Store/store';
import { Stepper } from './Stepper';

type Step1 = {
  firstName: string,
  lastName: string
}

const HomePage: React.FunctionComponent<IPageProps> = props => {
    const dispatch: AppDispatch = useDispatch();
    const details = useSelector((state: RootState) => state.form.yourDetails)
    const {firstName, lastName} = details;
    const validationSchema = Yup.object().shape({
      firstName: Yup.string()
          .required('This field is required'),
      lastName: Yup.string()
          .required('This field is required'),
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
    };
    return (
             <Box sx={{ flexGrow: 1 }}>     
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img style={{height: '40px', width: '50px'}} src="https://res.cloudinary.com/joinditto-in/image/upload/v1647523910/ditto_log_iqxxha.png" alt='logo' />
          </Typography>
          <Button style={{color: 'white'}}><Link to="/logout" style={{color: 'white', textDecoration: 'none', transform: 'scale(1.0)'}}>LOGOUT</Link></Button>
        </Toolbar>
      </AppBar>
      <Container style={{minHeight: '100vh', backgroundColor: 'white', textAlign: 'center'}}>
            <p>
                Welcome Home {auth.currentUser?.email}<br />
            </p>
            <Stepper />
           
      <br/>
      <br/>
    <Box  sx={{ mt: 1 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <ControllerTexFieldComp name="firstName" type="text" label="First Name"
                      control={control}  />
                  <ControllerTexFieldComp name="lastName" type="text" label="Last Name"
                      control={control}  />
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