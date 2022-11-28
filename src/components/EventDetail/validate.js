const validate = (values, event) => {
    console.log('validate: ', event);
    const errors = {};
    if (event.isScoreValid) {
        if (!values.localTeamResult) {
            errors.localTeamResult = 'El resultado local es requerido';
        } else if (values.localTeamResult < 0 || values.localTeamResult > 999) {
            errors.localTeamResult = 'El resultado no es válido';
        } else if (!values.visitorTeamResult) {
            errors.visitorTeamResult = 'El resultado visitante es requerido';
        } else if (values.visitorTeamResult < 0 || values.visitorTeamResult > 999) {
            errors.visitorTeamResult = 'El resultado no es válido';
        } else if ((values.localTeamResult === values.visitorTeamResult) && !event.isTieValid) {
            errors.localTeamResult = 'El resultado no puede ser empate';
            errors.visitorTeamResult = 'El resultado no puede ser empate';
        }
    } else {
        if (!values.localTeamResult) {
            errors.localTeamResult = 'El resultado local es requerido';
        } else if (!values.visitorTeamResult) {
            errors.visitorTeamResult = 'El resultado visitante es requerido';
        } else if (
            (values.localTeamResult === '1' && values.visitorTeamResult !== '0')
            || (values.visitorTeamResult === '1' && values.localTeamResult !== '0')
            || (values.localTeamResult === '0' && values.visitorTeamResult === '0')
        ) {
            errors.localTeamResult = 'Debe haber un ganador y un perdedor';
            errors.visitorTeamResult = 'Debe haber un ganador y un perdedor';
        } else if (
            (values.localTeamResult === '2' && values.visitorTeamResult !== '2')
            || (values.visitorTeamResult === '2' && values.localTeamResult !== '2')
        ) {
            errors.localTeamResult = 'Ambos deben ser empate';
            errors.visitorTeamResult = 'Ambos deben ser empate';
        }
    }
    return errors;
};

export default validate;
