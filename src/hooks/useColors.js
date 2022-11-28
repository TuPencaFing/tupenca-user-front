import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getCompanyColors } from '../services/companies';

const useColors = () => {
    const { companyCode } = useParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getCompanyColors(companyCode).then((response) => {
            document.documentElement.style.setProperty('--color-generaltext', response.data.generaltext);
            document.documentElement.style.setProperty('--color-generalbackground', response.data.generalbackground);
            document.documentElement.style.setProperty('--color-textnavbar', response.data.textnavbar);
            document.documentElement.style.setProperty('--color-navbar', response.data.navbar);
        }).catch((error) => {
            console.error('Error getting company colors: ', error);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return {loading};
};

export default useColors;
