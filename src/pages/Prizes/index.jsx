import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Navbar from '../../components/Navbar';
import PrizesHeader from '../../components/PrizesHeader';
import PrizeList from '../../components/PrizeList';
import Spinner from '../../components/Spinner';
import usePrizes from '../../hooks/usePrizes';
import { USER_LOGGED_PAGES, USER_ROUTES } from '../../utils/navbarItems';
import ROUTES from '../../utils/routes';

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
    {
        "id": 4,
        "image": "https://tupenca.blob.core.windows.net/images/us_open_logo.jpg",
        "title": "Worlds"
    },
    {
        "id": 5,
        "image": "https://tupenca.blob.core.windows.net/images/us_open_logo.jpg",
        "title": "US Open"
    },
    {
        "id": 6,
        "image": "https://tupenca.blob.core.windows.net/images/us_open_logo.jpg",
        "title": "Champions"
    },
    {
        "id": 7,
        "image": "https://tupenca.blob.core.windows.net/images/us_open_logo.jpg",
        "title": "Worlds"
    },
    {
        "id": 8,
        "image": "https://tupenca.blob.core.windows.net/images/us_open_logo.jpg",
        "title": "Worlds"
    }
];

const Prizes = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.session);
    // const {loading, prizes} = usePrizes(user.id);

    if (loading) return <Spinner />;

    const handleClickItem = (prizeId) => {
        navigate(`${ROUTES.prizes}/${prizeId}`);
    };

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
                    handleClickItem={handleClickItem}
                />
            ) : (
                <>
                    No hay premios
                </>
            )}
        </>
    );
};

export default Prizes;
