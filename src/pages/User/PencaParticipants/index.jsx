import React from 'react';
import { useParams } from 'react-router-dom';

import Navbar from '../../../components/Navbar';
import ParticipantsList from '../../../components/User/ParticipantsList';
import PencaDetailHeader from '../../../components/User/PencaDetailHeader';
import Spinner from '../../../components/Spinner';
import useParticipants from '../../../hooks/User/useParticipants';
import usePenca from '../../../hooks/User/usePenca';
import { USER_LOGGED_PAGES, USER_ROUTES } from '../../../utils/navbarItems';

const PencaParticipants = () => {
    let params = useParams();
    const {loading, penca} = usePenca(params.pencaId);
    const {participants} = useParticipants(params.pencaId);

    if (loading) return <Spinner />;

    return (
        <>
            <Navbar
                pages={USER_LOGGED_PAGES}
                routes={USER_ROUTES}
            />
            {penca ? (
                <PencaDetailHeader penca={penca} />
            ) : null}
            <ParticipantsList participants={participants} />
        </>
    );
};

export default PencaParticipants;
