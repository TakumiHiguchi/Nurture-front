import React, { Component } from 'react';

import './semesterCalender.scss';

export default class SemesterLine extends Component {
    constructor(props){
        super(props);
    }
    render(){
        let si = 100 / 14 //1行の横の大きさ
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
        
        //１月１日の曜日取得
        const firstYoubi = new Date(year+"/1/1").getDay();
        const fOf = [];
        for (let i = 0; i < firstYoubi - 1; i++) {
            fOf.push(
                     <div className="semestar-month-dataBox">
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
            if(i==1){
                aFirstDay.push(0);
            }else if(new Date(year+"/"+i+"/1").getDay() == 0){
                aFirstDay.push(1);
            }else{
                aFirstDay.push(8 - new Date(year+"/"+i+"/1").getDay());
            }
        }
        const calendar_month = 1;//処理開始月
        const lastday = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
        //閏年加算
        if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {lastday[1]++;}
        
        
        const items = [];
        for (let i = calendar_month; i <= 12; i++) {
          items.push(
            <div className="flex-jus-center">
                <div className="showMonth">{i}月</div>
                <div className="showdate flex">
                    {i != 1 ? null : fOf}
                    {Array.from(Array(lastday[i-1] - aFirstDay[i-1]).keys()).map((data,index) =>
                        <div className={ i % 2 == 0 ? "semestar-month-dataBox smdbColor-f" : "semestar-month-dataBox smdbColor-s"}>
                             <div className="semestar-month-date flex-jus-center">
                                {index+1 + aFirstDay[i-1]}
                             </div>
                             <div className="semestar-month-dateBody">
                                 
                             </div>
                        </div>
                    )}
                    {Array.from(Array(7 - (new Date(year+("/"+i+"/"+lastday[i-1])).getDay())).keys()).map((data,index) =>
                        <div className={ i % 2 != 0 ? "semestar-month-dataBox smdbColor-f" : "semestar-month-dataBox smdbColor-s"}>
                             <div className="semestar-month-date flex-jus-center">
                                {index+1}
                             </div>
                             <div className="semestar-month-dateBody">
                                                                                                     
                             </div>
                        </div>
                    )}
                </div>
            </div>
          )
        }
        
        return(
            <div className="semestarCalenderBox">
               {items}
            </div>
        )
    }
}
