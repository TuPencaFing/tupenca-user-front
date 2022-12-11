const validate = (values) => {
    const errors = {};
    if (!values.companyName)
        errors.companyName = 'La razón social es requerida';
    if (!values.rut)
        errors.rut = 'El rut es requerido';
    if (!values.companyCode)
        errors.companyCode = 'El código de la empresa es requerido';
    if (!values.email) {
        errors.email = 'El email es requerido';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'El email no es válido';
    }
    if (!values.username)
        errors.username = 'El username es requerido';
    if (!values.password)
        errors.password = 'La contraseña es requerida';
    return errors;
};

export default validate;
