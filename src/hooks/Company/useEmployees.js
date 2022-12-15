import { useEffect, useState } from 'react';

import { getEmployeesByCompanyId } from "../../services/employees";

const useEmployees = (companyId) => {
    const [loading, setLoading] = useState(false);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        setLoading(true);
        getEmployeesByCompanyId(companyId).then((response) => {
            console.log('Response of get employees: ', response);
            const employeesResp = [];
            response.data.forEach((employee) => {
                const { id, userName, email, image } = employee;
                employeesResp.push({
                    id,
                    userName,
                    email,
                    image,
                });
            });
            setEmployees(employeesResp);
        }).catch((error) => {
            console.error('Error getting employees: ', error);
        }).finally(() => {
            setLoading(false);
        });
    }, [companyId]);

    return {loading, employees};
};

export default useEmployees;
