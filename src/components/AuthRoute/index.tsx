import React, {FC, useEffect} from 'react';
import { auth } from '../../config/firebase';
import logging from '../../config/logging';
import { useNavigate } from 'react-router-dom';

export interface PropType {
    component: React.FC;
}

const PrivateRoute: FC<PropType> = ({ component: Component }) => {
    const navigate = useNavigate()
    if (!auth.currentUser)
    {
        logging.warn('No user detected, redirecting');
       
    }
    useEffect(() => {
        if (!auth.currentUser)
    {
        logging.warn('No user detected, redirecting');
        navigate('/login')
    }
    })

    return (
        <Component />
    );
        

   
}

export default PrivateRoute;

/*import { FC } from 'react';
import { useAppSelector } from 'app/hooks';
import { Navigate } from 'react-router-dom';

interface PropType {
    component: React.FC;
}

const PrivateRoute: FC<PropType> = ({ element: Component }) => {
    const { isAuthenticated } = useAppSelector(state => state.auth);

    if (isAuthenticated) return <Component />;
    return <Navigate to='/login' />;
};

export default PrivateRoute;*/