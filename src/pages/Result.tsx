import { Box, Container } from '@mui/material';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {List, ListItem} from '@mui/material'


import { auth } from '../config/firebase';
import IPageProps from '../interfaces/page';
import { reset, steps } from '../store/rootSlice';
import { AppDispatch, RootState } from '../store/store';
import Navbar from '../routes/Navbar';
import { Stepper } from './Stepper';

const ResultPage: React.FunctionComponent<IPageProps> = props => {
    const dispatch: AppDispatch = useDispatch();
    const push = useNavigate()

    const details = useSelector((state: RootState) => state.yourDetails)
    const {firstName, lastName, dob, gender, phoneNumber, annualIncome, doorNo, street, zipCode} = details;
    
    const handleReset = () => {
      dispatch(reset())
      dispatch(steps({stepOne: false, stepTwo: false, stepThree: false}))
      push('/')
    }
    return(
        <>
        <Navbar />
      <Container style={{minHeight: '100vh', backgroundColor: 'white', display: 'flex', flexDirection: 'column',
        alignItems: 'center',
    }}>
            <p>
                Welcome Home {auth.currentUser?.email}<br />
            </p>
            <Stepper />
      <br/>
      <br/>
      <Box  sx={{ mt: 1 }} width={'100%'} style={{display: 'flex', justifyContent: 'Center'}}>
      <div>
      <List  style={{textAlign: 'left'}}>
           <ListItem className='list'>First Name: {firstName}</ListItem>
           <ListItem className='list'>Last Name: {lastName}</ListItem>
           <ListItem className='list'>DOB: {dob}</ListItem>
           <ListItem className='list'>Gender: {gender}</ListItem>
           <ListItem className='list'>Phone Number: {phoneNumber}</ListItem>
           <ListItem className='list'>Annual Income: {annualIncome} LPA</ListItem>
           <ListItem className='list'>Door No: {doorNo}</ListItem>
           <ListItem className='list'>Street: {street}</ListItem>
           <ListItem className='list'>Zip Code: {zipCode}</ListItem>
           <Button type='button'
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }} onClick={handleReset} >Reset</Button>
        </List>
        </div>
        </Box>
    </Container>
    
    </>
        
    )

}

export default ResultPage
    
