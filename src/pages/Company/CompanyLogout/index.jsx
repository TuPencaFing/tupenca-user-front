import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import Spinner from '../../../components/Spinner';
import { destroySession } from '../../../features/session/sessionSlice';
import { getCompanyAdminRoutes } from '../../../utils/routes';
import { setBodyBackground, setBodyText } from "../../../utils/colors";

const CompanyLogout = () => {
    let params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setBodyText(null);
        setBodyBackground(null);
        dispatch(destroySession());
        navigate(getCompanyAdminRoutes(params.companyCode).login);
    }, [dispatch, navigate, params.companyCode]);

    return <Spinner />;
};

export default CompanyLogout;
