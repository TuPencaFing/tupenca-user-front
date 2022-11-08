const validate = (values) => {
    const errors = {};
    if (!values.email)
        errors.email = 'El email es requerido';
    if (!values.password)
        errors.password = 'La contraseña es requerida';
    return errors;
};

export default validate;
