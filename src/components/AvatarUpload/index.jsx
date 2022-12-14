import React, { createRef, useState } from 'react';
import BigAvatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadIcon from '@mui/icons-material/CloudUpload';

import FileField from '../FileField';
import './styles.scss';

const AvatarUpload = ({ setFiles }) => {
    const [image, _setImage] = useState(null);
    const inputFileRef = createRef(null);

    const cleanup = () => {
        URL.revokeObjectURL(image);
        inputFileRef.current.value = null;
    };

    const setImage = (newImage) => {
        if (image) {
            cleanup();
        }
        _setImage(newImage);
    };

    const handleOnChange = (event) => {
        const newImage = event.target?.files?.[0];
        console.log('newimage', newImage);
        setFiles(newImage);

        if (newImage) {
            setImage(URL.createObjectURL(newImage));
        }
    };

    const handleClick = (event) => {
        if (image) {
            event.preventDefault();
            setImage(null);
        }
    };

    return (
        <div className="avatar-upload">
            <BigAvatar
                className="big-avatar"
                src={image}
            />
            <FileField
                ref={inputFileRef}
                accept="image/*"
                hidden
                id="avatar-image-upload"
                name="image"
                type="file"
                onChange={handleOnChange}
            />
            <label htmlFor="avatar-image-upload">
                <Button
                    className="avatar-uplaod-button"
                    variant="contained"
                    color="primary"
                    component="span"
                    mb={2}
                    onClick={handleClick}
                >
                    {image ? <DeleteIcon mr={2} /> : <UploadIcon mr={2} />}
                    &nbsp;&nbsp;
                    {image ? "Limpar" : "Subir imagen"}
                </Button>
            </label>
        </div>
    );
};

export default AvatarUpload;
