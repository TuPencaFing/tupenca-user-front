import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import { PieChart } from 'react-minimal-pie-chart';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

import { savePrediction } from '../../../services/events';
import TextFieldAdapter from '../../TextFieldAdapter';
import validate from './validate';
import './styles.scss';

const EventDetail = ({ event, stats, redirectAfterSave }) => {
    let params = useParams();
    const [feedbackMessage, setFeedbackMessage] = useState(null);

    const onSubmit = (values) => {
        console.log('form values: ', values);
        const { localTeamResult, visitorTeamResult } = values;
        const data = {
            pencaId: parseInt(params.pencaId),
        };
        let result = 0;
        if (event.isScoreValid) {
            if (localTeamResult > visitorTeamResult) {
                result = 1;
            } else if (localTeamResult < visitorTeamResult) {
                result = 2;
            }
            data.localTeamResult = parseInt(localTeamResult);
            data.visitorTeamResult = parseInt(visitorTeamResult);
        } else {
            if (parseInt(localTeamResult) === 1) {
                result = 1;
            } else if (parseInt(visitorTeamResult) === 1) {
                result = 2;
            }
        }
        data.result = result;
        console.log(event.id, data);
        savePrediction(event.id, data).then((response) => {
            console.log('Prediction saved successfully', response);
            redirectAfterSave();
        }).catch((error) => {
            console.log('Failed to save prediction', error);
            if (error.response.status === 400) {
                setFeedbackMessage({
                    type: 'error',
                    message: error.response.data,
                });
            } else {
                setFeedbackMessage({
                    type: 'error',
                    message: 'No se ha podido predecir. Inténtelo nuevamente en unos minutos',
                });
            }
        });
    };

    const dataGraph = [];
    if (stats.localVictoryPercentage > 0) {
        dataGraph.push({ title: `Gana ${event.localTeam.name}`, value: stats.localVictoryPercentage, color: '#AF7AC5' });
    }
    if (stats.visitorVictoryPercentage > 0) {
        dataGraph.push({ title: `Gana ${event.visitorTeam.name}`, value: stats.visitorVictoryPercentage, color: '#5DADE2' });
    }
    if (stats.tiePercentage > 0) {
        dataGraph.push({ title: 'Empate', value: stats.tiePercentage, color: '#CACFD2' });
    }

    return (
        <div className="event-detail">
            <Form
                onSubmit={onSubmit}
                validate={(values) => validate(values, event)}
                render={({ handleSubmit, submitting }) => (
                    <form onSubmit={handleSubmit} className="event-detail-form">
                        <div className="event-detail-result">
                            <div className="event-detail-local">
                                <img src={event.localTeam.image} alt="Local team" width="160px" />
                                <br />
                                {event.localTeam.name}
                                <br />
                                <br />
                                {event.isScoreValid ? (
                                    <Field
                                        name="localTeamResult"
                                        type="number"
                                        InputProps={{ inputProps: { min: 0, max: 999 } }}
                                        component={TextFieldAdapter}
                                        placeholder="0"
                                    />
                                ) : (
                                    <Field
                                        name="localTeamResult"
                                        select
                                        label="Resultado"
                                        component={TextFieldAdapter}
                                        className="event-detail-local-result-select"
                                        InputProps={{ inputProps: { min: 0, max: 999 } }}
                                    >
                                        <MenuItem key="local-team-result-winner" value="1">
                                            Ganador
                                        </MenuItem>
                                        <MenuItem key="local-team-result-loser" value="0">
                                            Perdedor
                                        </MenuItem>
                                        {event.isTieValid ? (
                                            <MenuItem key="local-team-result-tie" value="2">
                                                Empate
                                            </MenuItem>
                                        ) : null}
                                    </Field>
                                )}
                            </div>
                            <div className="event-detail-stats">
                                <div className="event-detail-stats-graph">
                                    {stats.localVictoryPercentage !== null
                                    || stats.visitorVictoryPercentage !== null
                                    || stats.tiePercentage !== null
                                        ? (
                                            <PieChart
                                                data={dataGraph}
                                                //label={({ dataEntry }) => `${dataEntry.value}% ${dataEntry.title}`}
                                                label={({ dataEntry }) => `${dataEntry.value}%`}
                                                labelStyle={{ fontSize: '6px', fill: 'black' }}
                                                lineWidth={20}
                                                labelPosition={70}
                                                //paddingAngle={18}
                                                rounded
                                            />
                                        ) : null}
                                </div>
                                <div className="event-detail-stats-ref">
                                    {stats.localVictoryPercentage !== null
                                    || stats.visitorVictoryPercentage !== null
                                    || stats.tiePercentage !== null
                                        ? (
                                            <>
                                                {`${stats.localVictoryPercentage ?? 0}% Gana ${event.localTeam.name}`}
                                                <br />
                                                {`${stats.visitorVictoryPercentage ?? 0}% Gana ${event.visitorTeam.name}`}
                                                {event.isTieValid ? (
                                                    <>
                                                        <br />
                                                        {`${stats.tiePercentage ?? 0}% Empate`}
                                                    </>
                                                ) : null}
                                            </>
                                        ) : null}
                                </div>
                            </div>
                            <div className="event-detail-visitor">
                                <img src={event.visitorTeam.image} alt="Visitor team" width="160px" />
                                <br />
                                {event.visitorTeam.name}
                                <br />
                                <br />
                                {event.isScoreValid ? (
                                    <Field
                                        name="visitorTeamResult"
                                        type="number"
                                        InputProps={{ inputProps: { min: 0, max: 999 } }}
                                        component={TextFieldAdapter}
                                        placeholder="0"
                                    />
                                ) : (
                                    <Field
                                        name="visitorTeamResult"
                                        select
                                        label="Resultado"
                                        component={TextFieldAdapter}
                                        className="event-detail-visitor-result-select"
                                        InputProps={{ inputProps: { min: 0, max: 999 } }}
                                    >
                                        <MenuItem key="visitor-team-result-winner" value="1">
                                            Ganador
                                        </MenuItem>
                                        <MenuItem key="visitor-team-result-loser" value="0">
                                            Perdedor
                                        </MenuItem>
                                        {event.isTieValid ? (
                                            <MenuItem key="visitor-team-result-tie" value="2">
                                                Empate
                                            </MenuItem>
                                        ) : null}
                                    </Field>
                                )}
                            </div>
                        </div>
                        {feedbackMessage && (
                            <div className="event-detail-error-message">
                                <Alert severity={feedbackMessage.type}>
                                    {feedbackMessage.message}
                                </Alert>
                                <br />
                            </div>
                        )}
                        <div className="event-detail-actions">
                            <Button
                                type="submit"
                                className="save-prediction"
                                variant="contained"
                                disabled={submitting}
                            >
                                Guardar predicción
                            </Button>
                        </div>
                    </form>
                )}
            />

        </div>
    );
};

export default EventDetail;
