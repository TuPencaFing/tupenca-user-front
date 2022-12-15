const validate = (values) => {
    const errors = {};
    if (!values.username) {
        errors.username = 'El username es requerido';
    }
    return errors;
};

export default validate;
