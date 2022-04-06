import React from 'react';
import IPageProps from '../../interfaces/page';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import logging from '../../config/logging';
import { Container, Button } from '@material-ui/core';
import { Box } from '@mui/material';

const LogoutPage: React.FunctionComponent<IPageProps> = props => {
    const history = useNavigate();
    const logout = () => {
        auth.signOut()
        .then(() => history('/login'))
        .catch(error => logging.error(error))
    } 
    return (
        <Container style={{minHeight: '100vh', backgroundColor: 'white', textAlign: 'center',display: 'flex',alignItems: 'center', justifyContent: 'Center', }}>
        <Box  sx={{ mt: 1 }} width={'100%'} style={{display: 'flex',alignItems: 'center', justifyContent: 'Center', flexDirection: 'column'}}>
            <p className='text-center'>Are you sure you want to logout?</p>
            <div className='text-center'>
                <Button variant="contained" style={{marginRight: '10px', backgroundColor: 'skyblue'}}  onClick={() => history(-1)}>Cancel</Button>
                <Button variant="contained"  style={{marginRight: '10px', backgroundColor: 'lightgreen'}} onClick={() => logout()}>Logout</Button>
            </div>
        </Box>
        </Container>
    );
}

export default LogoutPage;