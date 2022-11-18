import React from 'react';
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { deleteEmployee } from '../../../services/employees';
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
           
        </>
    );
};

export default CompanySubscriptionList;
