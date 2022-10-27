import React, { Fragment } from 'react';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SendIcon from '@mui/icons-material/Send';

import './styles.scss';

const EventsList = ({ events }) => {

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('es-ES', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
        });
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
                            <div className="local-team">
                                <TextField
                                    name="local_team_result"
                                    type="number"
                                    variant="standard"
                                    InputProps={{ inputProps: { min: 0, max: 999 } }}
                                    placeholder="0"
                                />
                                {event.equipoLocal.nombre}
                            </div>
                            <div className="tie">
                                Empate
                            </div>
                            <div className="visiting-team">
                                {event.equipoVisitante.nombre}
                                <TextField
                                    name="visiting_team_result"
                                    type="number"
                                    variant="standard"
                                    InputProps={{ inputProps: { min: 0, max: 999 } }}
                                    placeholder="0"
                                />
                            </div>
                        </div>
                        <div className="event-item-actions">
                            <Button variant="contained" endIcon={<SendIcon />}>
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
