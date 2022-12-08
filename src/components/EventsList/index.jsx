import React, { Fragment } from 'react';

import EventScore from '../EventScore';
import eventSuccess from '../../assets/event-success.png';
import eventFail from '../../assets/event-fail.png';
import './styles.scss';

const EventsList = ({ events, handleClickEvent }) => {

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

    const formatEventResult = (result, local) => {
        let resultStr;
        switch (result) {
            case 0:
                resultStr = 'Empate';
                break;
            case 1:
                if (local) {
                    resultStr = 'Ganador';
                } else {
                    resultStr = 'Perdedor';
                }
                break;
            case 2:
                if (local) {
                    resultStr = 'Perdedor';
                } else {
                    resultStr = 'Ganador';
                }
                break;
            default:
                resultStr = '';
                break;
        }
        return resultStr;
    };

    return (
        <div className="events-list">
            {events.map((event, key) => {
                const {
                    id: eventId,
                    fechaInicial: initialDate,
                    equipoLocal: localTeam,
                    equipoVisitante: visitorTeam,
                    prediccion: prediction,
                    resultado: result,
                    // isEmpateValid,
                    isPuntajeEquipoValid: isScoreValid,
                } = event;
                // const isScoreValid = false;
                let hit;
                if (isScoreValid) {
                    hit = prediction?.score > 0;
                } else {
                    hit = (result !== null) && (result.resultado === prediction?.prediccion);
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
                                className="local-team"
                            >
                                <div className="local-team-name">
                                    {localTeam.nombre}
                                </div>
                                <div className="local-team-image">
                                    <img src={localTeam.image} alt="Local team" width="48px" />
                                </div>
                                {prediction !== null ? (
                                    <>
                                        {isScoreValid ? (
                                            <div className={hit ? "local-team-prediction-score hit-result" : "local-team-prediction-score"}>
                                                {prediction.puntajeEquipoLocal}
                                            </div>
                                        ) : (
                                            <div className={hit ? "local-team-prediction hit-result" : "local-team-prediction"}>
                                                {formatEventResult(prediction.prediccion, true)}
                                            </div>
                                        )}
                                    </>
                                ) : null}
                                {result !== null ? (
                                    <>
                                        {isScoreValid ? (
                                            <div className="local-team-result-score">
                                                {result.puntajeEquipoLocal}
                                            </div>
                                        ) : (
                                            <div className="local-team-result">
                                                {formatEventResult(result.resultado, true)}
                                            </div>
                                        )}
                                    </>
                                ) : <div className="local-team-result-score">-</div>}
                            </div>
                            <div
                                className="visitor-team"
                            >
                                {result !== null ? (
                                    <>
                                        {isScoreValid ? (
                                            <div className="visitor-team-result-score">
                                                {result.puntajeEquipoVisitante}
                                            </div>
                                        ) : (
                                            <div className="visitor-team-result">
                                                {formatEventResult(result.resultado, false)}
                                            </div>
                                        )}
                                    </>
                                ) : <div className="visitor-team-result-score">-</div>}
                                {prediction !== null ? (
                                    <>
                                        {isScoreValid ? (
                                            <div className={hit ? "visitor-team-prediction-score hit-result" : "visitor-team-prediction-score"}>
                                                {prediction.puntajeEquipoVisitante}
                                            </div>
                                        ) : (
                                            <div className={hit ? "visitor-team-prediction hit-result" : "visitor-team-prediction"}>
                                                {formatEventResult(prediction.prediccion, false)}
                                            </div>
                                        )}
                                    </>
                                ) : null}
                                <div className="visitor-team-image">
                                    <img src={visitorTeam.image} alt="Visitor team" width="48px" />
                                </div>
                                <div className="visitor-team-name">
                                    {visitorTeam.nombre}
                                </div>
                            </div>
                            <div className="event-result">
                                {hit ? (
                                    <>
                                        <img width="39px" src={eventSuccess} alt="Resultado acertado" />
                                        <EventScore score={`+${prediction.score}`} />
                                    </>
                                ) : (prediction !== null && prediction.score !== null) ? (
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
