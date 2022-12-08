import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

import ROUTES from '../../utils/routes';
import './styles.scss';

const PencaDetailHeader = ({ penca }) => {
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
        <header className="penca-detail-header">
            <div className="penca-detail-header-basic">
                {penca.image ? (
                    <div className="penca-detail-header-image">
                        <img src={penca.image} alt="Penca" width="40px" />
                    </div>
                ) : null}
                <div className="penca-detail-header-name">
                    {penca.title}
                    <br />
                    {penca.description}
                </div>
            </div>
            <div className="penca-detail-header-menu">
                <Button
                    key="penca-detail-header-events"
                    onClick={() => navigate(`${ROUTES.pencas}/${penca.id}/eventos`)}
                    className={classNamePage(`${ROUTES.pencas}/${penca.id}/eventos`)}
                >
                    Eventos
                </Button>
                <Button
                    key="penca-detail-header-participants"
                    onClick={() => navigate(`${ROUTES.pencas}/${penca.id}/participantes`)}
                    className={classNamePage(`${ROUTES.pencas}/${penca.id}/participantes`)}
                >
                    Participantes
                </Button>
                <Button
                    key="penca-detail-header-forum"
                    onClick={() => navigate(`${ROUTES.pencas}/${penca.id}/foro`)}
                    className={classNamePage(`${ROUTES.pencas}/${penca.id}/foro`)}
                >
                    Foro
                </Button>
            </div>
            <div className="penca-detail-header-details">
                Campeonato: {penca.championshipName}
                <br />
                Deporte: {penca.sportName}
            </div>
        </header>
    );
};

export default PencaDetailHeader;
