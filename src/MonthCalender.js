import React, { Component } from 'react';
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker"

import './monthCalender.scss';

export default class MonthLine extends Component {
    constructor(props){
        super(props);
    }
    render(){
        
        //日付と時間の設定
        const now = new Date();
        const year = this.props.data.year
        const mon = this.props.data.month;
        const day = now.getDate();
        const youbi = now.getDay();
        
        const lastday = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
        //閏年加算
        if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {lastday[1]++;}
        
        //１日の曜日取得
        const firstYoubi = new Date(year+"/"+mon+"/1").getDay();
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
        const lastYoubi = new Date(year+"/"+mon+"/"+lastday[mon-1]).getDay();
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

        
        const itemsFir = [];
        itemsFir.push(fOf);
        for (let i = 1; i <= lastday[mon - 1]; i++) {
            itemsFir.push(
                <div className="month-dataBox">
                    <div className="">
                         <div className={now.getDate() == i && mon == (now.getMonth() + 1) && year == now.getFullYear() ? "month-date flex-jus-center month-select" : "month-date flex-jus-center"}>
                             {i}
                          
                         </div>
                         <div className="month-dateBody">
                             
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
