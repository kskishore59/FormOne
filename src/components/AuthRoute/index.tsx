import React from 'react';
import { auth } from '../../config/firebase';
import logging from '../../config/logging';
import { useNavigate } from 'react-router-dom';

export interface IAuthRouteProps { }

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = props => {
    const navigate = useNavigate()
    const { children } = props;

    if (!auth.currentUser)
    {
        logging.warn('No user detected, redirecting');
        navigate('/login')
    }

    return (
        <div>{children}</div>
    );
}

export default AuthRoute;