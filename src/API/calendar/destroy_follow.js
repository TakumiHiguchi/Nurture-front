import React from 'react';
import axios from 'axios';

export default async function follow(endpoint, key, session, id){
    const r1 = await api(endpoint, key, session, id);
    return r1
    
}

async function api(endpoint, key, session, id){
    try{
        const response = await axios.delete(endpoint + '/api/v1/calendar_destroy_follow?calendarId=' + id + '&key=' + key + '&session=' + session)
        if(response.data.status == "SUCCESS"){
            return {status:1,mes:response.data.mes};
        }else{
            return {status:2,mes:response.data.mes};
        }
    }catch(e){
        return {status:2,mes:"通信に失敗しました"}
    }
}