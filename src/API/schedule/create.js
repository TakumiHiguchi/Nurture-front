import React from 'react';
import axios from 'axios';


export default async function create(endpoint, key, session, schedule, grade){
    const r1 = await api(endpoint, key, session, schedule, grade);
    return r1
}

async function api(endpoint, key, session, schedule, grade){
    try{
        const response = await axios.post(endpoint + '/api/v1/schedule', {
            key: key,
            session: session,
            title: schedule.title,
            number:schedule.number,
            teacher:schedule.teacher,
            position:schedule.position,
            grade:schedule.grade,
            semester:schedule.semester,
            status:schedule.status,
            user_grade:grade
        });
        
        if(response.data.status == "SUCCESS"){
            return {status:1,mes:response.data.mes};
        }else{
            return {status:2,mes:response.data.mes};
        }
        
    }catch(e){
        return {status:2,mes:"通信に失敗しました"}
    }
}
