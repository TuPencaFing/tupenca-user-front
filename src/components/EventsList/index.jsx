import React, { Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import EventScore from '../EventScore';
import ROUTES from '../../utils/routes';
import eventSuccess from '../../assets/event-success.png';
import eventFail from '../../assets/event-fail.png';
import './styles.scss';

const EventsList = ({ events }) => {
    let params = useParams();
    const navigate = useNavigate();

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('es-ES', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
        });
    };

    const uruguayanDate = (date) => {
        return new Date(date).toLocaleString("es-ES", {
            timeZone: 'America/Montevideo',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
    };

    const handleClickEvent = (eventId) => {
        navigate(`${ROUTES.pencas}/${params.pencaId}/eventos/${eventId}`);
    };

    return (
        <div className="events-list">
            {events.map((event, key) => {
                const {
                    id: eventId,
                    fechaInicial: initialDate,
                    equipoLocal: localTeam,
                    equipoVisitante: visitingTeam,
                    prediccion: prediction,
                    resultado: result,
                    isEmpateValid,
                    isPuntajeEquipoValid,
                } = event;
                let hit = null;
                if (prediction && result) {
                    if (isPuntajeEquipoValid) {
                        hit = (prediction.puntajeEquipoLocal === result.puntajeEquipoLocal)
                            && (prediction.puntajeEquipoVisitante === result.puntajeEquipoVisitante);
                    } else {
                        hit = prediction.resultado === result.resultado;
                    }
                }
                return (
                    <Fragment key={eventId}>
                        {(key === 0 || uruguayanDate(events[key - 1].fechaInicial) !== uruguayanDate(initialDate)) && (
                            <div>
                                {formatDate(initialDate)}
                            </div>
                        )}
                        <div className="event-item" onClick={() => handleClickEvent(eventId)}>
                            <div
                                className={isEmpateValid ? "local-team tie-exists" : "local-team"}
                            >
                                <div className="local-team-name">
                                    {localTeam.nombre}
                                </div>
                                <div className="local-team-image">
                                    <img src={localTeam.image} alt="Local team" width="48px" />
                                </div>

                                {isPuntajeEquipoValid && prediction ? (
                                    <div className={hit ? "local-team-prediction hit-result" : "local-team-prediction"}>
                                        {prediction.puntajeEquipoLocal}
                                    </div>
                                ) : null}
                                {isPuntajeEquipoValid && result ? (
                                    <div className="local-team-result">
                                        {result.puntajeEquipoLocal}
                                    </div>
                                ) : <div className="local-team-result">-</div>}
                            </div>
                            {isEmpateValid ? (
                                <div
                                    className="tie"
                                >
                                    Empate
                                </div>
                            ) : null}
                            <div
                                className={isEmpateValid ? "visiting-team tie-exists" : "visiting-team"}
                            >
                                {isPuntajeEquipoValid && result ? (
                                    <div className="visiting-team-result">
                                        {result.puntajeEquipoVisitante}
                                    </div>
                                ) : <div className="visiting-team-result">-</div>}
                                {isPuntajeEquipoValid && prediction ? (
                                    <div className={hit ? "visiting-team-prediction hit-result" : "visiting-team-prediction"}>
                                        {prediction.puntajeEquipoVisitante}
                                    </div>
                                ) : null}
                                <div className="visitor-team-image">
                                    <img src={visitingTeam.image} alt="Visitor team" width="48px" />
                                </div>
                                <div className="visiting-team-name">
                                    {visitingTeam.nombre}
                                </div>
                            </div>
                            <div className="event-result">
                                {hit ? (
                                    <>
                                        <img width="39px" src={eventSuccess} alt="Resultado acertado" />
                                        <EventScore score="+5" />
                                    </>
                                ) : (hit !== null) ? (
                                    <>
                                        <img width="39px" src={eventFail} alt="Resultado equivocado" />
                                        <EventScore score="+0" />
                                    </>
                                ) : null}
                            </div>
                        </div>
                    </Fragment>
                );
            })}
        </div>
    );
};

export default EventsList;
