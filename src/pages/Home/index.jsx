import React from 'react';
import { useSelector } from 'react-redux';

import Navbar from '../../components/Navbar';
import PencaList from '../../components/PencaList';
import { USER_LOGGED_PAGES, USER_PAGES, USERS_SETTINGS } from '../../utils/navbarItems';

const pencas = [{
    id: 1,
    title: 'FiFA World Cup - Qatar 2022',
    bettingPool: 14000,
}, {
    id: 2,
    title: 'Torneo clausura uruguayo',
    bettingPool: 3000,
}, {
    id: 3,
    title: 'Uruguay open',
    bettingPool: 13500,
}, {
    id: 4,
    title: 'NBA Season 2022',
    bettingPool: 20500,
}, {
    id: 5,
    title: 'Copa Libertadores',
    bettingPool: 500,
}, {
    id: 6,
    title: 'Liga Uruguaya de Básquetbol',
    bettingPool: 2000,
}];

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
            <PencaList
                headerIcon
                pencas={pencas}
            />
        </>
    );
};

export default Home;
