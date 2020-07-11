import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //fontaweresomeのインポート
import { faChevronRight,faChevronLeft } from "@fortawesome/free-solid-svg-icons";//矢印アイコン

const pmArrow = {
    fontSize:"1em",
    color:"#00aced",
    cursor: "pointer"
}

export default class DateBox extends Component{
    render(){
        if(this.props.type == "week"){
            const selectDay = this.props.select.day;
            const selectMonth = this.props.select.month;
            const selectYear = this.props.select.year;
            
            const dayString=["月","火","水","木","金","土","日"];
            
            //今日
            const today = new Date()
            //選択している日
            const selectDate = new Date(selectYear,selectMonth - 1,selectDay)
            //週の初めの日
            let sc = selectDate.getDay() ;
            if(sc === 0)sc=7;
            const startDay = selectDate.getDate() - sc + 1
            
            let weekDate = [...Array(7)].map((_, i) => new Date(selectYear,selectMonth - 1,(startDay + i)).getDate())
            let weekMonth = [...Array(7)].map((_, i) => new Date(selectYear,selectMonth,(startDay + i)).getMonth())
            
            
            
            return(
                   <div>
                        <div className="flex-align-center fa-dateContainer">
                            <div className="faIcon-arrow flex-jus-center" onClick={() => this.props.action("week",-7)}>
                                <FontAwesomeIcon style={pmArrow} icon={faChevronLeft}/>
                            </div>
                            <div className="bord-today" onClick={() => this.props.action("today",-1)}>
                                今日
                            </div>
                            <div className="faIcon-arrow flex-jus-center" onClick={() => this.props.action("week",7)}>
                                <FontAwesomeIcon style={pmArrow} icon={faChevronRight}/>
                            </div>
                            <div className="bord-month no-pad">
                                {this.props.select.year}年{selectDate.getMonth() + 1}月
                            </div>
                        </div>
                       <div className="flex-jus-between fa-dateContainer fa-endline">
                            <div className="fa-timeline"></div>
                            {weekDate.map((date,index) =>
                                <div className={today.getDate() === date && (today.getMonth() + 1) === weekMonth[index] && today.getFullYear() === selectYear ? "fa-sceduleLine fa-dateline flex-jus-center fa-date-active" : "fa-sceduleLine fa-dateline flex-jus-center"}>
                                    <div>
                                          {date}({dayString[index]})
                                    </div>
                                </div>
                            )}
                       </div>
                   </div>
            )
        }else if(this.props.type == "month"){
            return(
                   <div>
                        <div className="flex-align-center fa-dateContainer">
                            <div className="faIcon-arrow flex-jus-center" onClick={() => this.props.action("month",-1)}>
                                <FontAwesomeIcon style={pmArrow} icon={faChevronLeft}/>
                            </div>
                            <div className="bord-today" onClick={() => this.props.action("today",-1)}>
                                今日
                            </div>
                            <div className="faIcon-arrow flex-jus-center" onClick={() => this.props.action("month",1)}>
                                <FontAwesomeIcon style={pmArrow} icon={faChevronRight}/>
                            </div>
                            <div className="bord-month no-pad">
                                {this.props.data.year}年{this.props.data.month}月
                            </div>
                            
                        </div>
                       <div className="flex-jus-between fa-dateContainer fa-endline">
                            <div className="fa-sceduleLine-month fa-dateline flex-jus-center">
                                月
                            </div>
                            <div className="fa-sceduleLine-month fa-dateline flex-jus-center">
                                火
                            </div>
                           <div className="fa-sceduleLine-month fa-dateline flex-jus-center">
                               水
                           </div>
                           <div className="fa-sceduleLine-month fa-dateline flex-jus-center">
                               木
                           </div>
                           <div className="fa-sceduleLine-month fa-dateline flex-jus-center">
                               金
                           </div>
                           <div className="fa-sceduleLine-month fa-dateline flex-jus-center">
                               土
                           </div>
                            <div className="fa-sceduleLine-month fa-dateline flex-jus-center">
                                日
                            </div>
                       </div>
                   </div>
            )
        }else if(this.props.type == "semester"){
            return(
                   <div>
                        <div className="flex-align-center fa-dateContainer">
                            <div className="faIcon-arrow flex-jus-center" onClick={() => this.props.action("year",-1)}>
                                <FontAwesomeIcon style={pmArrow} icon={faChevronLeft}/>
                            </div>
                            <div className="bord-today" onClick={() => this.props.action("today",-1)}>
                                今日
                            </div>
                                <div className="faIcon-arrow flex-jus-center" onClick={() => this.props.action("year",1)}>
                                <FontAwesomeIcon style={pmArrow} icon={faChevronRight}/>
                            </div>
                            <div className="bord-month no-pad">
                                {this.props.data.year}年
                            </div>
                        </div>
                       <div className="flex-jus-between fa-dateContainer fa-endline">
                            <div className="fa-sceduleLine-semester flex-jus-center of-mon">月</div>
                            <div className="fa-sceduleLine-semester flex-jus-center">火</div>
                            <div className="fa-sceduleLine-semester flex-jus-center">水</div>
                            <div className="fa-sceduleLine-semester flex-jus-center">木</div>
                            <div className="fa-sceduleLine-semester flex-jus-center">金</div>
                            <div className="fa-sceduleLine-semester flex-jus-center">土</div>
                            <div className="fa-sceduleLine-semester flex-jus-center of-end">日</div>
                            <div className="fa-sceduleLine-semester flex-jus-center of-mon">月</div>
                            <div className="fa-sceduleLine-semester flex-jus-center">火</div>
                            <div className="fa-sceduleLine-semester flex-jus-center">水</div>
                            <div className="fa-sceduleLine-semester flex-jus-center">木</div>
                            <div className="fa-sceduleLine-semester flex-jus-center">金</div>
                            <div className="fa-sceduleLine-semester flex-jus-center">土</div>
                            <div className="fa-sceduleLine-semester flex-jus-center">日</div>
                       </div>
                   </div>
            )
        }
    }
}
