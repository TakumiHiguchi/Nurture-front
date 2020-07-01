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
        console.log(schflag)
        
        const itemsFir = [];
        itemsFir.push(fOf);
        for (let i = 1; i <= lastday[mon - 1]; i++) {
            
            //曜日の処理
            let youbi = firstYoubi
            youbi += (i - 1);
            if(youbi >= 7)youbi=youbi%7;
            
            //スケジュール参照場所用変数の処理
            let parWe = youbi - 1;
            if(youbi === 0)parWe = 6;
            
            itemsFir.push(
                <div className="month-dataBox">
                    <div className="">
                         <div className={now.getDate() == i && mon == (now.getMonth() + 1) && year == now.getFullYear() ? "month-date flex-jus-center month-select" : "month-date flex-jus-center"}>
                             {i}
                          
                         </div>
                         <div className="month-dateBody">
                             {this.parDate(semeD[0]) <= new Date(selectYear+"/"+selectMonth+"/"+i) && new Date(selectYear+"/"+selectMonth+"/"+i) <= this.parDate(semeD[1]) ?
                                (schflag[0][parWe] != void 0 ?
                                        <div className="plans"><div>{dayString[youbi]}曜日授業</div></div>
                                 :
                                        null
                                 )
                                
                                :
                                (this.parDate(semeD[2]) <= new Date(selectYear+"/"+selectMonth+"/"+i) && new Date(selectYear+"/"+selectMonth+"/"+i) <= this.parDate(semeD[3]) ?
                                       (schflag[1][parWe] != void 0 ?
                                        <div className="plans"><div>{dayString[youbi]}曜日授業</div></div>
                                       :
                                              null
                                       )
                                   :
                                   null
                                )
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
