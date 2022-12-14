const validate = (values) => {
    const errors = {};
    if (!values.comment) {
        errors.comment = 'El campo es obligatorio';
    }
    return errors;
};

export default validate;
