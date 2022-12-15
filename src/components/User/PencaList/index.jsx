import React from 'react';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import Button from "@mui/material/Button";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import SearchBox from '../../SearchBox';
import './styles.scss';

const StyledPaper = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 400,
    color: theme.palette.text.primary,
}));

const PencaList = ({ headerIcon, pencas, handleClickPenca, handleJoinPenca, search, initialKeyword }) => {

    return (
        <>
            <div className="pencas-list-header">
                <h2>Pencas</h2>
                {headerIcon && (
                    <LocalFireDepartmentIcon className="flame-icon" />
                )}
            </div>
            {search ? (
                <SearchBox initialKeyword={initialKeyword} />
            ) : null}
            <div className="pencas-list">
                {pencas.length > 0 ? (
                    <>
                        {pencas.map((penca) => (
                            <StyledPaper
                                className="penca-item"
                                key={penca.id}
                                onClick={handleClickPenca ? () => handleClickPenca(penca.id) : null}
                            >
                                <div className="penca-item-left">
                                    <div className="penca-name">
                                        {penca.title}
                                    </div>
                                    {(penca.bettingPool !== null && penca.bettingPool !== undefined) ? (
                                        <div className="penca-betting-pool">
                                            Pozo actual: <strong>${penca.bettingPool}</strong>
                                        </div>
                                    ) : null}
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
                    </>
                ) : (
                    <div className="pencas-list-empty">
                        No hay pencas disponibles
                    </div>
                )}
            </div>
        </>
    );
};

export default PencaList;
