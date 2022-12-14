import React from 'react';
import { useSearchParams } from 'react-router-dom';

import Navbar from '../../components/Navbar';
import PencaList from '../../components/PencaList';
import Spinner from '../../components/Spinner';
import usePencas from '../../hooks/usePencas';
import { USER_LOGGED_PAGES, USER_ROUTES } from '../../utils/navbarItems';

const Pencas = () => {
    let [searchParams] = useSearchParams();
    const {loading, pencas, handleJoinPenca} = usePencas(searchParams.get('search'));

    if (loading) return <Spinner />;

    return (
        <>
            <Navbar
                pages={USER_LOGGED_PAGES}
                routes={USER_ROUTES}
            />
            <PencaList
                search
                initialKeyword={searchParams.get('search')}
                pencas={pencas}
                handleJoinPenca={handleJoinPenca}
            />
        </>
    );
};

export default Pencas;
