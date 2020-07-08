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
        const dayString=["日","月","火","水","木","金","土"];
        //stateを入れる
        const selectDay = this.props.select.day;
        const selectMonth = this.props.select.month;
        const selectYear = this.props.select.year;
        
        //日付と時間の設定
        const now = new Date();
        const year = this.props.select.year
        const mon = this.props.select.month;
        const day = now.getDate();
        const youbi = now.getDay();
        
        const lastday = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
        //閏年加算
        if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {lastday[1]++;}
        
        //１日の曜日取得
        let firstYoubi = new Date(year+"/"+mon+"/1").getDay();
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

        //学期の期間
        let semeD = this.props.element.semesterDate
        
        //授業がある場合フラグを立たせる
        let schflag = this.props.scheduleData.map((data) =>
                                           data.map((schedule,index) =>
                                                    schedule.find(item => item !== 0)
                                                    )
                                           )
        
        const itemsFir = [];
        itemsFir.push(fOf);
        
        //task関係処理
        let tasks = this.props.task;
        
        for (let i = 1; i <= lastday[mon - 1]; i++) {
            //task関係処理
            let taskCount = 0;
            let task = {};
            if(tasks[year] !== void 0 && tasks[year][mon] !== void 0){
                if(tasks[year][mon][i] !== void 0){
                    taskCount = tasks[year][mon][i].length;
                    task = tasks[year][mon][i]
                }
            }
            
            //曜日の処理
            let youbi = firstYoubi
            youbi += (i - 1);
            if(youbi >= 7)youbi=youbi%7;
            
            //スケジュール参照場所用変数の処理
            let parWe = youbi - 1;
            if(youbi === 0)parWe = 6;
            
            //判定式
            let bool1 = this.parDate(semeD[0]) <= new Date(selectYear+"/"+selectMonth+"/"+i) && new Date(selectYear+"/"+selectMonth+"/"+i) <= this.parDate(semeD[1]);//前学期
            let bool2 = this.parDate(semeD[2]) <= new Date(selectYear+"/"+selectMonth+"/"+i) && new Date(selectYear+"/"+selectMonth+"/"+i) <= this.parDate(semeD[3]);//後学期
            let bool3 = schflag[0][parWe] != void 0;
            let bool4 = schflag[1][parWe] != void 0;
            let bool5 = (bool1 && bool3) || (bool2 && bool4) || taskCount > 0
            
            //前学期後学期を判定
            let semesterNom = -1;
            if(bool1){
                semesterNom = 0;
            }else if(bool2){
                semesterNom = 1;
            }
            
            itemsFir.push(
                <div className="month-dataBox" onClick={bool5 && ((e) => this.props.action.showWindow(e.pageX,e.pageY,task,year,mon,i,semesterNom)) } key={i + "mdb"}>
                    <div className="">
                         <div className={now.getDate() == i && mon == (now.getMonth() + 1) && year == now.getFullYear() ? "month-date flex-jus-center month-select" : "month-date flex-jus-center"}>
                             {i}
                          
                         </div>
                         <div className="month-dateBody">
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
                            {taskCount > 0 &&
                                <div className="taskBox">
                                    {taskCount}件のタスク
                                </div>
                             }
                         </div>
                    </div>
                </div>
            )
        }
        itemsFir.push(fEf);
        return(
               <div className="monthCalenderBox flex">
                    {itemsFir}
               </div>
        )
    }
}
