import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

import ROUTES from '../../../utils/routes';
import './styles.scss';

const CompanyPlanItem = ({ id, cost, numberOfUsers, numberOfPencas }) => {
    const navigate = useNavigate();

    return (
        <div className="company-plan-item">
            <div className="company-plan-item-details">
                <h3>Básico</h3>
                <h1>$ {cost}</h1>
                <span>{numberOfUsers} usuarios</span><br />
                <span>{numberOfPencas} pencas</span><br />
            </div>
            <div className="company-plan-item-button">
                <Button
                    type="button"
                    variant="contained"
                    onClick={() => navigate(`${ROUTES.companyPlans}/${id}`)}
                >
                    Elegir plan
                </Button>
            </div>
        </div>
    );
};

export default CompanyPlanItem;
