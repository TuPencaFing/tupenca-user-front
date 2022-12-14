import React, { forwardRef } from 'react';
import { Field } from 'react-final-form';

const FileField = forwardRef(({ name, ...props }, ref) => {

    return (
        <Field name={name}>
            {({ input: { value, onChange, ...input } }) => (
                <input
                    ref={ref}
                    {...input}
                    type="file"
                    onChange={({ target }) => onChange(target.files)} // instead of the default target.value
                    {...props}
                />
            )}
        </Field>
    );
});

export default FileField;
