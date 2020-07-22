import React, { Component } from 'react';
import ScheduleManual from './scheduleManual'

export default function popup (props){
    return (
            <>
                <ScheduleManual 
                    isPopup={props.status.manual}
                    action={props.action}
                />
            </>
            );
     
}
