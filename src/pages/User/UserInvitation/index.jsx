import React from 'react';

import Navbar from '../../../components/Navbar';
import UserInvitationForm from '../../../components/User/UserInvitationForm';
import { USER_LOGGED_PAGES, USER_ROUTES } from '../../../utils/navbarItems';

const UserInvitation = () => {

    return (
        <>
            <Navbar
                pages={USER_LOGGED_PAGES}
                routes={USER_ROUTES}
            />
            <UserInvitationForm />
        </>
    );
};

export default UserInvitation;
