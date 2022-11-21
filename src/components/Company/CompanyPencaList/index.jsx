import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import './styles.scss';

const StyledPaper = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 400,
    color: theme.palette.text.primary,
}));

const CompanyPencaList = ({ pencas, handleClickPenca }) => {

    return (
        <>
            <div className="pencas-list-header">
                <h2>Pencas</h2>
            </div>
            <div className="company-pencas-list">
                {pencas.map((penca) => (
                    <StyledPaper
                        key={penca.id}
                        sx={{
                            my: 1,
                            mx: 'auto',
                            p: 2,
                        }}
                        onClick={() => handleClickPenca(penca.id)}
                    >
                        <Grid container wrap="nowrap" spacing={2}>
                            <Grid item xs>
                                <span className="penca-name">
                                    {penca.title}
                                </span>
                            </Grid>
                        </Grid>
                    </StyledPaper>
                ))}
            </div>
        </>
    );
};

export default CompanyPencaList;
