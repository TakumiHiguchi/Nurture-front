import React, { Component } from 'react';
import ScheduleManual from './scheduleManual'
import ScheduleRegester from './ScheduleRegester'

export default function popup (props){
    return (
            <>
                <ScheduleManual 
                    isPopup={props.status.manual}
                    action={props.action}
                    apiFunction={props.apiFunction}
                />
                <ScheduleRegester
                    isPopup={props.status.regester}
                    calendar={props.calendar}
                    sceduleDatas = {props.sceduleDatas}
                    action={props.action}
                />
            </>
            );
     
}
