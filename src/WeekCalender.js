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
        const startDay = selectDate.getDate() - selectDate.getDay() + 1
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
                                                 
                       />
                       
                   )}
               </div>
               );
    }
}
const WeekLine = (props) => {
       return(
           <div className="fa-sceduleLine">
              {props.daySchedule.map((data,index) =>
                <div key={"ds" + data +index }>
                    <div className="fa-BT-scedule"></div>
                    <div className="flex-jus-center fa-class-sceduleContainer">
                        {data == 0 ?
                            <div className="fa-class-scedule flex-jus-center" onClick={() => props.action.popupshow() }>
                            <div className="status"></div>
                            </div>
                        :
                            <div className="fa-class-scedule" onClick={() => props.action.popupEdit(data.position)} >
                                <div>
                                    <div>{data.title}</div>
                                    <div className="classroom">107教室</div>
                                    <div className="status">出席:{props.element.caCount[index][0]} 遅刻:{props.element.caCount[index][1]} 欠席:{props.element.caCount[index][2]}</div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            )}
           </div>
            
       )
   }
