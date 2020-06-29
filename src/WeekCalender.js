import React, { Component } from 'react';

export default class WeekCalender extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
               <div className="flex-jus-between fa-scedule-in">
               {this.props.scheduleData.map((data,index) =>
                   <WeekLine daySchedule={data} key={"weekLine"+index}
                       action = {{popupshow: () => this.props.action.popupshow(),popupEdit: (ce) => this.props.action.popupEdit(ce) }}
                       element={{caCount: this.props.element.caCount[index]}}
                                             
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
