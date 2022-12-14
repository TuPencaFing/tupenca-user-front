const validate = (values) => {
    const errors = {};
    if (!values.password) {
        errors.password = 'El campo es requerido.';
    } else if (values.password.length < 6) {
        errors.password = 'Mínimo de 6 caracteres';
    }
    if (!values.confirmPassword) {
        errors.confirmPassword = 'El campo es requerido.';
    } else if (values.confirmPassword.length < 6) {
        errors.confirmPassword = 'Mínimo de 6 caracteres';
    }

    if (!errors.password && !errors.confirmPassword && values.password !== values.confirmPassword) {
        errors.password = 'Las contraseñas no coinciden.';
        errors.confirmPassword = 'Las contraseñas no coinciden.';
    }
    return errors;
};

export default validate;
