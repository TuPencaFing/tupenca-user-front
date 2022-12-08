import React from 'react';
import { useParams } from 'react-router-dom';

import CompanyUserPencaDetailHeader from '../../../components/CompanyUser/CompanyUserPencaDetailHeader';
import Forum from '../../../components/Forum';
import Navbar from '../../../components/Navbar';
import Spinner from '../../../components/Spinner';
import useComments from '../../../hooks/useComments';
import useCompanyUserPenca from '../../../hooks/CompanyUser/useCompanyUserPenca';
import { COMPANY_USER_PAGES, USER_ROUTES } from '../../../utils/navbarItems';

const CompanyUserPencaForum = () => {
    let params = useParams();
    const { loading, penca } = useCompanyUserPenca(params.pencaId);
    const { loading: loadingComments, comments, handleSaveComment } = useComments(params.pencaId);

    if (loading) return <Spinner />;

    return (
        <>
            <Navbar
                pages={COMPANY_USER_PAGES(params.companyCode)}
                routes={USER_ROUTES}
            />
            {penca ? (
                <CompanyUserPencaDetailHeader penca={penca} />
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

export default CompanyUserPencaForum;
