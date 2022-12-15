import { useCallback, useEffect, useState } from 'react';

import {
    enableUser as enableUserFunc,
    rejectUser as rejectUserFunc,
    getPencaUsers,
} from '../../services/companyUsers';

const usePencaUsers = (companyCode, pencaId) => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [usersCounter, setUsersCounter] = useState(null);

    const enableUser = (userId) => {
        return enableUserFunc(pencaId, userId, companyCode).then((response) => {
            console.log('Response enable user: ', response);
            refreshPencas();
        });
    };

    const rejectUser = (userId) => {
        return rejectUserFunc(pencaId, userId).then((response) => {
            console.log('Response reject user: ', response);
            refreshPencas();
        });
    };

    const refreshPencas = useCallback(() => {
        setLoading(true);
        getPencaUsers(companyCode, pencaId).then((response) => {
            console.log('Response of get penca users: ', response);
            const { users: usersList, usersCounter: counter } = response.data;
            setUsers(usersList);
            setUsersCounter(counter.cantidad);
        }).catch((error) => {
            console.error('Error getting penca users: ', error);
        }).finally(() => {
            setLoading(false);
        });
    }, [companyCode, pencaId]);

    useEffect(() => {
        refreshPencas();
    }, [refreshPencas]);

    return {loading, users, usersCounter, enableUser, rejectUser};
};

export default usePencaUsers;
