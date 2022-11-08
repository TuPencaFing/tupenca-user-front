import React from 'react';
import TextField from '@mui/material/TextField';

const TextFieldAdapter = ({ input, meta, ...rest }) => (
    <TextField
        {...input}
        {...rest}
        error={meta.touched ? (meta.error !== undefined) : false}
        helperText={meta.touched ? meta.error : ''}
    />
);

export default TextFieldAdapter;
