import React from 'react';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import Button from "@mui/material/Button";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import './styles.scss';

const StyledPaper = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 400,
    color: theme.palette.text.primary,
}));

const PencaList = ({ headerIcon, pencas, handleJoinPenca }) => {

    return (
        <>
            <div className="pencas-list-header">
                <h2>Pencas</h2>
                {headerIcon && (
                    <LocalFireDepartmentIcon className="flame-icon" />
                )}
            </div>
            <div className="pencas-list">
                {pencas.map((penca) => (
                    <StyledPaper
                        className="penca-item"
                        key={penca.id}
                    >
                        <div className="penca-item-left">
                            <div className="penca-name">
                                {penca.title}
                            </div>
                            <div className="penca-betting-pool">
                                Pozo actual: <strong>${penca.bettingPool}</strong>
                            </div>
                        </div>
                        <div className="penca-item-right">
                            {handleJoinPenca && (
                                <>
                                    <Button
                                        className="join-button"
                                        variant="contained"
                                        onClick={() => handleJoinPenca(penca.id)}
                                    >
                                        Unirme
                                    </Button>
                                    <div className="penca-price">
                                        Costo inscripción: <strong>${penca.price}</strong>
                                    </div>
                                </>
                            )}
                        </div>
                    </StyledPaper>
                ))}
            </div>
        </>
    );
};

export default PencaList;
