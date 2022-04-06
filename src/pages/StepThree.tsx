import React, { useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Container } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { SubmitHandler, useForm } from 'react-hook-form';
//import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../components/Styles/styles.css';
import { auth } from '../config/firebase';
import IPageProps from '../interfaces/page';
//import { Step3, UserDetails } from '../Store/rootSlice';
//import { AppDispatch } from '../Store/store';
import { Stepper } from './Stepper';
import { ControllerTexFieldComp } from '../CustomComponents/ControllerComp';



const StepThree: React.FunctionComponent<IPageProps> = props => {
    const location = useLocation()
    //const dispatch: AppDispatch = useDispatch();
    //const details = useSelector<UserDetails, UserDetails['yourDetails']>((state) => state.yourDetails)
    //const {firstName, lastName, gender, phoneNumber, annualIncome, dob} = details
    //const {doorNo, street, zipCode} = details.address
    const { handleSubmit, control } = useForm<any>({
        defaultValues: {address: {doorNo: '', street:'', zipCode:''}}
      });


    const  push = useNavigate();

    /*useEffect(() => {
      if (!gender || !phoneNumber || !annualIncome || !dob){
          push('./step2')
      }
    })*/

    const onClickBack = () => {
      push('./step2')
    }

    const onSubmit: SubmitHandler<any> = (data) => {
        console.log(data)
        //dispatch({type: "UPDATE_DETAILS", payload: data })
        //console.log(details)
        //push('./result')
    };
    return (
             <Box sx={{ flexGrow: 1 }}>     
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
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
          name="address.doorNo"
          label="Door No"
          control={control}
        />

<ControllerTexFieldComp
          type="text"
          name="address.street"
          label="Street Name"
          control={control}
        />

<ControllerTexFieldComp
          type="number"
          name="address.zipCode"
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


/*<div className='list-card d-flex flex-column align-items-start justify-content-center w-100'>
<p>Details Filled</p>
{firstName !== '' ?  (<p>First Name : {firstName}</p>) : ''}
{lastName !== '' ?  (<p>Last Name : {lastName}</p>) : ''}
{dob !== '' ?  (<p>Date of Birth : {dob}</p>) : ''}
{phoneNumber !== '' ?  (<p>Phone Number : {phoneNumber}</p>) : ''}
{annualIncome !== '' ?  (<p>annualIncome : {annualIncome}</p>) : ''}
{gender !== '' ?  (<p>Gender : {gender}</p>) : ''}
</div> */