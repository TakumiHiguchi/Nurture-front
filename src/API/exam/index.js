import React from 'react';
import axios from 'axios';

export default function index(endpoint, key, session){
    //ユーザーのスケジュールを取得する部分
    return axios.get(endpoint + '/api/v1/exam?key='+ key +'&session='+ session)
        .then(response => {
            return response.data
        })
        .catch(() => {
            return null
        });
}
