import React from 'react';
import axios from 'axios';


export default async function update(endpoint, key, session, user){
    const r1 = await api(endpoint, key, session, user);
    return r1
}

async function api(endpoint, key, session, user){
    try{
        const response = await axios.put(endpoint + '/api/v1/user/' + 0, {
            key: key,
            session: session,
            name:user.name
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
