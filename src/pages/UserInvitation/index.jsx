import React from 'react';

import Navbar from '../../components/Navbar';
import UserInvitationForm from '../../components/UserInvitationForm';
import { USER_LOGGED_PAGES, USERS_SETTINGS } from '../../utils/navbarItems';

const UserInvitation = () => {

    return (
        <>
            <Navbar
                pages={USER_LOGGED_PAGES}
                settings={USERS_SETTINGS}
            />
            <UserInvitationForm />
        </>
    );
};

export default UserInvitation;
