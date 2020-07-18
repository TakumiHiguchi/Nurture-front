import React from 'react';
import axios from 'axios';


export default async function create(endpoint, key, session, task, grade){
    const r1 = await api(endpoint, key, session, task, grade);
    return r1
}

async function api(endpoint, key, session, task, grade){
    try{
        const response = await axios.post(endpoint + '/api/v1/task', {
            key: key,
            session: session,
            title: task.taskTitle,
            content:task.taskCont,
            taskdate:task.taskDate,
            position:task.position - 1
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
