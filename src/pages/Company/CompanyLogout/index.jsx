import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import Spinner from '../../../components/Spinner';
import { destroySession } from '../../../features/session/sessionSlice';
import { getCompanyAdminRoutes } from '../../../utils/routes';

const CompanyLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let params = useParams();

    useEffect(() => {
        dispatch(destroySession());
        navigate(getCompanyAdminRoutes(params.companyCode).login);
    }, [dispatch, navigate, params.companyCode]);

    return <Spinner />;
};

export default CompanyLogout;
