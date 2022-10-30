import React from 'react';
import { useSelector } from 'react-redux';

import Navbar from '../../components/Navbar';
import PencaList from '../../components/PencaList';
import { USER_LOGGED_PAGES, USER_PAGES, USERS_SETTINGS } from '../../utils/navbarItems';

const Home = () => {
    const { isLogged } = useSelector((state) => state.session);

    let pages;
    if (isLogged) {
        pages = USER_LOGGED_PAGES;
    } else {
        pages = USER_PAGES;
    }

    return (
        <>
            <Navbar
                pages={pages}
                settings={USERS_SETTINGS}
            />
            <PencaList />
        </>
    );
};

export default Home;
