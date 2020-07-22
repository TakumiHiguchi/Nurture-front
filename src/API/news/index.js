import React from 'react';
import axios from 'axios';

export default function index(endpoint){
    //ユーザーのスケジュールを取得する部分
    return axios.get(endpoint + '/api/v1/news')
        .then(response => {
            if(response.data.status == "SUCCESS"){
                return response.data
            }else{
                return null
            }
        })
        .catch(() => {
            return null
        });
}
