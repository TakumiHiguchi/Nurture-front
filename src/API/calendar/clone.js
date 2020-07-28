import React from 'react';
import axios from 'axios';

export default function search(endpoint, key, session, id){
    //ユーザーのスケジュールを取得する部分
    return axios.post(endpoint + '/api/v1/calendar_clone', {
        key: key,
        session: session,
        id: id
    })
    .then(response => {
        return response.data
    })
    .catch(() => {
        return null
    });
}
