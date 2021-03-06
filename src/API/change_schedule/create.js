import React from 'react';
import axios from 'axios';

import user_schedule_index from './index'

export default async function create(endpoint, key, session, change, grade){
    const r1 = await api(endpoint, key, session, change, grade);
    return r1
}

async function api(endpoint, key, session, change, grade){
    try{
        const response = await axios.post(endpoint + '/api/v1/change_schedule', {
            key:key,
            session: session,
            calendarId:change.calendarArray.id,
            selectSchedule_id: change.selectSchedule.scheduleId,
            beforeDate:change.changeScheduleBeforeDate,
            afterDate:change.changeScheduleAfterDate,
            position:change.position - 1
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
