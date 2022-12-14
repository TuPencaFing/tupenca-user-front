import React from 'react';
import { useSelector } from 'react-redux';

import Navbar from '../../../components/Navbar';
import PencaList from '../../../components/User/PencaList';
import Spinner from '../../../components/Spinner';
import usePencasHot from '../../../hooks/User/usePencasHot';
import { USER_LOGGED_PAGES, USER_PAGES, USER_ROUTES } from '../../../utils/navbarItems';

const Home = () => {
    const {loading, pencas, handleJoinPenca} = usePencasHot();
    const { isLogged } = useSelector((state) => state.session);

    if (loading) return <Spinner />;

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
                routes={USER_ROUTES}
            />
            <PencaList
                headerIcon
                pencas={pencas}
                handleJoinPenca={handleJoinPenca}
            />
        </>
    );
};

export default Home;
