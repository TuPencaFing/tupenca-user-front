import { useEffect, useState } from 'react';

import { getLookAndFeel } from '../../services/companyLookAndFeel';

const useLookAndFeel = (companyCode) => {
    const [loading, setLoading] = useState(false);
    const [configuration, setConfiguration] = useState(null);

    useEffect(() => {
        setLoading(true);
        getLookAndFeel(companyCode).then((response) => {
            console.log('Response of get look and feel: ', response);
            const {
                generaltext: generalText,
                generalbackground: generalBackground,
                textnavbar: navbarText,
                navbar: navbarBackground,
            } = response.data;
            setConfiguration({
                generalText,
                generalBackground,
                navbarText,
                navbarBackground,
            })
        }).catch((error) => {
            console.error('Error getting look and feel: ', error);
        }).finally(() => {
            setLoading(false);
        });
    }, [companyCode]);

    return {loading, configuration};
};

export default useLookAndFeel;
