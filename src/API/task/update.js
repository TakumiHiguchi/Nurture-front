import React from 'react';
import axios from 'axios';


export default async function update(endpoint, key, session, id, task, grade){
    const r1 = await api(endpoint, key, session, id, task, grade);
    return r1
}

async function api(endpoint, key, session, id, task, grade){
    try{
        const response = await axios.patch(endpoint + '/api/v1/task?calendarId=' + task.calendarId + '&key=' + key + '&session=' + session +'&task_id=' + id +'&title=' + task.title +'&content=' + task.content +'&taskdate=' + task.date +'&position=' + task.position +'&complete=' + task.complete);
        
        if(response.data.status == "SUCCESS"){
            return {status:1,mes:response.data.mes};
        }else{
            return {status:2,mes:response.data.mes};
        }
        
    }catch(e){
        return {status:2,mes:"通信に失敗しました"}
    }
}
