import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Navbar from '../../../components/Navbar';
import PrizesHeader from '../../../components/User/PrizesHeader';
import PrizeList from '../../../components/User/PrizeList';
import Spinner from '../../../components/Spinner';
import useUserPrizes from '../../../hooks/User/useUserPrizes';
import { USER_LOGGED_PAGES, USER_ROUTES } from '../../../utils/navbarItems';
import ROUTES from '../../../utils/routes';

const Prizes = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.session);
    const {loading, prizes} = useUserPrizes(user.id, false);

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
                <div
                    className="prizes-list-empty"
                    style={{
                        marginTop: '8px',
                        display: 'flex',
                        justifyContent: 'center',
                        fontSize: '20px',
                    }}
                >
                    No tienes premios para reclamar. Continúa participando para ganar!!!
                </div>
            )}
        </>
    );
};

export default Prizes;
