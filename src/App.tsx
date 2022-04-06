import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import AuthRoute from './components/AuthRoute';
import routes from './config/routes';
import { auth } from './config/firebase';
import logging from './config/logging';
import SignIn from './pages/auth/Login';
import { Box, CircularProgress } from '@mui/material';
import RegisterPage from './pages/auth/Register';
import ForgotPasswordPage from './pages/auth/forgot';
import HomePage from './pages/StepOne';
import PrivateRoute from './components/AuthRoute';
import StepTwoPage from './pages/StepTwo';
import StepThree from './pages/StepThree';


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
              <Route  path="/register" element={<RegisterPage />} />
              <Route path="/forgot" element={<ForgotPasswordPage/>} />
              <Route path="/"  element={<PrivateRoute component={HomePage} />} />
              <Route path="/step2" element={<PrivateRoute component={StepTwoPage}/>} />
              <Route path="/step3" element={<PrivateRoute component={StepThree}/>} />
            </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;