import React from 'react';
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import './styles.scss';
import { useState } from 'react';

const StyledPaper = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 400,
    color: theme.palette.text.primary,
}));


const CompanySubscriptionList = ({ subscriptions, activeSubscription }) => {

    const [rows, setRows] = useState(subscriptions);
    const [active, setActive] = useState(activeSubscription);

    function handleUpgradeSubscription(id){
        
    }
    
    return (
        <>
        <div className="pencas-list-header">
            <h2>Subscripciones</h2>
        </div>
        <div className="pencas-list">
            {rows.map((subscription) => (
                <StyledPaper
                    key={subscription.id}
                    sx={{
                        my: 1,
                        mx: 'auto',
                        p: 2,
                    }}
                >
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item xs>
                            <span className="penca-name">
                                {subscription.cantUser} Usuario y {subscription.cantPencas} Pencas
                            </span>
                            <br />
                            <div className="penca-footer">
                                <span className="penca-betting-pool">
                                    <strong>Costo:</strong> {subscription.percentageCost}
                                </span>
                                {active == subscription.id ? "" : <Button
                                        className="join-button"
                                        variant="contained"
                                        onClick={() => { if (window.confirm('Confirma el cambio de plan? Nuevos cargos pueden ser aplicados')) handleUpgradeSubscription(subscription.id) } }
                                    >
                                        Cambiar
                                    </Button>} 
                                    
                            </div>
                        </Grid>
                    </Grid>
                </StyledPaper>
            ))}
        </div>
    </>
    );
};

export default CompanySubscriptionList;
