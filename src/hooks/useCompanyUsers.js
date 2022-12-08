import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getCompanyUsers } from '../services/pencas';

const useCompanyUsers = () => {
    const { pencaId } = useParams();
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setLoading(true);
        getCompanyUsers(pencaId).then((response) => {
            const usersResp = [];
            response.data.forEach((user) => {
                const {
                    score,
                    usuario: participantData,
                } = user;
                usersResp.push({
                    id: participantData.id,
                    userName: participantData.userName,
                    totalScore: score,
                });
            })
            setUsers(usersResp);
        }).catch((error) => {
            console.error('Error getting company users: ', error);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return {loading, users};
};

export default useCompanyUsers;
