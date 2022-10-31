import React, { Fragment } from 'react';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SendIcon from '@mui/icons-material/Send';

import './styles.scss';

const EventsList = ({ events, updateResult, updateLocalScore, updateVisitorScore, handleSavePrediction }) => {

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('es-ES', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
        });
    };

    const handleChangeLocalScore = (eventId, score) => {
        updateLocalScore(eventId, score);
    };

    const handleChangeVisitorScore = (eventId, score) => {
        updateVisitorScore(eventId, score);
    };

    return (
        <div className="events-list">
            {events.map((event, key) => {
                return (
                    <Fragment key={event.id}>
                        {(key === 0 || events[key - 1].date !== events[key].date) && (
                            <div>
                                {formatDate(event.fechaInicial)}
                            </div>
                        )}
                        <div className="event-item">
                            <div
                                className={event.prediccion?.prediccion === 1 ? "local-team selected" : "local-team"}
                                onClick={() => updateResult(event.id, 1)}
                            >
                                <TextField
                                    name="local_team_result"
                                    type="number"
                                    variant="standard"
                                    InputProps={{ inputProps: { min: 0, max: 999 } }}
                                    placeholder="0"
                                    value={event.prediccion?.puntajeEquipoLocal || 0}
                                    onClick={(e) => e.stopPropagation()}
                                    onChange={(e) => handleChangeLocalScore(event.id, e.target.value)}
                                />
                                {event.equipoLocal.nombre}
                            </div>
                            <div
                                className={event.prediccion?.prediccion === 0 ? "tie selected" : "tie"}
                                onClick={() => updateResult(event.id, 0)}
                            >
                                Empate
                            </div>
                            <div
                                className={event.prediccion?.prediccion === 2 ? "visiting-team selected" : "visiting-team"}
                                onClick={() => updateResult(event.id, 2)}
                            >
                                {event.equipoVisitante.nombre}
                                <TextField
                                    name="visiting_team_result"
                                    type="number"
                                    variant="standard"
                                    InputProps={{ inputProps: { min: 0, max: 999 } }}
                                    placeholder="0"
                                    value={event.prediccion?.puntajeEquipoVisitante || 0}
                                    onClick={(e) => e.stopPropagation()}
                                    onChange={(e) => handleChangeVisitorScore(event.id, e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="event-item-actions">
                            <Button
                                variant="contained"
                                endIcon={<SendIcon />}
                                onClick={() => handleSavePrediction(event.id)}
                            >
                                Guardar
                            </Button>
                        </div>
                    </Fragment>
                );
            })}
        </div>
    );
};

export default EventsList;
