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
        const selectCalendarNumber = this.props.selectCalendarNumber;
        const calendar = this.props.calendar;
        
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




        //カレンダーの選択個数分ループしてタスクを成形する
        let taskCount = [...Array(12)].map(k=>[...Array(40)].map(k=>0))
        if(calendar.length > 0){
            for(var i = 0; i < selectCalendarNumber.length; i++){
                let count = 0;
                //日付のtaskを取り出す処理
                let tasks = calendar[selectCalendarNumber[i]].tasks;
                [...Array(12)].map((_,index)=>{
                    if(tasks[year] !== null && tasks[year] !== void 0 && tasks[year][index+1] !== void 0){
                        for(let i=1;i <= lastday[selectMonth-1]; i++){
                            if(tasks[year][index+1][i] !== void 0){
                                taskCount[index][i] += tasks[year][index+1][i].length
                            }
                        }
                    }
                });
            }
        }
        //カレンダーの選択個数分ループして試験を成形する
        let examCount = [...Array(12)].map(k=>[...Array(40)].map(k=>0))
        if(calendar.length > 0){
            for(var i = 0; i < selectCalendarNumber.length; i++){
                let count = 0;
                //日付のexamを取り出す処理
                let exams = calendar[selectCalendarNumber[i]].exams;
                [...Array(12)].map((_,index)=>{
                    if(exams[year] !== null && exams[year] !== void 0 && exams[year][index+1] !== void 0){
                        for(let i=1;i <= lastday[selectMonth-1]; i++){
                            if(exams[year][index+1][i] !== void 0){
                                examCount[index][i] += exams[year][index+1][i].length
                            }
                        }
                    }
                });
            }
        }
        //カレンダーの選択個数分ループして授業変更を成形する
        let cSBeforeCount = [...Array(12)].map(k=>[...Array(40)].map(k=>0))
        let cSAfterCount = [...Array(12)].map(k=>[...Array(40)].map(k=>0))
        if(calendar.length > 0){
            [...Array(12)].map((_,mon)=>{
                for(let day=1;day <= lastday[selectMonth-1]; day++){
                    for(var i = 0; i < selectCalendarNumber.length; i++){
                        //schedule取り出す処理
                        let cs_before = calendar[selectCalendarNumber[i]].change_schedules_before;
                        let cs_after = calendar[selectCalendarNumber[i]].change_schedules_after;
                        if(cs_before[year] !== null && cs_before[year] !== void 0 && cs_before[year][mon+1] !== void 0){
                            if(cs_before[year][mon+1][day] !== void 0){
                                cSBeforeCount[mon][day] += cs_before[year][mon+1][day].length;
                            }
                        }
                        if(cs_after[year] !== null && cs_after[year] !== void 0 && cs_after[year][mon+1] !== void 0){
                            if(cs_after[year][mon+1][day] !== void 0){
                                cSAfterCount[mon][day] += cs_after[year][mon+1][day].length;
                            }
                        }
                    }
                }
            });
        }

        
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
                    let bl = taskCount[i - 1][ix+1 + aFirstDay[i-1]] > 0 || examCount[i - 1][ix+1 + aFirstDay[i-1]] > 0 || cSBeforeCount[i - 1][ix+1 + aFirstDay[i-1]] + cSAfterCount[i - 1][ix+1 + aFirstDay[i-1]] > 0
                    insMainCon.push(
                                    <div className={ i % 2 == 0 ? "semestar-month-dataBox smdbColor-f" : "semestar-month-dataBox smdbColor-s"} 
                                        onClick={bl ? (e) => this.props.action.showWindow(true,e.pageX,e.pageY,year,i,ix+1+aFirstDay[i-1]) : null}
                                        key={"semesmain" + i + "/" +ix+1 + aFirstDay[i-1]}
                                    >
                                         <div className="semestar-month-date flex-jus-center">
                                            <div className="">{ix+1 + aFirstDay[i-1]}</div>
                                         </div>
                                         <div className="semestar-month-dateBody">
                                            <div className="flex-jus-center">
                                                {taskCount[i - 1][ix+1 + aFirstDay[i-1]] > 0 &&
                                                    <div className="taskBox_semester">
                                                    </div>
                                                }
                                                {examCount[i - 1][ix+1 + aFirstDay[i-1]] > 0 &&
                                                    <div className="examBox_semester">
                                                    </div>
                                                }
                                                {cSBeforeCount[i - 1][ix+1 + aFirstDay[i-1]] + cSAfterCount[i - 1][ix+1 + aFirstDay[i-1]] > 0 &&
                                                    <div className="changeBox_semester">
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

                let y = year;
                let m = i + 1
                if(m>12){
                    y++;
                    m=1;
                }
                for(let ix=0;ix<Array.from(Array(7 - cdYoubi).keys()).length;ix++){
                    let bl = taskCount[m - 1][ix+1] > 0 || examCount[m - 1][ix+1] > 0 || cSBeforeCount[m - 1][ix+1] + cSAfterCount[m - 1][ix+1] > 0
                    insSubCon.push(
                                   <div className={ i % 2 != 0 ? "semestar-month-dataBox smdbColor-f" : "semestar-month-dataBox smdbColor-s"} 
                                        onClick={bl ? (e) => this.props.action.showWindow(true,e.pageX,e.pageY,y,m,ix+1) : null}
                                        key={"semessub" + i + "/" +ix+1}
                                   >
                                        <div className="semestar-month-date flex-jus-center">
                                            <div className="">{ix+1}</div>
                                        </div>
                                        <div className="semestar-month-dateBody">
                                            <div className="flex-jus-center">
                                                {taskCount[m - 1][ix+1] > 0 &&
                                                    <div className="taskBox_semester">
                                                    </div>
                                                }
                                                {examCount[m - 1][ix+1] > 0 &&
                                                    <div className="examBox_semester">
                                                    </div>
                                                }
                                                {cSBeforeCount[m - 1][ix+1] + cSAfterCount[m - 1][ix+1] > 0 &&
                                                    <div className="changeBox_semester">
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