import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Spinner from '../../components/Spinner';
import { destroySession } from '../../features/session/sessionSlice';
import ROUTES from '../../utils/routes';

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(destroySession());
        navigate(ROUTES.login);
    }, [dispatch, navigate]);

    return <Spinner />;
};

export default Logout;
