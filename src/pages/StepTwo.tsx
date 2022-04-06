import MenuIcon from '@mui/icons-material/Menu';
import { Box, FormLabel } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
//import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import '../components/Styles/styles.css';
import { auth } from '../config/firebase';
import { ControllerTexFieldComp } from '../CustomComponents/ControllerComp';
import { CustomDateCom } from '../CustomComponents/CustomDateCom';
import { CustomRadioCom } from '../CustomComponents/CustomRadioCom';
import { CustomSlider } from '../CustomComponents/CustomSlider';
import IPageProps from '../interfaces/page';
//import { Step2, UserDetails } from '../Store/rootSlice';
//import { AppDispatch } from '../Store/store';
import { Stepper } from './Stepper';



const StepTwoPage: React.FunctionComponent<IPageProps> = props => {
    //const dispatch: AppDispatch = useDispatch();
    const [value, setValue] = React.useState<number>(10);
    //const details = useSelector<UserDetails, UserDetails['yourDetails']>((state) => state.yourDetails)
    //const {firstName, lastName,dob, gender, panNumber, annualIncome} = details
    const { handleSubmit, formState: { errors },  register, control } = useForm<any>({
        defaultValues: {dob:'', gender:'male', panNumber:''}
      });
      const  push  = useNavigate();
    
      /*useEffect(() => {
        if (!firstName || !lastName){
          push('./')
        }
      })*/



      const handleChange = (event: Event, newValue: number | number[]) => {
        if (typeof newValue === 'number') {
          setValue(newValue);
        }
      };

      function valuetext(value: number) {
        return `${value}°C`;
      }


    

    const onClickBack = () => {
      push('./')
    }

    const onSubmit: SubmitHandler<any> = (data) => {
        console.log(data)
        //dispatch({type: "UPDATE_DETAILS", payload: data})
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
      <Container style={{minHeight: '100vh', backgroundColor: 'white', textAlign: 'center'}}>
            <p>
                Welcome Home {auth.currentUser?.email}<br />
            </p>
            <Stepper />
      
      
      <br/>
      <Box  sx={{ mt: 1 }} >
      <form onSubmit={handleSubmit(onSubmit)} >
      <CustomDateCom  name="dob" type='' label='Date of Birth' control={control}  />
      <ControllerTexFieldComp name="phoneNumber" type="text" label="Phone Number"
                    control={control}  />
          <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
          <CustomRadioCom name="gender" label='Gender' control={control} type="radio" />
<label htmlFor="customRange2" className="form-label label">Annual Income (LPA) : </label>
      <CustomSlider name="annualIncome" label='Annual Income' type="slider" control={control} />
      
      <div>
      <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Next
        </Button>
        <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onChange={onClickBack}
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

/*<div className='list-card'>
        <p>Details Filled</p>
        {firstName !== '' ?  (<p>First Name : {firstName}</p>) : ''}
        {lastName !== '' ?  (<p>Last Name : {lastName}</p>) : ''}
      </div> */