import React from 'react';
import axios from 'axios';

export default function search(endpoint, args){
    //ユーザーのスケジュールを取得する部分
    return axios.get(endpoint + '/api/v1/calendar_search?type=' + args[0])
        .then(response => {
            return response.data
        })
        .catch(() => {
            return null
        });
}
