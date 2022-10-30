import React from 'react';

import Navbar from '../../components/Navbar';
import PencaList from '../../components/PencaList';
import Spinner from '../../components/Spinner';
import useMisPencas from '../../hooks/useMisPencas';
import { USER_LOGGED_PAGES, USERS_SETTINGS } from '../../utils/navbarItems';

const MisPencas = () => {
    const {loading, pencas} = useMisPencas();

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
                />
            ) : (
                <>
                    No hay pencas
                </>
            )}
        </>
    );
};

export default MisPencas;
