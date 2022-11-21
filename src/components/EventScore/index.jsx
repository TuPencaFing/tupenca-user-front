import React from 'react';

import './styles.scss';

const EventScore = ({ score }) => {

    return (
        <div className="event-score">
            {score}
        </div>
    );
};

export default EventScore;
