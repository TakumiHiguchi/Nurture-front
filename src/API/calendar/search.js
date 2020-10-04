import React from 'react';
import axios from 'axios';

export default function search(endpoint, args, key ,session){
    //ユーザーのスケジュールを取得する部分
    return axios.get(endpoint + '/api/v1/calendar_search?key='+ key +'&session='+ session +'&q=' + args[1])
        .then(response => {
            return response.data
        })
        .catch(() => {
            return null
        });
}
