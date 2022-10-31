import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CompanyPencaList from '../../components/CompanyPencaList';
import Navbar from '../../components/Navbar';
import Spinner from '../../components/Spinner';
import useCompanyPencas from '../../hooks/useCompanyPencas';
import { EMPLOYEE_LOGGED_PAGES, EMPLOYEE_SETTINGS } from '../../utils/navbarItems';
import { getCompanyRoutes } from '../../utils/routes';

const CompanyPencas = () => {
    let params = useParams();
    const {loading, pencas} = useCompanyPencas();

    const navigate = useNavigate();

    const handleClickPenca = (pencaId) => {
        navigate(`${getCompanyRoutes(params.companyCode).pencas}/${pencaId}`);
    };

    if (loading) return <Spinner />;

    return (
        <>
            <Navbar
                pages={EMPLOYEE_LOGGED_PAGES(params.companyCode)}
                settings={EMPLOYEE_SETTINGS(params.companyCode)}
            />
            {pencas && pencas.length > 0 ? (
                <CompanyPencaList
                    pencas={pencas}
                    handleClickPenca={handleClickPenca}
                />
            ) : (
                <>
                    No hay pencas
                </>
            )}
        </>
    );
};

export default CompanyPencas;
