import React from 'react';
import { useParams } from 'react-router-dom';

import Forum from '../../components/Forum';
import Navbar from '../../components/Navbar';
import PencaDetailHeader from '../../components/PencaDetailHeader';
import Spinner from '../../components/Spinner';
import usePenca from '../../hooks/usePenca';
import { USER_LOGGED_PAGES, USER_ROUTES } from '../../utils/navbarItems';
import useComments from "../../hooks/useComments";

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
