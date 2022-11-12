import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getCompany } from '../services/companies';

const useCompanyEmployees = () => {
    const { companyCode } = useParams();
    const [loading, setLoading] = useState(false);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        setLoading(true);
        getCompany(companyCode).then((response) => {
            const employeeResp = [];
            response.data.funcionarios.forEach((funcionario) => {
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
