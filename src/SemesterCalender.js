import React, { Component } from 'react';

import './semesterCalender.scss';

export default class SemesterCalender extends Component {
    constructor(props){
        super(props);
    }
    
    //日付からdateオブジェクトを作る関数
    parDate(target){
        var dateSeme = target.split('/');
        let stDate = new Date();
        if(dateSeme.length == 3){
            stDate = new Date(dateSeme[0],dateSeme[1] - 1,dateSeme[2]);
        }
        return stDate
    }
    
    render(){
        let si = 100 / 14 //1行の横の大きさ
        const dayString=["日","月","火","水","木","金","土"];
        const pmLine = {
            height: si+"%",
            width:"100%",
            fontSize:"1.2em",
            margin:"0 10",
            color:"#00aced",
            cursor: "pointer"
        }
        const semCount = Array.from(Array(7).keys());
        //日付と時間の設定
        const now = new Date();
        const year = this.props.data.year
        const mon = now.getMonth()+1;
        const day = now.getDate();
        const youbi = now.getDay();
        
        //stateを入れる
        const selectMonth = this.props.data.month;
        const selectYear = this.props.data.year;
        
        //１月１日の曜日取得
        let firstYoubi = new Date(year+"/1/1").getDay();
        if(firstYoubi===0)firstYoubi=7;
        const fOf = [];
        for (let i = 0; i < firstYoubi - 1; i++) {
            fOf.push(
                     <div className="semestar-month-dataBox" key={i+"fofContainer"}>
                          <div className="semestar-month-date flex-jus-center">
                          </div>
                          <div className="semestar-month-dateBody">
                          </div>
                     </div>
                     )
        }

        //各月最初の月の曜日取得
        const aFirstDay = []
        for (let i = 1; i <= 12; i++) {
            let dlc = new Date(year+"/"+i+"/1").getDay()
            if(i==1){
                aFirstDay.push(0);
            }else if(dlc == 0){
                aFirstDay.push(1);
            }else if(dlc == 1){
                aFirstDay.push(0);
            }else{
                aFirstDay.push(8 - new Date(year+"/"+i+"/1").getDay());
            }
        }
        const calendar_month = 1;//処理開始月
        const lastday = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
        //閏年加算
        if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {lastday[1]++;}
        
        //授業がある場合フラグを立たせる
        let schflag = this.props.scheduleData.map((data) =>
                                           data.map((schedule,index) =>
                                                    schedule.find(item => item !== 0)
                                                    )
                                           )
        //学期の期間
        let semeD = this.props.element.semesterDate
        
        //task関係処理
        let tasks = this.props.task;
        //exam関係処理
        let exams = this.props.exam;
        //授業変更関係処理
        let changeSchedulesAfter = this.props.change_schedules.after;
        let changeSchedulesBefore = this.props.change_schedules.before;
        
        
        const itemsFir = [];
        for(let k = 0; k < 2; k++) {
            let consSemes = [];
            for (let i = calendar_month + 6*k; i <= 6*(k+1); i++) {
                //メインの授業を作る
                let insMainCon = [];
                
                //初めの週の個数
                let fyoubi = new Date(selectYear,i - 1,1).getDay();
                let fparWe = fyoubi - 1;
                if(fyoubi === 0)fparWe = 6;
                fparWe = 7 - fparWe;
                
                for(let ix = 0;ix < Array.from(Array(lastday[i-1] - aFirstDay[i-1]).keys()).length;ix++){
                    //task関係処理
                    let taskCount = 0;
                    let task = {};
                    if(tasks[year] !== void 0 && tasks[year][i] !== void 0){
                        if(tasks[year][i][ix+1+aFirstDay[i-1]] !== void 0){
                            taskCount = tasks[year][i][ix+1+aFirstDay[i-1]].length;
                            task = tasks[year][i][ix+1+aFirstDay[i-1]]
                        }
                    }
                    
                    //exam関係処理
                    let examCount = 0;
                    let exam = {};
                    if(exams[year] !== void 0 && exams[year][i] !== void 0){
                        if(exams[year][i][ix+1+aFirstDay[i-1]] !== void 0){
                            examCount = exams[year][i][ix+1+aFirstDay[i-1]].length;
                            exam = exams[year][i][ix+1+aFirstDay[i-1]]
                        }
                    }
                    
                    //授業変更関係処理
                    let changeScheduleCount = 0;
                    let changeSchedule = {};
                    if(changeSchedulesAfter[year] !== void 0 && changeSchedulesAfter[year][i] !== void 0){
                        if(changeSchedulesAfter[year][i][ix+1+aFirstDay[i-1]] !== void 0){
                            changeScheduleCount = changeSchedulesAfter[year][i][ix+1+aFirstDay[i-1]].length;
                            changeSchedule = changeSchedulesAfter[year][i][ix+1+aFirstDay[i-1]]
                        }
                    }
                    
                    //授業変更元関係処理
                    let cscBefore = 0;
                    let csBefore = {};
                    if(changeSchedulesBefore[year] !== void 0 && changeSchedulesBefore[year][i] !== void 0){
                        if(changeSchedulesBefore[year][i][ix+1+aFirstDay[i-1]] !== void 0){
                            cscBefore = changeSchedulesBefore[year][i][ix+1+aFirstDay[i-1]].length;
                            csBefore = changeSchedulesBefore[year][i][ix+1+aFirstDay[i-1]]
                        }
                    }
                    
                    //曜日の処理
                    let youbi = 0;
                    if(i === 1){
                        youbi = new Date(selectYear,i - 1,ix + 1).getDay();
                    }else{
                        youbi = new Date(selectYear,i - 1,ix + 1 + fparWe).getDay();
                    }
                    
                    //スケジュール参照場所用変数の処理
                    let parWe = youbi - 1;
                    if(youbi === 0)parWe = 6;
                    
                    //条件式
                    let bool1 = this.parDate(semeD[0]) <= new Date(selectYear+"/"+i+"/"+(ix+1+aFirstDay[i-1])) && new Date(selectYear+"/"+i+"/"+(ix+1+aFirstDay[i-1])) <= this.parDate(semeD[1]);//前学期
                    let bool2 = this.parDate(semeD[2]) <= new Date(selectYear+"/"+i+"/"+(ix+1+aFirstDay[i-1])) && new Date(selectYear+"/"+i+"/"+(ix+1+aFirstDay[i-1])) <= this.parDate(semeD[3]);//後学期
                    let bool3 = schflag[0][parWe] != void 0;
                    let bool4 = schflag[1][parWe] != void 0;
                    let bool5 = (bool1 && bool3) || (bool2 && bool4) || taskCount > 0 || examCount > 0 || changeScheduleCount > 0 || cscBefore > 0
                    
                    //前学期後学期を判定
                    let semesterNom = -1;
                    if(bool1){
                        semesterNom = 0;
                    }else if(bool2){
                        semesterNom = 1;
                    }
                    
                    
                    insMainCon.push(
                                    <div className={ i % 2 == 0 ? "semestar-month-dataBox smdbColor-f" : "semestar-month-dataBox smdbColor-s"} onClick={bool5 ? (e) => this.props.action.showWindow(true,e.pageX,e.pageY,year,i,ix+1+aFirstDay[i-1],semesterNom,task,exam,changeSchedule,csBefore) : undefined} key={i + "/" + ix+1+aFirstDay[i-1] + "semesdb"}>
                                         <div className="semestar-month-date flex-jus-center">
                                            <div className={(!bool1 && !bool2) ? "dateStyles" : undefined}>{ix+1 + aFirstDay[i-1]}</div>
                                         </div>
                                         <div className="semestar-month-dateBody">
                                             {bool1 ?
                                                (bool3 ?
                                                        <div className="plans"><div>{dayString[youbi]}曜日授業</div></div>
                                                 :
                                                    null
                                                 )
                                                
                                              :
                                                (bool2 ?
                                                       (bool4 ?
                                                        <div className="plans"><div>{dayString[youbi]}曜日授業</div></div>
                                                       :
                                                              null
                                                       )
                                                   :
                                                   null
                                                )
                                             }
                                            <div className="flex-jus-center">
                                                {examCount > 0 &&
                                                   <div className="examBox_semester">
                                                   </div>
                                                }
                                                {(changeScheduleCount > 0 || cscBefore > 0) &&
                                                   <div className="changeBox_semester">
                                                   </div>
                                                }
                                                {taskCount > 0 &&
                                                    <div className="taskBox_semester">
                                                    </div>
                                                 }
                                            </div>
                                         </div>
                                    </div>
                                    );
                }
                
                //月の第一週を作る
                let insSubCon = [];
                let cdYoubi = 0;
                if(new Date(year+("/"+i+"/"+lastday[i-1])).getDay()===0){
                    cdYoubi = 7;
                }else{
                    cdYoubi = new Date(year+("/"+i+"/"+lastday[i-1])).getDay()
                }
                for(let ix=0;ix<Array.from(Array(7 - cdYoubi).keys()).length;ix++){
                    //task関係処理
                    let taskCount = 0;
                    let task = {};
                    if(tasks[year] !== void 0 && tasks[year][i+1] !== void 0){
                        if(tasks[year][i+1][ix+1] !== void 0){
                            taskCount = tasks[year][i+1][ix+1].length;
                            task = tasks[year][i+1][ix+1]
                        }
                    }
                    
                    //exam関係処理
                    let examCount = 0;
                    let exam = {};
                    if(exams[year] !== void 0 && exams[year][i+1] !== void 0){
                        if(exams[year][i+1][ix+1] !== void 0){
                            examCount = exams[year][i+1][ix+1].length;
                            exam = exams[year][i+1][ix+1]
                        }
                    }
                    
                    //授業変更関係処理
                    let changeScheduleCount = 0;
                    let changeSchedule = {};
                    if(changeSchedulesAfter[year] !== void 0 && changeSchedulesAfter[year][i+1] !== void 0){
                        if(changeSchedulesAfter[year][i+1][ix+1] !== void 0){
                            changeScheduleCount = changeSchedulesAfter[year][i+1][ix+1].length;
                            changeSchedule = changeSchedulesAfter[year][i+1][ix+1]
                        }
                    }
                    
                    //授業変更元関係処理
                    let cscBefore = 0;
                    let csBefore = {};
                    if(changeSchedulesBefore[year] !== void 0 && changeSchedulesBefore[year][i+1] !== void 0){
                        if(changeSchedulesBefore[year][i+1][ix+1] !== void 0){
                            cscBefore = changeSchedulesBefore[year][i+1][ix+1].length;
                            csBefore = changeSchedulesBefore[year][i+1][ix+1]
                        }
                    }
                    //曜日の処理
                    let youbi = new Date(selectYear,i,ix + 1).getDay();
                    
                    //スケジュール参照場所用変数の処理
                    let parWe = youbi - 1;
                    if(youbi === 0)parWe = 6;
                    
                    //条件式
                    let bool1 = this.parDate(semeD[0]) <= new Date(selectYear+"/"+(i+1)+"/"+(ix+1)) && new Date(selectYear+"/"+(i+1)+"/"+(ix+1)) <= this.parDate(semeD[1]);//前学期
                    let bool2 = this.parDate(semeD[2]) <= new Date(selectYear+"/"+(i+1)+"/"+(ix+1)) && new Date(selectYear+"/"+(i+1)+"/"+(ix+1)) <= this.parDate(semeD[3]);//後学期
                    let bool3 = schflag[0][parWe] != void 0;
                    let bool4 = schflag[1][parWe] != void 0;
                    let bool5 = (bool1 && bool3) || (bool2 && bool4) || taskCount > 0 || examCount > 0 || changeScheduleCount > 0 || cscBefore > 0
                    
                    //前学期後学期を判定
                    let semesterNom = -1;
                    if(bool1){
                        semesterNom = 0;
                    }else if(bool2){
                        semesterNom = 1;
                    }
                    
                    insSubCon.push(
                                   <div className={ i % 2 != 0 ? "semestar-month-dataBox smdbColor-f" : "semestar-month-dataBox smdbColor-s"} onClick={bool5 ? (e) => this.props.action.showWindow(e.pageX,e.pageY,year,i+1,ix+1,semesterNom,task,exam,changeSchedule,csBefore) : undefined} key={i+1 + "/" + ix+1 + "sub-semesdb"}>
                                        <div className="semestar-month-date flex-jus-center">
                                   <div className={(!bool1 && !bool2) ? "dateStyles" : undefined}>{ix+1}</div>
                                        </div>
                                        <div className="semestar-month-dateBody">
                                           {bool1 ?
                                              (bool3 ?
                                                      <div className="plans"><div>{dayString[youbi]}曜日授業</div></div>
                                               :
                                                  null
                                               )
                                              
                                            :
                                              (bool2 ?
                                                     (bool4 ?
                                                      <div className="plans"><div>{dayString[youbi]}曜日授業</div></div>
                                                     :
                                                            null
                                                     )
                                                 :
                                                 null
                                              )
                                           }
                                            <div className="flex-jus-center">
                                                {examCount > 0 &&
                                                   <div className="examBox_semester">
                                                   </div>
                                                }
                                                {(changeScheduleCount > 0 || cscBefore > 0) &&
                                                   <div className="changeBox_semester">
                                                   </div>
                                                }
                                                {taskCount > 0 &&
                                                    <div className="taskBox_semester">
                                                    </div>
                                                 }
                                            </div>
                                        </div>
                                   </div>
                                   )
                }
                consSemes.push(
                                <div className="flex fr-mix" key={i*(k+1)+"calContainer"}>
                                    <div className="showMonth flex-jus-center">{i}月</div>
                                    <div className="showdate flex">
                                        {i != 1 ? null : fOf}
                                        {insMainCon}
                                        {insSubCon}
                                    </div>
                                </div>
              )
            }
            itemsFir.push(
                          <div className="semestarCalenderBox" key={"No."+k+"mainContainer"}>
                            {consSemes}
                          </div>
                          )
        }
        
        return(
            <div className="flex">
                {itemsFir}
            </div>
        )
    }
}
