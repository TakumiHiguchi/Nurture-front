import React from 'react';
import axios from 'axios';


export default async function update(endpoint, key, session, id, exam, grade){
    const r1 = await api(endpoint, key, session, id, exam, grade);
    return r1
}

async function api(endpoint, key, session, id, exam, grade){
    try{
        const response = await axios.patch(endpoint + '/api/v1/exam?calendarId=' + exam.calendarId +'&key=' + key + '&session=' + session +'&exam_id=' + id +'&title=' + exam.title +'&content=' + exam.content +'&examdate=' + exam.date +'&position=' + exam.position +'&complete=' + exam.complete);
        
        if(response.data.status == "SUCCESS"){
            return {status:1,mes:response.data.mes};
        }else{
            return {status:2,mes:response.data.mes};
        }
        
    }catch(e){
        return {status:2,mes:"通信に失敗しました"}
    }
}
