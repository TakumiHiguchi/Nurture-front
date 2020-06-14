import React, { Component } from 'react';
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker"

export default class MonthLine extends Component {
    constructor(props){
        super(props);
    }
    render(){
        let si = 100 / 5
        const pmIcons = {
            height: si+"%",
            width:"100%",
            fontSize:"1.2em",
            margin:"0 10",
            color:"#00aced",
            cursor: "pointer"
        }
        return(
               <div style={pmIcons} className="flex-jus-center">
                   <div className="month-dataBox">
                        <div className="month-date flex-jus-center">
                            1
                        </div>
                        <div className="month-dateBody">
                            
                        </div>
                   </div>
                   <div className="month-dataBox">
                        <div className="month-date flex-jus-center">
                            2
                        </div>
                        <div className="month-dateBody">
                            
                        </div>
                   </div>
                   <div className="month-dataBox">
                        <div className="month-date flex-jus-center">
                            3
                        </div>
                        <div className="month-dateBody">
                            
                        </div>
                   </div>
                   <div className="month-dataBox">
                        <div className="month-date flex-jus-center">
                            4
                        </div>
                        <div className="month-dateBody">
                            
                        </div>
                   </div>
                   <div className="month-dataBox">
                        <div className="month-date flex-jus-center">
                            5
                        </div>
                        <div className="month-dateBody">
                            
                        </div>
                   </div>
                   <div className="month-dataBox">
                        <div className="month-date flex-jus-center">
                            6
                        </div>
                        <div className="month-dateBody">
                            
                        </div>
                   </div>
                   <div className="month-dataBox">
                        <div className="month-date flex-jus-center">
                            7
                        </div>
                        <div className="month-dateBody">
                            
                        </div>
                   </div>
               </div>
        )
    }
}
