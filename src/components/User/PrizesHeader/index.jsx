import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

import ROUTES from '../../../utils/routes';
import './styles.scss';

const PrizesHeader = () => {
    let location = useLocation();
    const navigate = useNavigate();

    const classNamePage = (route) => {
        if (location.pathname === route) {
            return 'current-page-path';
        } else {
            return 'page-path';
        }
    };

    return (
        <header className="prizes-header">
            <div className="prizes-header-menu">
                <Button
                    key="prizes-header-to-be-claimed"
                    onClick={() => navigate(ROUTES.prizesToBeClaimed)}
                    className={classNamePage(ROUTES.prizesToBeClaimed)}
                >
                    Para reclamar
                </Button>
                <Button
                    key="prizes-header-already-claimed"
                    onClick={() => navigate(ROUTES.prizesAlreadyClaimed)}
                    className={classNamePage(ROUTES.prizesAlreadyClaimed)}
                >
                    Reclamados
                </Button>
            </div>
        </header>
    );
};

export default PrizesHeader;
