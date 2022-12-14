const validate = (values) => {
    const errors = {};
    if (!values.title) {
        errors.title = 'El título es requerido';
    }
    return errors;
};

export default validate;
