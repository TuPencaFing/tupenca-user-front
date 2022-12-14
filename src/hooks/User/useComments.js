import { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';

import { getCommentsByPencaId, saveComment } from '../../services/comments';

const useComments = (pencaId) => {
    const [loading, setLoading] = useState(false);
    const [comments, setComments] = useState([]);

    const handleSaveComment = (comment) => {
        saveComment(pencaId, comment).then((response) => {
            console.log('Response of save comment: ', response);
            refreshComments();
        }).catch((error) => {
            console.error('Error saving comment: ', error);
        });
    };

    const refreshComments = useCallback(() => {
        setLoading(true);
        getCommentsByPencaId(pencaId).then((response) => {
            console.log('Response of get comments: ', response);
            const comments = response.data.map((comment) => {
                const {
                    id,
                    pencaId,
                    message,
                    userName,
                    image,
                    creacion: creationDate,
                } = comment;

                const creationDateUY = dayjs(creationDate).subtract(3, 'hour');
                return {
                    id,
                    pencaId,
                    message,
                    userName,
                    userImage: image,
                    creationDate: creationDateUY.format('YYYY-MM-DD HH:mm:ss'),
                };
            });
            comments.sort((comment, rightComment) => new Date(rightComment.creationDate) - new Date(comment.creationDate));
            setComments(comments);
        }).catch((error) => {
            console.error('Error getting comments: ', error);
        }).finally(() => {
            setLoading(false);
        });
    }, [pencaId]);

    useEffect(() => {
        refreshComments();
    }, [refreshComments]);

    return {loading, comments, handleSaveComment};
};

export default useComments;
