import React from 'react';

import Navbar from '../../components/Navbar';
import PencaList from '../../components/PencaList';
import Spinner from '../../components/Spinner';
import usePencas from '../../hooks/usePencas';
import { USER_LOGGED_PAGES, USERS_SETTINGS } from '../../utils/navbarItems';

const Pencas = () => {
    const {loading, pencas, handleJoinPenca} = usePencas();

    if (loading) return <Spinner />;

    return (
        <>
            <Navbar
                pages={USER_LOGGED_PAGES}
                settings={USERS_SETTINGS}
            />
            {pencas && pencas.length > 0 ? (
                <PencaList
                    pencas={pencas}
                    handleJoinPenca={handleJoinPenca}
                />
            ) : (
                <>
                    No hay pencas
                </>
            )}
        </>
    );
};

export default Pencas;
