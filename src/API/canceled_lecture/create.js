import React from 'react';
import axios from 'axios';


export default async function create(endpoint, key, session, cal_id, canceled_lecture){
    const r1 = await api(endpoint, key, session, cal_id, canceled_lecture);
    return r1
}

async function api(endpoint, key, session, cal_id, canceled_lecture){
    try{
        const response = await axios.post(endpoint + '/api/v1/canceled_lecture', {
            key: key,
            session: session,
            calendarId:cal_id,
            grade: canceled_lecture.grade,
            date: canceled_lecture.date,
            position: canceled_lecture.position
        });
        if(response.data.status == "SUCCESS"){
            return {status:1,mes:response.data.mes};
        }else{
            return {status:2,mes:response.data.mes};
        }
        
    }catch(e){
        return {status:2,mes:"通信に失敗しました" + e}
    }
}
