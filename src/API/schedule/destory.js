import React from 'react';
import axios from 'axios';

export default function destory(endpoint, key, session, schedule_id, grade){
    //タスクを取得
    let status = 0;
    let mes = ""
    axios.delete(endpoint + '/api/v1/user_schedule?key=' + key + '&session=' + session +'&schedule_id=' + schedule_id + '&grade=' + grade)
    .then(response => {
        if(response.data.status == "SUCCESS"){
            status = 1;
            mes = response.data.mes;
        }else{
            status = 2;
            mes = response.data.mes;
        }
    })
    .catch(() => {
        status = 2;
        mes = "通信に失敗しました";
    });
    return {status:status,mes:mes};
}
