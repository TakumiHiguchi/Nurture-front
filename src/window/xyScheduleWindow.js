import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //fontaweresomeのインポート
import { faTimes,faPlus,faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faLine,faTwitter } from "@fortawesome/free-brands-svg-icons";

import DDMscheduleEdit from '../dropdownMenu/DDMscheduleEdit'
import CLP from '../popup/closedLecturePopup'
import FP from '../popup/hurikaePopup'

import './xyWindow.scss'
class xyScheduleWindow extends Component{
    constructor(props){
        super(props);
        this.state={
            page:-1,
            size:{
                width: 0,
                height: 0
            },
            popup:{
                clp:false,
                fp:false
            }
        }
    }
    //画面外をクリックした時の挙動
    handleClickOutside() {
        this.props.action(false,0,0,0,0,0,0,{},"");
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
    popup(val){
        let p = this.state.popup;
        if(val === 0){
            p.clp = !p.clp;
        }
        if(val === 1){
            p.fp = !p.fp;
        }
        
        this.setState({popup:p})
    }
    submit(type,data){
        let v = this.props.value;
        if(type=="clp"){
            this.popup(0);
            let value={
                calendarArray:{id:v.showSchedule.calendarId},
                selectSchedule:{scheduleId:v.showSchedule.scheduleId},
                changeScheduleBeforeDate:v.year+"/"+v.month+"/"+v.date,
                changeScheduleAfterDate:data.date,
                position:data.position
            }
            this.props.apiFunction.setChangeSchedule(value)
        }
        if(type=="fp"){
            this.popup(1);
            let value={
                calendarId:v.showSchedule.calendarId,
                beforeDate:v.year+"/"+v.month+"/"+v.date,
                afterDate:data,
            }
            this.props.apiFunction.transferSchedule("create",value);
        }     
    }
    cancel(type){
        if(type=="clp"){
            this.popup(0)
        }
        if(type=="fp"){
            this.popup(1)
        }            
    }
    
    render(){
        const dayString=["月","火","水","木","金","土","日"]
        let value = this.props.value;
        
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
    
        //授業変更判定
        const changeBl1 = value.type == "change"
        const transferBl = value.type == "transfer"
        
        //開講時間を生成
        let tss = "";
        let tll = 0;
        if(changeBl1){
            let day = new Date(value.year,value.month - 1,value.date).getDay();
            day --;
            if(day === -1)day = 6;
            tss = dayString[day];
            tll = value.showSchedule.after_position + 1
        }else{
            tss = dayString[parseInt(value.showSchedule.position / 6)];
            tll = value.showSchedule.position % 6 + 1
        }
        if(transferBl)tll = value.index
        return(
               <div className="no-select">
                   <CLP 
                        isPopup={this.state.popup.clp}
                        value={this.props.value}
                        action={{
                            submit:(data) => this.submit("clp",data),
                            cancel:() => this.cancel("clp"),
                        }}
                   />
                   <FP 
                        isPopup={this.state.popup.fp}
                        value={this.props.value}
                        action={{
                            submit:(data) => this.submit("fp",data),
                            cancel:() => this.cancel("fp"),
                        }}
                   />
                   <div style={xyWindowMain} className={this.props.value.window ? "xyw-inner xyWindowWrap" : "xyw_de-inner xyWindowWrap"}>
                        <div className="flex-jus-between xywindowTitleBox">
                            <div className="windowDate">{value.year}年{value.month}月{value.date}日{value.position + 1}時限</div>
                            <div className="windowIcons flex">
                                <div className="brandIcons flex">
                                    <div className="line flex-jus-center"><FontAwesomeIcon icon={faLine} style={lineIcon}/></div>
                                    <div className="twitter flex-jus-center"><FontAwesomeIcon icon={faTwitter} style={twitterIcon}/></div>
                                    <div className="twitter flex-jus-center"
                                        onClick={changeBl1 ?
                                                () => this.props.apiFunction.change_schedule_destroy(value.showSchedule.id, value.showSchedule.calendarId)
                                                :
                                                () => this.props.apiFunction.user_schedule_destory(value.showSchedule.scheduleId, value.showSchedule.calendarId)
                                                }
                                    >
                                        <FontAwesomeIcon icon={faTrashAlt} style={pmcl}/>
                                    </div>
                                </div>
                                {!changeBl1 &&
                                    <div className="plus flex-jus-center">
                                        <DDMscheduleEdit action={(val) => this.popup(val)} date={value.year +"年"+value.month+"月"+value.date+"日"}/>
                                    </div>
                                }
                            </div>
                        </div>
                        {value.showSchedule != void 0 &&
                            <div className="flex windowTasktitle">
                                {changeBl1 ?
                                    <div className="labelBox" style={labBlue}>変更</div>
                                    :
                                    <>
                                    {transferBl ?
                                    <div className="labelBox" style={labGray}>振替</div>
                                    :
                                    <div className="labelBox" style={labGray}>授業</div>
                                    }
                                    </>
                                    
                                }
                                <div className="title">{value.showSchedule.title}</div>
                            </div>
                        }
                        <div className="xyWindowTaskInner">
                            {value.showSchedule != void 0 &&
                                <div className="mainCont scWindowWrap">
                                    <div className="flex ScheduleWindowls"><div className="scWindowlsLabel">担当教員</div><div >{value.showSchedule.teacher}</div></div>
                                    <div className="flex ScheduleWindowls"><div className="scWindowlsLabel">授業番号</div><div className="scWindowlsData">{value.showSchedule.CoNum}</div></div>
                                    <div className="flex ScheduleWindowls"><div className="scWindowlsLabel">学期</div><div className="scWindowlsData">{value.showSchedule.semester}</div></div>
                                    <div className="flex ScheduleWindowls"><div className="scWindowlsLabel">開講時間</div><div className="scWindowlsData">{tss}曜日{tll}時限目</div></div>
                                    <div className="flex ScheduleWindowls"><div className="scWindowlsLabel">学年</div><div className="scWindowlsData">{value.showSchedule.grade}学年</div></div>
                                    <div className="flex ScheduleWindowls"><div className="scWindowlsLabel">分類</div><div className="scWindowlsData">{value.showSchedule.status}</div></div>
                                    <div className="flex ScheduleWindowls"><div className="scWindowlsLabel">教室</div><div className="scWindowlsData"><input type="text" placeholder="クリックして教室を登録" className="removeCss scWindowls-input"/></div></div>

                                </div>
                            }
                        </div>
                    </div>
                </div>
               );
        
    }
}

export default onClickOutside(xyScheduleWindow)

const labGray = {
    background:'#f8f8f8',
    color:'#333'
}
const labBlue = {
    background:'#00aced'
}
const pmcr = {
    fontSize:"1.2em",
    color:"rgb(170, 170, 170)"
}
const pmcl = {
    fontSize:"1.1em",
    color:"rgb(170, 170, 170)"
}
const twitterIcon = {
    fontSize:"1.2em",
    color:"#00aced",
    cursor: "pointer"
}
const lineIcon = {
    fontSize:"1.2em",
    color:"#00B900",
    cursor: "pointer"
}
