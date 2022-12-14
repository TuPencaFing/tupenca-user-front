import React from 'react';
import { useParams } from 'react-router-dom';

import Forum from '../../../components/User/Forum';
import Navbar from '../../../components/Navbar';
import PencaDetailHeader from '../../../components/User/PencaDetailHeader';
import Spinner from '../../../components/Spinner';
import useComments from '../../../hooks/User/useComments';
import usePenca from '../../../hooks/User/usePenca';
import { USER_LOGGED_PAGES, USER_ROUTES } from '../../../utils/navbarItems';

const PencaForum = () => {
    let params = useParams();
    const { loading, penca } = usePenca(params.pencaId);
    const { loading: loadingComments, comments, handleSaveComment } = useComments(params.pencaId);

    if (loading) return <Spinner />;

    return (
        <>
            <Navbar
                pages={USER_LOGGED_PAGES}
                routes={USER_ROUTES}
            />
            {penca ? (
                <PencaDetailHeader penca={penca} />
            ) : null}
            {!loadingComments ? (
                <Forum
                    comments={comments}
                    handleSaveComment={handleSaveComment}
                />
            ) : null}
        </>
    );
};

export default PencaForum;
