import React from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import './styles.scss';

const StyledPaper = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    color: theme.palette.text.primary,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#FBDEC7'
}));

const PrizeItem = ({ id, premio, pencaTitle, pencaImage, handleClickItem }) => {

    const handleClickPaper = () => {
        if (handleClickItem !== undefined && handleClickItem !== null) {
            handleClickItem(id);
        }
    };

    return (
        <StyledPaper className="prize-item" onClick={handleClickPaper}>
            <ImageListItem>
                <img
                    src={`${pencaImage}?fit=crop&auto=format`}
                    srcSet={`${pencaImage}?fit=crop&auto=format&dpr=2 2x`}
                    alt={pencaTitle}
                    loading="lazy"
                />
                <ImageListItemBar
                    title={pencaTitle}
                    subtitle={`GANASTE $${premio}!!!`}
                    position="below"
                />
            </ImageListItem>
        </StyledPaper>
    );
};

export default PrizeItem;
