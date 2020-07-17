import React from 'react';
import axios from 'axios';

import user_schedule_index from './index'

export default async function create(endpoint, key, session, regesterElements, grade){
    const result = await Promise.all(regesterElements.map(async (data) =>{
        const res = await api(endpoint, key, session, data,grade);
        return res;
    }));
    let r1 = {status:1,mes:"授業を作成しました。"};
    //スケジュールを作る
    const r2 = await user_schedule_index(endpoint, key, session);//スケジュールを再読み込み
    return {r1,r2}
}

async function api(endpoint, key, session, regesterElements, grade){
    try{
        const response = await axios.post(endpoint + '/api/v1/setUserSchedule', {
            title: regesterElements.title,
            teacher: regesterElements.teacher,
            semester: regesterElements.semester,
            position: regesterElements.position,
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
