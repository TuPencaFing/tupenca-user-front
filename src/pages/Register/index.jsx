import React from 'react';

import Navbar from '../../components/Navbar';
import SignupForm from '../../components/SignupForm';
import { USER_PAGES, USER_ROUTES } from '../../utils/navbarItems';

const Register = () => {

    return (
        <>
            <Navbar
                pages={USER_PAGES}
                routes={USER_ROUTES}
            />
            <SignupForm />
        </>
    );
};

export default Register;
