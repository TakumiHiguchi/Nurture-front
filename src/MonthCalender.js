import React, { Component } from 'react';
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker"

import './monthCalender.scss';

export default class MonthLine extends Component {
    constructor(props){
        super(props);
        
    }
    parDate(target){
        var dateSeme = target.split('/');
        let stDate = new Date();
        if(dateSeme.length == 3){
            stDate = new Date(dateSeme[0],dateSeme[1] - 1,dateSeme[2]);
        }
        return stDate
    }
    

    render(){
        const youbiContent=["月","火","水","木","金","土","日"];
        let itemsFir=[];
        //stateを入れる
        const selectMonth = this.props.select.month;
        const selectYear = this.props.select.year;
        
        //日付と時間の設定
        const now = new Date();
        const year = this.props.select.year
        const mon = this.props.select.month;
        const selectCalendarNumber = this.props.selectCalendarNumber;
        const calendar = this.props.calendar;    
        
        const lastday = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
        //閏年加算
        if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {lastday[1]++;}
        
        //１日の曜日取得
        let firstYoubi = new Date(selectYear,selectMonth - 1,1).getDay();
        if(firstYoubi===0)firstYoubi=7;
        const fOf = [];
        for (let i = 0; i < firstYoubi - 1; i++) {
            fOf.push(
                     <div className="month-dataBox">
                          <div className="month-date flex-jus-center">
                              
                          </div>
                          <div className="month-dateBody">
                              
                          </div>
                     </div>
                     )
        }
        //月の最後の部分
        let lastYoubi = new Date(year+"/"+mon+"/"+lastday[mon-1]).getDay();
        if(lastYoubi === 0){
            lastYoubi = 7
        }
        const fEf = [];
        for (let i = 0; i < (7 - lastYoubi); i++) {
            fEf.push(
                     <div className="month-dataBox">
                          <div className="month-date flex-jus-center">
                          </div>
                          <div className="month-dateBody">
                              
                          </div>
                     </div>
                     )
        }
        itemsFir.push(fOf);
        //カレンダーの選択個数分ループしてタスクを成形する
        let taskMonthCount = new Array(40).fill(0);
        if(calendar.length > 0){
            for(var i = 0; i < selectCalendarNumber.length; i++){
                let count = 0;
                //日付のtaskを取り出す処理
                let tasks = calendar[selectCalendarNumber[i]].tasks;
                if(tasks[year] != null){
                    if(tasks[year] !== void 0 && tasks[year][mon] !== void 0){
                        for(let i=1;i <= lastday[selectMonth-1]; i++){
                            if(tasks[year][mon][i] !== void 0){
                                taskMonthCount[i] += tasks[year][mon][i].length
                            }
                        }
                    }
                }
            }
        }
        //カレンダーの選択個数分ループしてタスクを成形する
        let examMonthCount = new Array(40).fill(0);
        if(calendar.length > 0){
            for(var i = 0; i < selectCalendarNumber.length; i++){
                let count = 0;
                //日付のtaskを取り出す処理
                let exams = calendar[selectCalendarNumber[i]].exams;
                if(exams[year] !== null){
                    if(exams[year] !== void 0 && exams[year][mon] !== void 0){
                        for(let day=1;day <= lastday[selectMonth-1]; day++){
                            if(exams[year][mon][day] !== void 0){
                                examMonthCount[day] += exams[year][mon][day].length
                            }
                        }
                    }
                }
            }
        }

        //スケジュール
        let scheduleExsist = new Array(40).fill(void 0);
        if(calendar.length > 0){
            for(var day = 1; day <= lastday[selectMonth-1]; day++){
                let nowDate = this.parDate(year + "/" + mon + "/" + day);
                let youbi = nowDate.getDay();
                if(youbi === 0)youbi = 7;
                youbi--;

                for(var i = 0; i < selectCalendarNumber.length; i++){
                    //schedule取り出す処理
                    let schedules = calendar[selectCalendarNumber[i]].schedules;
                    let semesterPeriod = calendar[selectCalendarNumber[i]].semesterPeriod[this.props.user.grade - 1];
                    const bl1 = this.parDate(semesterPeriod.fhSemester1) <= nowDate;
                    const bl2 = this.parDate(semesterPeriod.fhSemester2) >= nowDate;
                    const bl3 = this.parDate(semesterPeriod.lateSemester1) <= nowDate;
                    const bl4 = this.parDate(semesterPeriod.lateSemester2) >= nowDate;
                    
        
                    if(schedules[this.props.user.grade] !== void 0){
                        if(bl1 && bl2){
                            let bl = false;
                            if(schedules[this.props.user.grade][0][youbi] !== void 0) bl = schedules[this.props.user.grade - 1][0][youbi].find(item => item !== 0)
                            if(scheduleExsist[day] === void 0){
                                scheduleExsist[day] = bl;
                            }
                        }else if(bl3 && bl4){
                            if(scheduleExsist[day] === 0){
                                let bl = false;
                                if(schedules[this.props.user.grade][1][youbi] !== void 0) bl = schedules[this.props.user.grade - 1][0][youbi].find(item => item !== 0)
                                if(scheduleExsist[day] === void 0){
                                    scheduleExsist[day] = bl;
                                }
                            }
                        }
                    }
                }
                if(scheduleExsist[day] != void 0){
                    //曜日を入れる
                    scheduleExsist[day] = youbiContent[youbi] + "曜日授業"
                }
            }
        }

        //カレンダーの選択個数分ループして授業変更を成形する
        let cSBeforeCount = new Array(40).fill(0);
        let cSAfterCount = new Array(40).fill(0);
        if(calendar.length > 0){
            for(let day=1;day <= lastday[selectMonth-1]; day++){
                for(var i = 0; i < selectCalendarNumber.length; i++){
                    //schedule取り出す処理
                    let cs_before = calendar[selectCalendarNumber[i]].change_schedules_before;
                    let cs_after = calendar[selectCalendarNumber[i]].change_schedules_after;
                    if(cs_before[year] !== null){
                        if(cs_before[year] !== void 0 && cs_before[year][mon] !== void 0){
                            if(cs_before[year][mon][day] !== void 0){
                                cSBeforeCount[day] += cs_before[year][mon][day].length;
                            }
                        }
                    }
                    if(cs_after[year] !== null){
                        if(cs_after[year] !== void 0 && cs_after[year][mon] !== void 0){
                            if(cs_after[year][mon][day] !== void 0){
                                cSAfterCount[day] += cs_after[year][mon][day].length;
                            }
                        }
                    }
                }
            }
        }
        

        [...Array(lastday[selectMonth-1])].map((_,index)=>{
            let bl = examMonthCount[index+1] !== void 0 && examMonthCount[index+1] !== 0;
            let bl1 = taskMonthCount[index+1] !== void 0 && taskMonthCount[index+1] !== 0;
            let bl2 = scheduleExsist[index + 1] !== void 0;

            itemsFir.push(
                <div className="month-dataBox"
                    key={"MonthCal"+year+"/"+mon+ "/"+index}    
                    onClick={bl || bl1 || bl2 ?
                        (e) => this.props.action.showWindow(true,e.pageX,e.pageY,year,mon,index+1)
                    :
                        null
                    }
                >
                    <div className={now.getDate() == index+1 && mon == (now.getMonth() + 1) && year == now.getFullYear() ? "month-date flex-jus-center month-select" : "month-date flex-jus-center"}>
                          {index+1}
                    </div>
                    <div className="month-dateBody">
                        {bl2 &&
                            <div className="plans"><div>{scheduleExsist[index + 1]}</div></div>
                        }
                        {bl &&
                            <div className="examBox">
                                {examMonthCount[index+1]}件の試験
                                
                            </div>
                        }
                        {bl1 &&
                            <div className="taskBox">
                                {taskMonthCount[index+1]}件のタスク
                            </div>
                        }
                        {cSBeforeCount[index+1] !== void 0 && cSBeforeCount[index+1] !== 0 &&
                            <div className="changeBox">
                                {cSBeforeCount[index+1]}件の授業変更
                            </div>
                        }
                        {cSAfterCount[index+1] !== void 0 && cSAfterCount[index+1] !== 0 &&
                            <div className="changeBox">
                                {cSAfterCount[index+1]}件の補講
                            </div>
                        }
                        
                    </div>
                </div>
            );
        })
        
        itemsFir.push(fEf);
        return(
               <div className="monthCalenderBox flex">
                    {itemsFir}
               </div>
        )
    }
}
