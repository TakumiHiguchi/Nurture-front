import React, { Component,useState } from 'react';
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker"
import moment from 'moment'

import './setting.scss';



export default function Sidebar(props){
    const page = props.page.page
    const calendarPage = props.page.calPage
    return(
           <aside className="sidebarWrap">
                <div className={page === 1 ? 'menu flex-algin-center active' : 'menu flex-algin-center'} onClick={(page) => props.action("page",1)}>基本設定</div>
                <div className={page === 2 ? 'menu flex-algin-center active' : 'menu flex-algin-center'} onClick={(page) => props.action("page",2)}>アカウントと情報</div>
                <div className={page === 3 ? 'menu flex-algin-center active' : 'menu flex-algin-center'} onClick={(page) => props.action("page",3)}>マイカレンダーの設定</div>
                <div className={page === 3 ? "calListBox_open" : "calListBox_close"}>
                    {props.calendar.length > 0 && props.calendar.map((cal,index) =>
                        <div onClick={() => props.action("cal",index+1)} className="flex-align-center sidebarCalendarBox" style={calendarPage === index+1 ? {padding:"5px 0",margin:"5px 0",background:"#f8f8f8"} : {padding:"5px 0",margin:"5px 0"}}>
                            <div style={{
                                width:"15px",
                                height:"15px",
                                lineHeight:"31px",
                                borderRadius:"50%",
                                margin:"0 10px",
                                background:cal.color
                                }}></div>
                            <p style={{fontSize:"0.9em",padding:"6px 0 4px 0"}}>{cal.name}</p>
                        </div>
                    
                    
                    )}
                </div>
           </aside>
           
           
           
           );
    
}
//style
const calnedar={
}