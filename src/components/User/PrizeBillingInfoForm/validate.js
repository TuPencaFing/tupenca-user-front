const validate = (values) => {
    const errors = {};
    if (!values.bankAccount)
        errors.bankAccount = 'La cuenta bancaria es requerida';
    if (!values.bankName)
        errors.bankName = 'El nombre del banco es requerido';
    return errors;
};

export default validate;
