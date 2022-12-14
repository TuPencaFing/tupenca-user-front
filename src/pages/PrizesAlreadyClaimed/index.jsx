import React from 'react';
import { useSelector } from 'react-redux';

import Navbar from '../../components/Navbar';
import PrizesHeader from '../../components/PrizesHeader';
import PrizeList from '../../components/PrizeList';
import Spinner from '../../components/Spinner';
import usePrizes from '../../hooks/usePrizes';
import { USER_LOGGED_PAGES, USER_ROUTES } from '../../utils/navbarItems';

const PrizesAlreadyClaimed = () => {
    const { user } = useSelector((state) => state.session);
    const {loading, prizes} = usePrizes(user.id, true);

    if (loading) return <Spinner />;

    return (
        <>
            <Navbar
                pages={USER_LOGGED_PAGES}
                routes={USER_ROUTES}
            />
            <PrizesHeader />
            {prizes && prizes.length > 0 ? (
                <PrizeList
                    prizes={prizes}
                />
            ) : (
                <>
                    No hay premios
                </>
            )}
        </>
    );
};

export default PrizesAlreadyClaimed;
