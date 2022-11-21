import React from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from '../../components/Navbar';
import PencaList from '../../components/PencaList';
import Spinner from '../../components/Spinner';
import usePencas from '../../hooks/usePencas';
import { USER_LOGGED_PAGES, USER_ROUTES } from '../../utils/navbarItems';
import ROUTES from '../../utils/routes';

const Pencas = () => {
    const navigate = useNavigate();
    const {loading, pencas, handleJoinPenca} = usePencas();

    const handleClickPenca = (pencaId) => {
        navigate(`${ROUTES.pencas}/${pencaId}`);
    };

    if (loading) return <Spinner />;

    return (
        <>
            <Navbar
                pages={USER_LOGGED_PAGES}
                routes={USER_ROUTES}
            />
            {pencas && pencas.length > 0 ? (
                <PencaList
                    pencas={pencas}
                    handleJoinPenca={handleJoinPenca}
                    handleClickPenca={handleClickPenca}
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
