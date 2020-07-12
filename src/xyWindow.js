import React, { Component } from 'react';


import './xyWindow.scss'
export default class xyWindow extends Component{
    constructor(props){
        super(props);
        this.state={
            page:-1,
            taskOpenFlag:-1,
            examOpenFlag:-1,
            size:{
                width: 0,
                height: 0
            }
        }
    }
    xyWindowClose(){
        this.props.action(0,0,0,0,0,0,{},{},{},{});
        //詳細表示のフラグを初期化
        this.setState({page:-1,taskOpenFlag:-1,examOpenFlag:-1});
    }
    handleTask(index){
        if(this.state.taskOpenFlag !== index){
            this.setState({taskOpenFlag:index});
        }else{
            this.setState({taskOpenFlag:-1});
        }
    }
    handleExam(index){
        if(this.state.examOpenFlag !== index){
            this.setState({examOpenFlag:index});
        }else{
            this.setState({examOpenFlag:-1});
        }
    }
    
    //画面の大きさを取得
    componentWillMount () {
        window.addEventListener('load', () =>{
            this.getWindowSize();
        });
        window.addEventListener('resize', () => {
            this.getWindowSize();
        });
    }
    getWindowSize(){
        let width = window.innerWidth
        let height = window.innerHeight;
        let wsize = {
            width: width,
            height: height
        }
        this.setState({size: wsize});
    }
    
    render(){
        const bl1 = this.props.value.y + 300 > this.state.size.height;
        const bl2 = this.props.value.x + 450 > this.state.size.width;
        let xyWindowMain = {};
        if(bl1 && bl2){
            xyWindowMain = {
                top:this.props.value.y - 300 + "px",
                left:this.props.value.x - 450 + "px"
            }
        }else if(bl1 && !bl2){
            xyWindowMain = {
                top:this.props.value.y - 300 + "px",
                left:this.props.value.x + 40 + "px"
            }
        }else if(!bl1 && bl2){
            xyWindowMain = {
                top:this.props.value.y + "px",
                left:this.props.value.x - 450 + "px"
            }
        }else{
            xyWindowMain = {
                top:this.props.value.y + "px",
                left:this.props.value.x + 40 + "px"
            }
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
        
        
        //初期値の時のpage
        if(schflag[date] !== void 0 || value.changeSchedule.length !== void 0)if(this.state.page == -1)this.setState({page:2});
        if(value.task.length !== void 0)if(this.state.page == -1)this.setState({page:1});
        if(value.exam.length !== void 0)if(this.state.page == -1)this.setState({page:0});
        
        
        let index = [];
        let taskData = [];
        if(value.exam.length !== void 0){
            index.push(
                       <div onClick={() => this.setState({page:0})} className={this.state.page === 0 ? "aTindexactive" : null}>
                            試験
                       </div>
                       
                       );
        }
        if(value.task.length !== void 0){
            
            index.push(
                       <div onClick={() => this.setState({page:1})} className={this.state.page === 1 ? "aTindexactive" : null}>
                            タスク
                       </div>
                       
                       );
        }
        if(schflag[date] !== void 0 || value.changeSchedule.length !== void 0){
            index.push(
                <div onClick={() => this.setState({page:2})} className={this.state.page === 2 ? "aTindexactive" : null}>
                     スケジュール
                </div>
            );
        }
        
        //授業の変更の配列を作る
        let csArray = new Array(6);
        for(let i = 0;i<value.changeSchedule.length;i++){
             csArray[value.changeSchedule[i]["after_position"]] = value.changeSchedule
        }
        //授業の変更前の配列を作る
        let csBeforeArray = new Array(6);
        for(let i = 0;i<value.csBefore.length;i++){
             csBeforeArray[parseInt(value.csBefore[i]["before_position"] % 6)] = value.csBefore
        }
        console.log("後");
        console.log(csArray);
        //表示する授業を作り、授業の変更を反映する
        let insSchedule = [];
        if(schflag[date] !== void 0){
            insSchedule = this.props.scheduleDatas[value.semesterNom][date].map((schedule,index) =>
                <div>
                    {csArray[index] !== void 0 &&
                        <div>
                            <div className="scheduleList">
                                <div className="sbu-window-c flex">{index+1}講時<div className="changeScheduleMark">授業変更</div></div>
                                <div className="">{csArray[index][0].title}</div>
                            </div>
                        </div>
                    }
                    {((schedule !== 0 && csArray[index] === void 0) && (schedule !== 0 && csBeforeArray[index] === void 0))&&
                        <div className="scheduleList">
                            <div className="sbu-window">{index+1}講時</div>
                            <div className="">{schedule.title}</div>
                        </div>
                    }
                    {(schedule !== 0 && csArray[index] !== void 0) &&
                        <div className="scheduleList">
                            <div className="sbu-window"><s>{index+1}講時</s></div>
                            <div className=""><s>{schedule.title}</s></div>
                        </div>
                    }
                    {(schedule !== 0 && csBeforeArray[index] !== void 0)&&
                        <div className="scheduleList">
                            <div className="sbu-window-c flex"><s>{index+1}講時</s><div className="changeScheduleMark">{csBeforeArray[index][0].afterDate} {csBeforeArray[index][0].after_position + 1}限目へ授業変更</div></div>
                            <div className=""><s>{schedule.title}</s></div>
                        </div>
                    }
                    
                </div>
            )
        }else{
            insSchedule = csArray.map((schedule,index) =>
                             <div>
                                 {csArray[index] !== void 0 &&
                                     <div>
                                         <div className="scheduleList">
                                             <div className="sbu-window-c flex">{index+1}講時<div className="changeScheduleMark">授業変更</div></div>
                                             <div className="">{csArray[index][0].title}</div>
                                         </div>
                                     </div>
                                 }
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
                            {(value.exam.length !== void 0 && this.state.page == 0) &&(
                                    <div className="taskListWrap">
                                        {[...Array(value.exam.length)].map((_,index) =>
                                            <div className="taskList" key={"examWindow" + index}>
                                                <div className="elp" onClick={() => this.handleExam(index)} key={"examTitle" + index}>{value.exam[index].position + 1}限: {value.exam[index].title}</div>
                                                <div className={this.state.examOpenFlag === index ? "xyTaskEf xyTaskContant" : "xyTaskEf_de xyTaskContant"}>
                                                    <div className="mainCont" dangerouslySetInnerHTML={{
                                                      __html: value.exam[index].content
                                                    }}></div>
                                                    <div className="completeBtn">完了にする</div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                            )}
                            {(value.task.length !== void 0 && this.state.page == 1) &&(
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
                            {((schflag[date] !== void 0 || value.changeSchedule.length !== void 0) && this.state.page == 2) &&(
                                    <div className="taskListWrap">
                                        
                                        {insSchedule}
                                                                                                                     
                                    </div>
                            )}
                        </div>
                    </div>
                </div>
               );
        
    }
}
