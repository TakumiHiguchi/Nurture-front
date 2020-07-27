import React, { Component } from 'react';
import { faCommentsDollar } from '@fortawesome/free-solid-svg-icons';

export default class WeekCalender extends Component{
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
        //からの配列を生成
        const plCal = [...Array(7)].map(k=>[...Array(6)].map(k=>0));
        
        //stateを入れる
        const selectDay = this.props.select.day;
        const selectMonth = this.props.select.month;
        const selectYear = this.props.select.year;
        //学期の期間
        let semeD = this.props.element.semesterDate
        
        //選択している日
        const selectDate = new Date(selectYear+"/"+selectMonth+"/"+selectDay)
        //週の初めの日
        let sc = selectDate.getDay() ;
        if(sc === 0)sc=7;
        const startDay = selectDate.getDate() - sc + 1
        //年/月/日形式になおす
        let stringSelectDate = this.props.select.year + "/" + this.props.select.month + "/"
        
        return(
               <div className="flex-jus-between fa-scedule-in">
                   {[...Array(7)].map((_,index) =>
                        <WeekLine daySchedule={this.parDate(semeD[0]) <= new Date(selectYear+"/"+selectMonth+"/"+(startDay + index)) && new Date(selectYear+"/"+selectMonth+"/"+(startDay + index)) <= this.parDate(semeD[1]) ?
                            this.props.scheduleData[0][index]
                            :
                            (this.parDate(semeD[2]) <= new Date(selectYear+"/"+selectMonth+"/"+(startDay + index)) && new Date(selectYear+"/"+selectMonth+"/"+(startDay + index)) <= this.parDate(semeD[3]) ?
                                this.props.scheduleData[1][index]
                                :
                                plCal[index]
                             )
                            }
                            key={"weekLine"+index}
                            action = {this.props.action}
                            task={this.props.task} exam={this.props.exam} change_schedules={this.props.change_schedules}
                            date={{year:selectYear,month:selectMonth,day:startDay+index}}
                            change_schedules = {this.props.change_schedules}

                            calendar={this.props.calendar}
                            selectCalendarNumber={this.props.selectCalendarNumber}
                            user = {this.props.user}
                            index = {index}
                       />
                       
                   )}
               </div>
               );
    }
}
const WeekLine = (props) => {
    let year = props.date.year;
    let mon = props.date.month;
    let day = props.date.day;
    const selectCalendarNumber = props.selectCalendarNumber;
    const calendar = props.calendar;
    let taskData = [[],[],[],[],[],[]];
    let examData = [[],[],[],[],[],[]];
    let ScheduleData = [0,0,0,0,0,0];
    let tCount = new Array(6).fill(0);
    let eCount = new Array(6).fill(0);
    let sCount = new Array(6).fill(0);

    const parDate = (target) =>{
        var dateSeme = target.split('/');
        let stDate = new Date();
        if(dateSeme.length == 3){
            stDate = new Date(dateSeme[0],dateSeme[1] - 1,dateSeme[2]);
        }
        return stDate
    }
    
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
    //カレンダーの選択個数分ループしてexamを成形する
    if(calendar.length > 0){
        for(var i = 0; i < selectCalendarNumber.length; i++){
            let count = 0;
            //日付のexamを取り出す処理
            let exams = calendar[selectCalendarNumber[i]].exams;
            let insexam = [];
            if(exams[year] !== void 0 && exams[year][mon] !== void 0){
                if(exams[year][mon][day] !== void 0){
                    count = exams[year][mon][day].length;
                    insexam = exams[year][mon][day] ;
                }
            }
            //exam成形
            for(let iv=0;iv<count;iv++){
                eCount[parseInt(insexam[iv].position)]++;
                examData[parseInt(insexam[iv].position)].push(insexam[iv]);
            }
        }
    }
    //カレンダーの選択個数分ループしてスケジュールを成形する
    if(calendar.length > 0){
        for(var i = 0; i < selectCalendarNumber.length; i++){
            let count = 0;
            //schedule取り出す処理
            let schedules = calendar[selectCalendarNumber[i]].schedules;
            let semesterPeriod = calendar[selectCalendarNumber[i]].semesterPeriod[props.user.grade - 1];
            let insSchedules = [];
            const bl1 = parDate(semesterPeriod.fhSemester1) <= parDate(year + "/" + mon + "/" + day);
            const bl2 = parDate(semesterPeriod.fhSemester2) >= parDate(year + "/" + mon + "/" + day);
            const bl3 = parDate(semesterPeriod.lateSemester1) <= parDate(year + "/" + mon + "/" + day);
            const bl4 = parDate(semesterPeriod.lateSemester2) >= parDate(year + "/" + mon + "/" + day);

            if(schedules[props.user.grade] !== void 0){
                insSchedules = schedules[props.user.grade - 1];
                if(bl1 && bl2){
                    for(var ix = 0; ix < 6; ix++){
                        if(ScheduleData[ix] === 0){
                            ScheduleData[ix] = insSchedules[0][props.index][ix];
                        }
                    }
                }else if(bl3 && bl4){
                    for(var ix = 0; ix < 6; ix++){
                        if(ScheduleData[ix] === 0){
                            ScheduleData[ix] = insSchedules[1][props.index][ix];
                        }
                    }
                }
            }
        }
    }
    
    
    
       return(
            <div className="fa-sceduleLine">
                {ScheduleData.map((data,index) =>
                    <div className="flex-jus-center fa-class-sceduleContainer" key={"ds" + data +index }>
                        <div className="fa-class-scedule">
                            {data !== 0 ?
                                <>
                                    <div className="weekScheduleBox" onClick={(e) => props.action.xyScheduleWindow(true,e.pageX,e.pageY,props.date.year,props.date.month,props.date.day,index,data , "nomal")}>
                                        <div className="title">{data.title}</div>
                                        <div className="classroom">107教室</div>
                                    </div>
                                </>
                            :
                                <>
                                    
                                </>
                            }
                            {eCount[index] > 0 &&
                                <div className="taskListWrap">
                                    {examData[index].map((eData,i) =>
                                        <>
                                            {(i < (4 - sCount[index] - eCount[index]))&&
                                                <div className="weekExamBox" onClick={((e) => props.action.showTaskWindow(true,e.pageX,e.pageY,props.date.year,props.date.month,props.date.day,index,examData[index][i]))}>
                                                    {eData.complete ?
                                                        <><s>{eData.title}</s>（完了済み）</>
                                                    :
                                                        <>{eData.title}</>
                                                    }
                                                </div>
                                            }
                                        </>
                                    )}
                                </div>
                            }
                            {tCount[index] > 0 &&
                                <div className="taskListWrap">
                                    {taskData[index].map((tData,i) =>
                                        <>
                                            {(i < (4 - sCount[index] - eCount[index]))&&
                                                <div className="weekTaskBox" onClick={((e) => props.action.showTaskWindow(true,e.pageX,e.pageY,props.date.year,props.date.month,props.date.day,index,taskData[index][i]))}>
                                                    {tData.complete ?
                                                        <><s>{tData.title}</s>（完了済み）</>
                                                    :
                                                        <>{tData.title}</>
                                                    }
                                                </div>
                                            }
                                        </>
                                    )}
                                </div>
                            }
                        </div>
                    </div>
                )}
           </div>
            
       )
   }
