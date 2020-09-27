import React from 'react';
import axios from 'axios';

import user_schedule_index from './index'

export default async function create(endpoint, key, session, regesterElements, grade, cal_id){
    const result = await Promise.all(regesterElements.map(async (data) =>{
        const res = await api(endpoint, key, session, data,grade, cal_id);
        return res;
    }));
    let count = result.filter((element) => { return element === false; }).length;
    let r1 = {status:1,mes:"授業を作成しました。"};
    if(result.includes(false)){
        r1 = {status:2,mes:count + "件の追加に失敗しました。"};
    }else{
        r1 = {status:1,mes:"授業を作成しました。"};
    }
    return r1
}


async function api(endpoint, key, session, regesterElements, grade, cal_id){
    try{
        const response = await axios.post(endpoint + '/api/v1/setUserSchedule', {
            title: regesterElements.title,
            teacher: regesterElements.teacher,
            semester: regesterElements.semester,
            position: regesterElements.position,
            calendarId: cal_id,
            grade: regesterElements.grade,
            key: key,
            session: session,
            user_grade: grade
        });
        
        if(response.data.status == "SUCCESS"){
            return true
        }else{
            return false
        }
    }catch(e){
        return false
    }
}
