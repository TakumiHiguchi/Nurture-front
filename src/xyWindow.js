import React, { Component } from 'react';


import './xyWindow.scss'
export default class xyWindow extends Component{
    constructor(props){
        super(props);
        this.state={
            page:0,
            taskOpenFlag:-1
        }
    }
    xyWindowClose(){
        this.props.action(0,0,{},0,0,0,0);
        //タスクの詳細表示のフラグを初期化
        this.setState({taskOpenFlag:-1});
    }
    handleTask(index){
        if(this.state.taskOpenFlag !== index){
            this.setState({taskOpenFlag:index});
        }else{
            this.setState({taskOpenFlag:-1});
        }
    }
    
    render(){
        
        const xyWindowMain = {
            top:this.props.value.y + "px",
            left:this.props.value.x + 40 + "px"
        }
        let value = this.props.value;
        
        //授業フラグ
        let schflag = [void 0,void 0,void 0,void 0,void 0,void 0];
        if(value.semesterNom !== -1){
            schflag = this.props.scheduleDatas[value.semesterNom].map((schedule,index) =>
                schedule.find(item => item !== 0)
            )
        }
        
        //positionを生成
        let date = new Date(value.year,value.month - 1,value.date).getDay();
        if(date === 0)date = 7;
        date -= 1
        
        
        let index = [];
        let taskData = [];
        if(value.task.length !== void 0){
            index.push(
                       <div onClick={() => this.setState({page:0})} className={this.state.page === 0 ? "aTindexactive" : null}>
                            タスク
                       </div>
                       
                       );
        }
        if(schflag[date] !== void 0){
            index.push(
                <div onClick={() => this.setState({page:1})} className={this.state.page === 1 ? "aTindexactive" : null}>
                     スケジュール
                </div>
            );
        }
        
        
        return(
               <div className="no-select">
                   <div className={this.props.value.window ? "xyw xyWindow" : "xyw_de xyWindow"} onClick={() => this.xyWindowClose()}>
                   </div>
                   <div style={xyWindowMain} className={this.props.value.window ? "xyw-inner xyWindowWrap" : "xyw_de-inner xyWindowWrap"}>
                        <div className="windowDate">{value.year}年{value.month}月{value.date}日</div>
                        <div className="flex xypageIndex">{index}</div>
                        <div className="xyWindowInner">
                            {(value.task.length !== void 0 && this.state.page == 0) &&(
                                    <div className="taskListWrap">
                                        {[...Array(value.task.length)].map((_,index) =>
                                            <div className="taskList" key={"taskWindow" + index}>
                                                <div className="tlp" onClick={() => this.handleTask(index)} key={"taskTitle" + index}>{value.task[index].title}</div>
                                                <div className={this.state.taskOpenFlag === index ? "xyTaskEf xyTaskContant" : "xyTaskEf_de xyTaskContant"}>
                                                    <div className="mainCont" dangerouslySetInnerHTML={{
                                                      __html: value.task[index].content
                                                    }}></div>
                                                    <div className="completeBtn">完了にする</div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                            )}
                            {(schflag[date] !== void 0 && this.state.page == 1) &&(
                                    <div className="taskListWrap">
                                        {this.props.scheduleDatas[value.semesterNom][date].map((schedule,index) =>
                                            <div>
                                                {schedule !== 0 &&
                                                    <div className="scheduleList">
                                                        <div className="sbu-window">{index+1}講時</div>
                                                        <div className="">{schedule.title}</div>
                                                    </div>
                                                }
                                            </div>
                                        )}
                                    </div>
                            )}
                        </div>
                    </div>
                </div>
               );
        
    }
}
