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
        
        
        const itemsFir = [];
        for (let i = calendar_month; i <= 6; i++) {
          itemsFir.push(
            <div className="flex fr-mix">
                <div className="showMonth flex-jus-center">{i}月</div>
                <div className="showdate flex">
                    {i != 1 ? null : fOf}
                    {Array.from(Array(lastday[i-1] - aFirstDay[i-1]).keys()).map((data,index) =>
                        <div className={ i % 2 == 0 ? "semestar-month-dataBox smdbColor-f" : "semestar-month-dataBox smdbColor-s"}>
                             <div className="semestar-month-date flex-jus-center">
                                {index+1 + aFirstDay[i-1]}
                             </div>
                             <div className="semestar-month-dateBody flex-jus-center">
                                 授業
                             </div>
                        </div>
                    )}
                        {Array.from(Array(7 - (new Date(year+("/"+i+"/"+lastday[i-1])).getDay()==0 ? 7 : new Date(year+("/"+i+"/"+lastday[i-1])).getDay())).keys()).map((data,index) =>
                        
                        <div className={ i % 2 != 0 ? "semestar-month-dataBox smdbColor-f" : "semestar-month-dataBox smdbColor-s"}>
                             <div className="semestar-month-date flex-jus-center">
                                {index+1}  
                             </div>
                             <div className="semestar-month-dateBody flex-jus-center">
                                授業
                             </div>
                        </div>
                    )}
                </div>
            </div>
          )
        }
        const itemsSec  = [];
        for (let i = 7; i <= 12; i++) {
          itemsSec.push(
            <div className="flex fr-mix">
                <div className="showMonth flex-jus-center">{i}月</div>
                <div className="showdate flex">
                    {i != 1 ? null : fOf}
                    {Array.from(Array(lastday[i-1] - aFirstDay[i-1]).keys()).map((data,index) =>
                        <div className={ i % 2 == 0 ? "semestar-month-dataBox smdbColor-f" : "semestar-month-dataBox smdbColor-s"}>
                             <div className="semestar-month-date flex-jus-center">
                                {index+1 + aFirstDay[i-1]}
                             </div>
                             <div className="semestar-month-dateBody flex-jus-center">
                                 授業
                             </div>
                        </div>
                    )}
                    {Array.from(Array(7 - (new Date(year+("/"+i+"/"+lastday[i-1])).getDay())).keys()).map((data,index) =>
                        <div className={ i % 2 != 0 ? "semestar-month-dataBox smdbColor-f" : "semestar-month-dataBox smdbColor-s"}>
                             <div className="semestar-month-date flex-jus-center">
                                {index+1}
                             </div>
                             <div className="semestar-month-dateBody flex-jus-center">
                                  授業
                             </div>
                        </div>
                    )}
                </div>
            </div>
          )
        }
        
        return(
            <div className="flex">
                <div className="semestarCalenderBox">
                   {itemsFir}
                </div>
                <div className="semestarCalenderBox">
                   {itemsSec}
                </div>
            </div>
        )
    }
}
