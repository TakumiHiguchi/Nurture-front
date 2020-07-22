import React, { Component,useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //fontaweresomeのインポート
import { faPlus } from "@fortawesome/free-solid-svg-icons";//plusアイコン

import './sidebar.scss';

export default function sidebar(props){
    const dayString=["月","火","水","木","金","土","日"];
    //今日の日付
    let d = new Date();
    let year = d.getFullYear();
    let mon = d.getMonth() + 1;
    let day = d.getDate();

    //task
    let tasks = props.task;
    let taskCount = 0;
    let task = {};
    if(tasks[year] !== void 0 && tasks[year][mon] !== void 0){
        if(tasks[year][mon][day] !== void 0){
            taskCount = tasks[year][mon][day].length;
            task = tasks[year][mon][day]
        }
    }
    let tCount = new Array(6).fill(0);
    let taskData = [[],[],[],[],[],[]]
    for(let iv=0;iv<taskCount;iv++){
        tCount[parseInt(task[iv].position)]++;
        taskData[parseInt(task[iv].position)].push(task[iv]);
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
                            {taskCount > 0 &&
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
        </aside>
    )
}