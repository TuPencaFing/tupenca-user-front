import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';

import { getCompanyRoutes } from '../../../utils/routes';
import './styles.scss';

const CompanyUserPencaDetailHeader = ({ penca }) => {
    let params = useParams();
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
        <header className="company-user-penca-detail-header">
            <div className="company-user-penca-detail-header-basic">
                {penca.image ? (
                    <div className="company-user-penca-detail-header-image">
                        <img src={penca.image} alt="Penca" width="40px" />
                    </div>
                ) : null}
                <div className="company-user-penca-detail-header-name">
                    {penca.title}
                    <br />
                    {penca.description}
                </div>
            </div>
            <div className="company-user-penca-detail-header-menu">
                <Button
                    key="company-user-penca-detail-header-events"
                    onClick={() => navigate(getCompanyRoutes(params.companyCode, penca.id).pencaEvents)}
                    className={classNamePage(getCompanyRoutes(params.companyCode, penca.id).pencaEvents)}
                >
                    Eventos
                </Button>
                <Button
                    key="company-user-penca-detail-header-participants"
                    onClick={() => navigate(getCompanyRoutes(params.companyCode, penca.id).pencaParticipants)}
                    className={classNamePage(getCompanyRoutes(params.companyCode, penca.id).pencaParticipants)}
                >
                    Participantes
                </Button>
                <Button
                    key="company-user-penca-detail-header-forum"
                    onClick={() => navigate(getCompanyRoutes(params.companyCode, penca.id).pencaForum)}
                    className={classNamePage(getCompanyRoutes(params.companyCode, penca.id).pencaForum)}
                >
                    Foro
                </Button>
            </div>
            <div className="company-user-penca-detail-header-details">
                Campeonato: {penca.championshipName}
                <br />
                Deporte: {penca.sportName}
            </div>
        </header>
    );
};

export default CompanyUserPencaDetailHeader;
