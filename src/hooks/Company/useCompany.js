import { useEffect, useState } from 'react';

import { getCompanyByCode } from '../../services/companies';

const useCompany = (companyCode) => {
    const [loading, setLoading] = useState(false);
    const [company, setCompany] = useState(null);

    useEffect(() => {
        setLoading(true);
        getCompanyByCode(companyCode).then((response) => {
            console.log('Response of get company by code: ', response);
            const {
                id,
                title,
                description,
                image,
            } = response.data;
            setCompany({
                id,
                title,
                description,
                image,
            })
        }).catch((error) => {
            console.error('Error getting look and feel: ', error);
        }).finally(() => {
            setLoading(false);
        });
    }, [companyCode]);

    return {loading, company};
};

export default useCompany;
