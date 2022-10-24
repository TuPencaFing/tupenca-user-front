import React from 'react';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import './styles.scss';

const StyledPaper = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 400,
    color: theme.palette.text.primary,
}));

const pencas = [{
    id: 1,
    name: 'FiFA World Cup - Qatar 2022',
    bettingPool: 14000,
}, {
    id: 2,
    name: 'Torneo clausura uruguayo',
    bettingPool: 3000,
}, {
    id: 3,
    name: 'Uruguay open',
    bettingPool: 13500,
}, {
    id: 4,
    name: 'NBA Season 2022',
    bettingPool: 20500,
}, {
    id: 5,
    name: 'Copa Libertadores',
    bettingPool: 500,
}, {
    id: 6,
    name: 'Liga Uruguaya de Básquetbol',
    bettingPool: 2000,
}];

const PencaList = () => {
    return (
        <>
            <div className="pencas-list-header">
                <h2>Pencas</h2>
                <LocalFireDepartmentIcon className="flame-icon" />
            </div>
            <div className="pencas-list">
                {pencas.map((penca) => (
                    <StyledPaper
                        key={penca.id}
                        sx={{
                            my: 1,
                            mx: 'auto',
                            p: 2,
                        }}
                    >
                        <Grid container wrap="nowrap" spacing={2}>
                            <Grid item xs>
                                <Typography>
                                <span className="penca-name">
                                    {penca.name}
                                </span>
                                    <br />
                                    <span className="penca-betting-pool">
                                    Pozo actual: <strong>${penca.bettingPool}</strong>
                                </span>
                                </Typography>
                            </Grid>
                        </Grid>
                    </StyledPaper>
                ))}
            </div>
        </>
    );
};

export default PencaList;
