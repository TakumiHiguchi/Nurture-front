import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //fontaweresomeのインポート
import { faTimes,faPlus,faTrashAlt,faEdit } from "@fortawesome/free-solid-svg-icons";
import { faLine,faTwitter } from "@fortawesome/free-brands-svg-icons";

import './xyWindow.scss'
class xyTaskWindow extends Component{
    constructor(props){
        super(props);
        this.state={
            page:-1,
            size:{
                width: 0,
                height: 0
            }
        }
    }
    //画面外をクリックした時の挙動
    handleClickOutside() {
        this.props.action.xyTaskWindow(false,0,0,0,0,0,0,{},0);
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
    taskAPIfunction_update(){
        const disString = ["完了済み","未完了"]
        let value = this.props.value;
        let d_id = 0;
        let dataHash = {};
        let cont = ""
        if(value.showData != void 0){
            d_id = value.showData.id;
            dataHash = value.showData;
            dataHash.complete = !dataHash.complete;
        }
        if(dataHash.complete){
            cont = disString[0];
        }else{
            cont = disString[1];
        }
        this.props.apiFunction.task_update(d_id, dataHash ,"タスクを" + cont + "にしました");
    }
    examAPIfunction_update(){
        const disString = ["完了済み","未完了"]
        let value = this.props.value;
        let d_id = 0;
        let dataHash = {};
        let cont = ""
        if(value.showData != void 0){
            d_id = value.showData.id;
            dataHash = value.showData;
            dataHash.complete = !dataHash.complete;
        }
        if(dataHash.complete){
            cont = disString[0];
        }else{
            cont = disString[1];
        }
        this.props.apiFunction.exam_update(d_id, dataHash ,"試験を" + cont + "にしました");
    }
    
    render(){
        let value = this.props.value;
        
        const bl1 = this.props.value.y + 332 > this.state.size.height;
        const bl2 = this.props.value.x + 450 > this.state.size.width;
        let xyWindowMain = {};
        if(bl1 && bl2){
            xyWindowMain = {
                top:this.props.value.y - 332 + "px",
                left:this.props.value.x - 450 + "px"
            }
        }else if(bl1 && !bl2){
            xyWindowMain = {
                top:this.props.value.y - 332 + "px",
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
        
        
        //apiを叩く関数
        let d_id = 0;
        let apiDis = false;
        let editShowData = {}
        if(value.showData != void 0){
            d_id = value.showData.id;
            apiDis = value.showData.label == "試験"
            //editの新しい配列生成
            let insV = value.showData;
            editShowData = {calendarId: insV.calendarId, id: insV.id, complete: insV.complete, title:insV.title, content:insV.content, date:insV.date, position: insV.position};
        }
        const taskAPIfunction_delete = () => this.props.apiFunction.task_destroy(d_id, value.showData.calendarId);
        const examAPIfunction_delete = () => this.props.apiFunction.exam_destroy(d_id, value.showData.calendarId);
        
        let lab="";
        if(apiDis){
            lab = "exam";
        }else{
            lab = "task"
        }
        
        
        
        return(
               <div className="no-select">
                   <div style={xyWindowMain} className={this.props.value.window ? "xyw-inner xyWindowWrap" : "xyw_de-inner xyWindowWrap"}>
                        <div className="flex-jus-between xywindowTitleBox">
                            <div className="windowDate">{value.year}年{value.month}月{value.date}日{value.position + 1}時限</div>
                            <div className="windowIcons flex">
                                <div className="brandIcons flex">
                                    <div className="line flex-jus-center"><FontAwesomeIcon icon={faLine} style={lineIcon}/></div>
                                    <div className="twitter flex-jus-center"><FontAwesomeIcon icon={faTwitter} style={twitterIcon}/></div>
                                    <div className="twitter flex-jus-center" onClick={apiDis ? examAPIfunction_delete : taskAPIfunction_delete}><FontAwesomeIcon icon={faTrashAlt} style={pmcl}/></div>
                                </div>
                                <div className="edit flex-jus-center" onClick={() => this.props.action.editPage(true, editShowData, lab)}><FontAwesomeIcon icon={faEdit} style={pmcl}/></div>
                                <div className="plus flex-jus-center"><FontAwesomeIcon icon={faPlus} style={pmcr}/></div>
                            </div>
                        </div>
                        {value.showData != void 0 &&
                            <div className="flex windowTasktitle">
                                <div className="labelBox" style={apiDis ? labRed : labBlue}>{value.showData.label}</div>
                                {value.showData.complete ?
                                    <div className="title"><s>{value.showData.title}</s>（完了済み）</div>
                                    :
                                    <div className="title">{value.showData.title}</div>
                                }
                            </div>
                        }
                        <div className="xyWindowTaskInner">
                            {value.showData != void 0 &&
                                <div className="mainCont" dangerouslySetInnerHTML={{
                                  __html: value.showData.content
                                }}></div>
                            }
                        </div>
                        <div className="taskWindow_complete">
                            {value.showData != void 0 && value.showData.complete ?
                                    <div onClick={apiDis ? () => this.examAPIfunction_update() : () => this.taskAPIfunction_update()} className="taskWindow_completeButton">
                                        未完了にする
                                    </div>
                                :
                                    <div onClick={apiDis ? () => this.examAPIfunction_update() : () => this.taskAPIfunction_update()} className="taskWindow_completeButton">
                                        完了にする
                                    </div>
                            }
                        </div>
                    </div>
                </div>
               );
        
    }
}

export default onClickOutside(xyTaskWindow)


const labRed = {
    background:'#EF454A'
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
