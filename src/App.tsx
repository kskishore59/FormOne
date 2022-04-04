import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import AuthRoute from './components/AuthRoute';
import routes from './config/routes';
import { auth } from './config/firebase';
import logging from './config/logging';
import SignIn from './pages/auth/Login';
import { Box, CircularProgress } from '@mui/material';

export interface IApplicationProps { }

const App: React.FunctionComponent<IApplicationProps> = props => {
    const [loading, setLoading] = useState<boolean>(true)
    
    useEffect(() => {
        auth.onAuthStateChanged((user:any) => {
            if(user){
                logging.info('User Detected')
            }
            else{
                logging.info('No User Detected')
            }
            setLoading(false)
        })
    })

    if (loading) return  <Box sx={{ display: 'flex' }}>
    <CircularProgress />
  </Box>

    return (
        <div>
          <BrowserRouter>
            <Routes>
              <Route  path="/login" element={<SignIn />} />
            </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;