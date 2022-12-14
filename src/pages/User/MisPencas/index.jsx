import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Navbar from '../../../components/Navbar';
import PencaList from '../../../components/User/PencaList';
import Spinner from '../../../components/Spinner';
import useMisPencas from '../../../hooks/User/useMisPencas';
import { USER_LOGGED_PAGES, USER_ROUTES } from '../../../utils/navbarItems';
import ROUTES from '../../../utils/routes';

const MisPencas = () => {
    const navigate = useNavigate();
    let [searchParams] = useSearchParams();
    const {loading, pencas} = useMisPencas(searchParams.get('search'));

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
            <PencaList
                search
                initialKeyword={searchParams.get('search')}
                pencas={pencas}
                handleClickPenca={handleClickPenca}
            />
        </>
    );
};

export default MisPencas;
