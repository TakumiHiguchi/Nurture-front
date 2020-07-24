import React, { Component,useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //fontaweresomeのインポート
import { faPlus } from "@fortawesome/free-solid-svg-icons";//plusアイコン

import './sidebar.scss';

export default function sidebar(props){
    const dayString=["月","火","水","木","金","土","日"];
    const calendar = props.calendar;
    const selectCalendarNumber = props.selectCalendarNumber;

    let taskData = [[],[],[],[],[],[]];
    let tCount = new Array(6).fill(0);
    
    //今日の日付
    let d = new Date();
    let year = d.getFullYear();
    let mon = d.getMonth() + 1;
    let day = d.getDate();

    //カレンダーの選択個数分ループしてタスクを成形する
    if(calendar.length > 0){
        for(var i = 0; i < selectCalendarNumber.length; i++){
            let count = 0;
            //日付のtaskを取り出す処理
            let tasks = calendar[selectCalendarNumber[i]].tasks;
            let instask = [];
            if(tasks[year] !== void 0 && tasks[year][mon] !== void 0){
                if(tasks[year][mon][day] !== void 0){
                    count = tasks[year][mon][day].length;
                    instask = tasks[year][mon][day] ;
                }
            }
            //タスク成形
            for(let iv=0;iv<count;iv++){
                tCount[parseInt(instask[iv].position)]++;
                taskData[parseInt(instask[iv].position)].push(instask[iv]);
            }
        }
    }

    //exam
    let exams = props.exam;
    let examCount = 0;
    let exam = {};
    if(exams[year] !== void 0 && exams[year][mon] !== void 0){
        if(exams[year][mon][day] !== void 0){
            examCount = exams[year][mon][day].length;
            exam = exams[year][mon][day];
        }
    }
    let eCount = new Array(6).fill(0);
    let examData = [[],[],[],[],[],[]]
    for(let iv=0;iv<examCount;iv++){
        eCount[parseInt(exam[iv].position)]++;
        examData[parseInt(exam[iv].position)].push(exam[iv]);
    }

    return(
        <aside className="fa-sideContainer">
             <div className="buttonBox" onClick={() => props.action.PopupToggle("addTask")}>
                <div>
                    <FontAwesomeIcon icon={faPlus} /> 予定を追加
                </div>
             </div>
             <div className="timetable">
                 <div>今日の予定</div>
                 <div className="side-taskListWrap">
                    {examData.map((data,index) =>
                        <>
                        {examCount > 0 &&
                            <div>
                            {examData[index].map((eData,i) =>
                                <div className="weekExamBox" onClick={((e) => props.action.showTaskWindow(true,e.pageX,e.pageY,year,mon,day,index,eData)) }>
                                {eData.complete ?
                                    <><s>{eData.title}</s>（完了済み）</>
                                :
                                    <>{eData.title}</>
                                }
                                </div>
                            )}
                            </div>
                        }
                        </>
                    )}
                    {taskData.map((data,index) =>
                        <div>
                            {tCount[index] > 0 &&
                                <div>
                                    {taskData[index].map((tData,i) =>
                                        <div className="weekTaskBox" onClick={((e) => props.action.showTaskWindow(true,e.pageX,e.pageY,year,mon,day,index,tData))}>
                                            {tData.complete ?
                                                <><s>{tData.title}</s>（完了済み）</>
                                            :
                                                <>{tData.title}</>
                                            }
                                        </div>
                                    )}
                                </div>
                            }
                        </div>
                    )}

                 </div>
             </div>
             <div className="sideCalendarContainer">
                 <div style={{paddingLeft:"10px"}}>マイカレンダー</div>
                 {calendar.map((cal,index) =>
                    <div className="calendarList flex-align-center" onClick={() => props.changeSelectCalendar(index)}>
                        <div className="point flex-jus-center" style={{border:"2px solid " + cal.color}}>
                            {selectCalendarNumber.indexOf(index) !== -1 &&
                                <div style={{background:cal.color}}></div>
                            }
                        </div>
                        <div className="name scroll-x">{cal.name}</div>
                    </div>
                 )}
             </div>
             <div className="sideHelpContainer">
                 <a>利用規約</a><a>ヘルプ</a><a>プライバシー</a>
             </div>
        </aside>
    )
}