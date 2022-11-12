import React from 'react';

import Navbar from '../../components/Navbar';
import PaymentForm from '../../components/PaymentForm';
import { USER_LOGGED_PAGES, USER_ROUTES } from '../../utils/navbarItems';

const Payment = () => {

    return (
        <>
            <Navbar
                pages={USER_LOGGED_PAGES}
                routes={USER_ROUTES}
            />
            <PaymentForm />
        </>
    );
};

export default Payment;
