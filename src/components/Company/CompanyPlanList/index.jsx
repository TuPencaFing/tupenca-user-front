import React from 'react';

import CompanyPlanItem from '../CompanyPlanItem';
import './styles.scss';

const CompanyPlanList = ({ plans }) => {

    return (
        <div className="company-plan-list">
            {plans.map((plan) => {
                //const { id, cantUser, percentageCost, lookAndFeel, cantPencas, cost } = plan;
                const { id, name, cantUser: numberOfUsers, cantPencas: numberOfPencas, cost } = plan;
                return (
                    <CompanyPlanItem
                        key={id}
                        id={id}
                        name={name}
                        cost={cost}
                        numberOfUsers={numberOfUsers}
                        numberOfPencas={numberOfPencas}
                    />
                )
            })}
        </div>
    );
};

export default CompanyPlanList;
