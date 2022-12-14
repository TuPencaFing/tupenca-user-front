import { useEffect, useState } from 'react';

import { getEmployeesByCompanyId } from "../../services/employees";

const useEmployees = (companyCode) => {
    const [loading, setLoading] = useState(false);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        setLoading(true);
        getEmployeesByCompanyId(companyCode).then((response) => {
            console.log('Response of get employees: ', response);
            const employeesResp = [];
            response.data.forEach((employee) => {
                const { id, userName, email } = employee;
                employeesResp.push({
                    id,
                    userName,
                    email,
                });
            });
            setEmployees(employeesResp);
        }).catch((error) => {
            console.error('Error getting employees: ', error);
        }).finally(() => {
            setLoading(false);
        });
    }, [companyCode]);

    return {loading, employees};
};

export default useEmployees;
