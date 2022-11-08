const validate = (values) => {
    const errors = {};
    if (!values.email)
        errors.email = 'El email es requerido';
    return errors;
};

export default validate;
