import React from 'react';
import axios from 'axios';


export default async function create(endpoint, key, session, value){
    const r1 = await api(endpoint, key, session, value);
    return r1
}

async function api(endpoint, key, session, value){
    try{
        const response = await axios.post(endpoint + '/api/v1/transfer_schedule', {
            key: key,
            session: session,
            calendarId:value.calendarId,
            beforeDate:value.beforeDate,
            afterDate:value.afterDate
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
