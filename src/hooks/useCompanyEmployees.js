import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getCompanyEmployees } from '../services/companies';

const useCompanyEmployees = () => {
    const { companyCode } = useParams();
    const [loading, setLoading] = useState(false);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        setLoading(true);
        getCompanyEmployees(companyCode).then((response) => {
            const employeeResp = [];
            response.data.forEach((funcionario) => {
                employeeResp.push({
                    id: funcionario.id,
                    userName: funcionario.userName,
                    email: funcionario.email,
                });
            })
            setEmployees(employeeResp);
        }).catch((error) => {
            console.error('Error getting company emplyees: ', error);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return {loading, employees};
};

export default useCompanyEmployees;
