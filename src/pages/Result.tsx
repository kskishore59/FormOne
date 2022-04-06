import MenuIcon from '@mui/icons-material/Menu';
import { Box, Container } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../components/styles/styles.css';
import { auth } from '../config/firebase';
import IPageProps from '../interfaces/page';
import { reset } from '../store/rootSlice';
import { AppDispatch, RootState } from '../store/store';
import { Stepper } from './Stepper';

const ResultPage: React.FunctionComponent<IPageProps> = props => {
    const location = useLocation();
    const dispatch: AppDispatch = useDispatch();
    const push = useNavigate()

    const details = useSelector((state: RootState) => state.userForm.yourDetails)
    const {firstName, lastName, dob, gender, phoneNumber, annualIncome, doorNo, street, zipCode} = details;
    
    const handleReset = () => {
      dispatch(reset())
      push('/')
    }
    return(
        <>
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
      <br/>
      <Box  sx={{ mt: 1 }} width={'100%'} style={{display: 'flex', justifyContent: 'Center'}}>
      <div>
      <ul  style={{textAlign: 'left'}}>
           <li className='list'>First Name: {firstName}</li>
           <li className='list'>Last Name: {lastName}</li>
           <li className='list'>DOB: {dob}</li>
           <li className='list'>Gender: {gender}</li>
           <li className='list'>Phone Number: {phoneNumber}</li>
           <li className='list'>Annual Income: {annualIncome} LPA</li>
           <Button type='button'
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }} onClick={handleReset} >Reset</Button>
        </ul>
        </div>
        </Box>
    </Container>
    
    </>
        
    )

}

export default ResultPage
    
