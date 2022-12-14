import { useCallback, useEffect, useState } from 'react';

import {
    enableUser as enableUserFunc,
    rejectUser as rejectUserFunc,
    getPencaUsers,
} from '../../services/companyUsers';

const usePencaUsers = (pencaId) => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);

    const enableUser = (userId) => {
        return enableUserFunc(pencaId, userId).then((response) => {
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
        getPencaUsers(pencaId).then((response) => {
            console.log('Response of get penca users: ', response);
            setUsers(response.data);
        }).catch((error) => {
            console.error('Error getting penca users: ', error);
        }).finally(() => {
            setLoading(false);
        });
    }, [pencaId]);

    useEffect(() => {
        refreshPencas();
    }, [refreshPencas]);

    return {loading, users, enableUser, rejectUser};
};

export default usePencaUsers;
