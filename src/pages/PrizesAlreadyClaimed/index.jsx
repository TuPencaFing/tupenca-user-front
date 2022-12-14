import React from 'react';
import { useSelector } from 'react-redux';

import Navbar from '../../components/Navbar';
import PrizesHeader from '../../components/PrizesHeader';
import PrizeList from '../../components/PrizeList';
import Spinner from '../../components/Spinner';
import { USER_LOGGED_PAGES, USER_ROUTES } from '../../utils/navbarItems';

const loading = false;
const prizes = [
    {
        "id": 1,
        "image": "https://tupenca.blob.core.windows.net/images/us_open_logo.jpg",
        "title": "US Open"
    },
    {
        "id": 2,
        "image": "https://tupenca.blob.core.windows.net/images/us_open_logo.jpg",
        "title": "Champions"
    },
    {
        "id": 3,
        "image": "https://tupenca.blob.core.windows.net/images/us_open_logo.jpg",
        "title": "Worlds"
    },
];

const PrizesAlreadyClaimed = () => {
    const { user } = useSelector((state) => state.session);
    // const {loading, prizes} = usePrizes(user.id);

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
