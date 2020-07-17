import React from 'react';
import axios from 'axios';

import user_schedule_index from './index'

export default async function destory(endpoint, key, session, schedule_id, grade){
    const r1 = await api(endpoint, key, session, schedule_id, grade);//スケジュールを消す
    return r1
}

async function api(endpoint, key, session, schedule_id, grade){
    try{
        const response = await axios.delete(endpoint + '/api/v1/user_schedule?key=' + key + '&session=' + session +'&schedule_id=' + schedule_id + '&grade=' + grade);
        if(response.data.status == "SUCCESS"){
            return {status:1,mes:response.data.mes};
        }else{
            return {status:2,mes:response.data.mes};
        }
    }catch(e){
        return {status:2,mes:"通信に失敗しました"}
    }
}
