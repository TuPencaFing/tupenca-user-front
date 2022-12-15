import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { getLookAndFeel } from '../../services/companyLookAndFeel';
import { setCompanyConfiguration } from "../../features/session/sessionSlice";
import { setBodyBackground, setBodyText } from "../../utils/colors";

const useLookAndFeel = (companyCode) => {
    const dispatch = useDispatch();
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
            const configurationData = {
                generalText,
                generalBackground,
                navbarText,
                navbarBackground,
            };
            setConfiguration(configurationData);
            dispatch(setCompanyConfiguration(configurationData));
            setBodyText(configurationData.generalText);
            setBodyBackground(configurationData.generalBackground);
        }).catch((error) => {
            console.error('Error getting look and feel: ', error);
        }).finally(() => {
            setLoading(false);
        });
    }, [companyCode]);

    return {loading, configuration};
};

export default useLookAndFeel;
