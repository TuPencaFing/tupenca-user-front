import React from 'react';

import Navbar from '../../components/Navbar';
import PaymentForm from '../../components/PaymentForm';
import { USER_LOGGED_PAGES, USERS_SETTINGS } from '../../utils/navbarItems';

const Payment = () => {

    return (
        <>
            <Navbar
                pages={USER_LOGGED_PAGES}
                settings={USERS_SETTINGS}
            />
            <PaymentForm />
        </>
    );
};

export default Payment;
