import React from 'react';

import Navbar from '../../components/Navbar';
import SignupForm from '../../components/SignupForm';
import { USER_PAGES } from '../../utils/navbarItems';

const Register = () => {

    return (
        <>
            <Navbar
                pages={USER_PAGES}
            />
            <SignupForm />
        </>
    );
};

export default Register;
