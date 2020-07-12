import React, { Component } from 'react';

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
                            action = {{popupshow: () => this.props.action.popupshow(),popupEdit: (ce) => this.props.action.popupEdit(ce) }}
                            element={{caCount: this.props.element.caCount[index],semesterDate: semeD}}
                            task={this.props.task} exam={this.props.exam} change_schedules={this.props.change_schedules}
                            date={{year:selectYear,month:selectMonth,day:startDay+index}}
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
    
    
    //task関係処理
    let tasks = props.task;
    let taskCount = 0;
    let task = {};
    if(tasks[year] !== void 0 && tasks[year][mon] !== void 0){
        if(tasks[year][mon][day] !== void 0){
            taskCount = tasks[year][mon][day].length;
            task = tasks[year][mon][day]
        }
    }
    
    //exam関係処理
    let exams = props.exam;
    let examCount = 0;
    let exam = {};
    if(exams[year] !== void 0 && exams[year][mon] !== void 0){
        if(exams[year][mon][day] !== void 0){
            examCount = exams[year][mon][day].length;
            exam = exams[year][mon][day];
        }
    }
    
    let scCount = props.daySchedule.map((data,index) => data !== 0);//スケジュールがあるかどうかの判定
    let sCount = new Array(6).fill(0);
    for(let iv=0;iv<scCount.length;iv++)if(scCount[iv])sCount[iv] += 2;
    
    //タスク成形
    let tCount = new Array(6).fill(0);
    let taskData = [[],[],[],[],[],[]]
    for(let iv=0;iv<taskCount;iv++){
        tCount[parseInt(task[iv].position)]++;
        taskData[parseInt(task[iv].position)].push(task[iv]);
    }
    console.log(taskData);
    //examの個数カウント
    let eCount = new Array(6).fill(0);
    let examData = [[],[],[],[],[],[]]
    for(let iv=0;iv<examCount;iv++){
        eCount[parseInt(exam[iv].position)]++;
        examData[parseInt(exam[iv].position)].push(exam[iv]);
    }
    
    
    
    
       return(
           <div className="fa-sceduleLine">
              {props.daySchedule.map((data,index) =>
                <div className="flex-jus-center fa-class-sceduleContainer" key={"ds" + data +index }>
                    <div className="fa-class-scedule" onClick={data === 0 ? () => props.action.popupshow() : () => props.action.popupEdit(data.position)}>
                        {data !== 0 &&
                            <div className="weekScheduleBox">
                                <div>{data.title}</div>
                                <div className="classroom">107教室</div>
                            </div>
                        }
                        {examCount > 0 &&
                            <div className="examListWrap">
                                {examData[index].map((examData,i) =>
                                        <>
                                            {(i < (4 - sCount[index]))&&
                                                <div className="weekExamBox">{examData.title}</div>
                                            }
                                        </>
                                )}
                            </div>
                        }
                        {taskCount > 0 &&
                            <div className="taskListWrap">
                                {taskData[index].map((taskData,i) =>
                                        <>
                                            {(i < (4 - sCount[index] - eCount[index]))&&
                                                <div className="weekTaskBox">{taskData.title}</div>
                                            }
                                        </>
                                )}
                            </div>
                        }
                        {tCount[index] + eCount[index] > (4 - sCount[index]) &&
                            <div className="weekMoreBox">他{tCount[index] + eCount[index] - (4 - sCount[index])}件</div>
                        }
                    </div>
                </div>
            )}
           </div>
            
       )
   }
