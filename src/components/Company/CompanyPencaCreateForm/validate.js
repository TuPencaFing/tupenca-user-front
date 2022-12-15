const validate = (values) => {
    const errors = {};
    if (!values.title) {
        errors.title = 'El título es requerido';
    }
    if (!values.description) {
        errors.description = 'La descripción es requerida';
    }
    if (!values.championship) {
        errors.championship = 'El campeonato es requerido';
    }
    if (!values.result) {
        errors.result = 'Se deben definir los puntos por resultado correcto.';
    } else if (values.result < 0) {
        errors.result = 'El valor debe ser positivo.';
    }
    if (!values.exactResult) {
        errors.exactResult = 'Se debe definir los puntos por resultado exacto.';
    }else if (values.exactResult < 0) {
        errors.exactResult = 'El valor debe ser positivo.';
    }
    return errors;
};

export default validate;
