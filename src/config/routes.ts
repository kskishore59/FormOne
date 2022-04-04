import IRoute from "../interfaces/route";

import SignIn from "../pages/auth/Login";



const routes: IRoute[] = [
    {
        path: '/login',
        exact: true,
        component: SignIn,
        name: 'Login Page',
        protected: false
    },
    
];

export default routes;
