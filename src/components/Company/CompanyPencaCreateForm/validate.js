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
    return errors;
};

export default validate;
