import React, { Fragment } from 'react';
import { Field, Form } from 'react-final-form';
import dayjs from 'dayjs';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';

import TextFieldAdapter from '../TextFieldAdapter';
import validate from './validate';
import './styles.scss';

const Forum = ({ comments, handleSaveComment }) => {

    const formatDate = (date) => {
        return dayjs(date).format('YYYY-MM-DD HH:mm');
    };

    const formatPastTime = (date) => {
        let response;
        const today = dayjs(new Date());
        const dateDayJs = dayjs(date);
        //const dateDayJs = dayjs('2022-12-04 21:28:10');

        let diffSeconds = today.diff(dateDayJs, 'second', false);
        if (diffSeconds < 60) {
            if (diffSeconds === 0) diffSeconds = 1;
            response = `hace ${diffSeconds} segundo`;
            if (diffSeconds > 1) response += 's';
            return response;
        }

        const diffMinutes = today.diff(dateDayJs, 'minute', false);
        if (diffMinutes < 60) {
            response = `hace ${diffMinutes} minuto`;
            if (diffMinutes > 1) response += 's';
            return response;
        }

        const diffHours = today.diff(dateDayJs, 'hour', false);
        if (diffHours < 24) {
            response = `hace ${diffHours} hora`;
            if (diffHours > 1) response += 's';
            return response;
        }

        const diffDays = today.diff(dateDayJs, 'day', false);
        if (diffDays < 30) {
            response = `hace ${diffDays} día`;
            if (diffDays > 1) response += 's';
            return response;
        }

        const diffMonths = today.diff(dateDayJs, 'month', false);
        if (diffMonths < 12) {
            response = `hace ${diffMonths} mes`;
            if (diffMonths > 1) response += 'es';
            return response;
        }

        const diffYears = today.diff(dateDayJs, 'year', false);
        response = `hace ${diffYears} año`;
        if (diffYears > 1) response += 's';
        return response;
    };

    const onSubmit = async values => {
        console.log('values', values);
        const { comment } = values;
        if (comment !== null && comment.length > 0) {
            handleSaveComment(comment);
        }
    };

    return (
        <div className="penca-forum">
            <List className="comment-list">
                {comments.map((comment, key) => (
                    <Fragment key={comment.id}>
                        <ListItem
                            className="comment-item"
                            alignItems="flex-start"
                            //{comment.creacion}
                            //YYYY-MM-DD HH:mm
                            secondaryAction={
                                <Tooltip title={formatDate(comment.creationDate)}>
                                    <div>
                                        {formatPastTime(comment.creationDate)}
                                    </div>
                                </Tooltip>
                            }
                        >
                            <ListItemAvatar>
                                <Avatar
                                    src={comment.userImage ? comment.userImage : "/static/images/avatar/1.jpg"}
                                    alt={comment.userName}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={comment.userName}
                                secondary={
                                    <React.Fragment>
                                        {comment.message}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        {key < (comments.length - 1) ? (
                            <Divider variant="inset" component="li" />
                        ) : null}
                    </Fragment>
                ))}
            </List>
            <div className="penca-forum-add-comment">
                <Form
                    onSubmit={onSubmit}
                    validate={validate}
                    render={({ handleSubmit, submitting }) => (
                        <form onSubmit={handleSubmit} className="add-comment-form">
                            <Field
                                name="comment"
                                label="Nuevo comentario"
                                component={TextFieldAdapter}
                                variant="outlined"
                                multiline
                                rows={4}
                                fullWidth
                                required
                            />
                            <Button
                                type="submit"
                                className="add-comment-form-button"
                                variant="contained"
                                disabled={submitting}
                                fullWidth
                            >
                                Enviar comentario
                            </Button>
                        </form>
                    )}
                />
            </div>
        </div>
    );
};

export default Forum;
