import React from 'react';
import axios from 'axios';

export default async function destory(endpoint, key, session, exam_id, grade, cal_id){
    const r1 = await api(endpoint, key, session, exam_id, grade, cal_id);//スケジュールを消す
    return r1
}

async function api(endpoint, key, session, exam_id, grade, cal_id){
    try{
        const response = await axios.delete(endpoint + '/api/v1/exam?calendarId=' + cal_id + '&key=' + key + '&session=' + session +'&exam_id=' + exam_id);
        if(response.data.status == "SUCCESS"){
            return {status:1,mes:response.data.mes};
        }else{
            return {status:2,mes:response.data.mes};
        }
    }catch(e){
        return {status:2,mes:"通信に失敗しました"}
    }
}
