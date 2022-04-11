import { Box, Container } from '@mui/material';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


import '../components/Styles/styles.css';
import { auth } from '../config/firebase';
import IPageProps from '../interfaces/page';
import { reset } from '../store/rootSlice';
import { AppDispatch, RootState } from '../store/store';
import Navbar from './Navbar';
import { Stepper } from './Stepper';

const ResultPage: React.FunctionComponent<IPageProps> = props => {
    const dispatch: AppDispatch = useDispatch();
    const push = useNavigate()

    const details = useSelector((state: RootState) => state.yourDetails)
    const {firstName, lastName, dob, gender, phoneNumber, annualIncome, doorNo, street, zipCode} = details;
    
    const handleReset = () => {
      dispatch(reset())
      push('/')
    }
    return(
        <>
        <Navbar />
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
           <li className='list'>Door No: {doorNo}</li>
           <li className='list'>Street: {street}</li>
           <li className='list'>Zip Code: {zipCode}</li>
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
    
