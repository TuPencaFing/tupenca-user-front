const validate = (values) => {
    const errors = {};
    if (!values.subject) {
        errors.subject = 'El asunto es requerido';
    }
    if (!values.body) {
        errors.body = 'El mensaje es requerido';
    }
    return errors;
};

export default validate;
