import React from 'react';
import axios from 'axios';


export default async function create(endpoint, key, session, calendar){
    const r1 = await api(endpoint, key, session, calendar);
    return r1
}

async function api(endpoint, key, session, calendar){
    try{
        const response = await axios.post(endpoint + '/api/v1/calendar', {
            key: key,
            session: session,
            shareBool: calendar.shareBool,
            cloneBool: calendar.cloneBool,
            name: calendar.name,
            description: calendar.description
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
