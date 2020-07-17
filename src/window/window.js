import React, { Component } from 'react';
import XYWindow from './xyWindow'
import XYTaskWindow from './xyTaskWindow'
import MoreTaskWindow from './moreTaskWindow'
import XYScheduleWindow from './xyScheduleWindow'

export default function Window (props){
    return (
            <>
                <XYWindow value={props.value.xyWindow} action={props.action.xyWindow} scheduleDatas={props.scheduleDatas}/>
                <XYTaskWindow value={props.value.xyTaskWindow} action={props.action.xyTaskWindow} apiFunction={props.apiFunction}/>
                <MoreTaskWindow value={props.value.moreTaskWindow} action={{showMoreTaskWindow:props.action.moreTaskWindow,xyTaskWindow:props.action.xyTaskWindow}}/>
                <XYScheduleWindow value={props.value.xyScheduleWindow} action={props.action.xyScheduleWindow} apiFunction={props.apiFunction}/>
            </>
            );
     
}
