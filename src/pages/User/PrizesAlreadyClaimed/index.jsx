import React from 'react';
import { useSelector } from 'react-redux';

import Navbar from '../../../components/Navbar';
import PrizesHeader from '../../../components/User/PrizesHeader';
import PrizeList from '../../../components/User/PrizeList';
import Spinner from '../../../components/Spinner';
import useUserPrizes from '../../../hooks/User/useUserPrizes';
import { USER_LOGGED_PAGES, USER_ROUTES } from '../../../utils/navbarItems';

const PrizesAlreadyClaimed = () => {
    const { user } = useSelector((state) => state.session);
    const {loading, prizes} = useUserPrizes(user.id, true);

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
