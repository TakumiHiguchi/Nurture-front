import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //fontaweresomeのインポート
import { faTimes,faPlus,faTrashAlt,faEdit } from "@fortawesome/free-solid-svg-icons";
import { faLine,faTwitter } from "@fortawesome/free-brands-svg-icons";

import './xyWindow.scss'
import P0 from './page/xyWindowPage0'
import P1 from './page/xyWindowPage1'
import P2 from './page/xyWindowPage2'


class xyWindow extends Component{
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
    handleClickOutside() {
        this.props.action(false,0,0,0,0,0,0,{},{},{},{});
        //詳細表示のフラグを初期化
        this.setState({page:-1,taskOpenFlag:-1,examOpenFlag:-1});
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
    parDate(target){
        var dateSeme = target.split('/');
        let stDate = new Date();
        if(dateSeme.length == 3){
            stDate = new Date(dateSeme[0],dateSeme[1] - 1,dateSeme[2]);
        }
        return stDate
    }
    
    
    
    render(){
        ///props
        const value = this.props.value;
        const year = value.year;
        const mon = value.month;
        const day = value.date;
        const selectCalendarNumber = this.props.selectCalendarNumber;
        const calendar = this.props.calendar;    
        //表示場所を生成する
        const bl1 = this.props.value.y + 300 > this.state.size.height;
        const bl2 = this.props.value.x + 450 > this.state.size.width;
        let xyWindowMain = {};
        if(bl1 && bl2){
            xyWindowMain = {
                top:value.y - 300 + "px",
                left:value.x - 450 + "px"
            }
        }else if(bl1 && !bl2){
            xyWindowMain = {
                top:value.y - 300 + "px",
                left:value.x + 40 + "px"
            }
        }else if(!bl1 && bl2){
            xyWindowMain = {
                top:value.y + "px",
                left:value.x - 450 + "px"
            }
        }else{
            xyWindowMain = {
                top:value.y + "px",
                left:value.x + 40 + "px"
            }
        }

        //task
        //カレンダーの選択個数分ループしてタスクを成形する
        let taskData = []
        if(calendar.length > 0){
            for(var i = 0; i < selectCalendarNumber.length; i++){
                //日付のtaskを取り出す処理
                let tasks = calendar[selectCalendarNumber[i]].tasks;
                if(tasks[year] != null){
                    if(tasks[year] !== void 0 && tasks[year][mon] !== void 0 && tasks[year][mon][day] !== void 0){
                        tasks[year][mon][day].map((d)=>{
                            d.calOwner = calendar[selectCalendarNumber[i]].author_id
                            d.calUser = calendar[selectCalendarNumber[i]].user_id
                            taskData.push(d)
                        })
                    }
                }
            }
        }
        //exam
        //カレンダーの選択個数分ループしてタスクを成形する
        let examData = []
        if(calendar.length > 0){
            for(var i = 0; i < selectCalendarNumber.length; i++){
                //日付のtaskを取り出す処理
                let exams = calendar[selectCalendarNumber[i]].exams;
                if(exams[year] != null){
                    if(exams[year] !== void 0 && exams[year][mon] !== void 0 && exams[year][mon][day] !== void 0){
                        exams[year][mon][day].map((d)=>{
                            d.calOwner = calendar[selectCalendarNumber[i]].author_id
                            d.calUser = calendar[selectCalendarNumber[i]].user_id
                            examData.push(d)
                        })
                    }
                }
            }
        }

        //カレンダーの選択個数分ループしてスケジュールを成形する
        let ScheduleData = [0,0,0,0,0,0];
        if(calendar.length > 0){
            for(var i = 0; i < selectCalendarNumber.length; i++){
                let count = 0;
                //schedule取り出す処理
                let schedules = calendar[selectCalendarNumber[i]].schedules;
                let semesterPeriod = calendar[selectCalendarNumber[i]].semesterPeriod[this.props.user.grade - 1];
                let insSchedules = [];
                let nowDate = this.parDate(year + "/" + mon + "/" + day);
                let youbi = nowDate.getDay();
                if(youbi === 0)youbi = 7;
                youbi--;
                const bl1 = this.parDate(semesterPeriod.fhSemester1) <= nowDate;
                const bl2 = this.parDate(semesterPeriod.fhSemester2) >= nowDate;
                const bl3 = this.parDate(semesterPeriod.lateSemester1) <= nowDate;
                const bl4 = this.parDate(semesterPeriod.lateSemester2) >= nowDate;

                if(schedules[this.props.user.grade] !== void 0){
                    insSchedules = schedules[this.props.user.grade - 1];
                    if(bl1 && bl2){
                        for(var ix = 0; ix < 6; ix++){
                            if(ScheduleData[ix] === 0){
                                ScheduleData[ix] = insSchedules[0][youbi][ix];
                            }
                        }
                    }else if(bl3 && bl4){
                        for(var ix = 0; ix < 6; ix++){
                            if(ScheduleData[ix] === 0){
                                ScheduleData[ix] = insSchedules[1][youbi][ix];
                            }
                        }
                    }
                }
            }
        }
        //カレンダーの選択個数分ループして授業変更を成形する
        let changeScheduleData_before = [0,0,0,0,0,0];
        let changeScheduleData_after = [0,0,0,0,0,0];
        if(calendar.length > 0){
            for(var i = 0; i < selectCalendarNumber.length; i++){
                let count = 0;
                //schedule取り出す処理
                let cs_before = calendar[selectCalendarNumber[i]].change_schedules_before;
                let cs_after = calendar[selectCalendarNumber[i]].change_schedules_after;
                let insCs_before = [];
                let insCs_after = [];
                if(cs_before[year] != null){
                    if(cs_before[year] !== void 0 && cs_before[year][mon] !== void 0){
                        if(cs_before[year][mon][day] !== void 0){
                            insCs_before= cs_before[year][mon][day] ;
                        }
                    }
                }
                if(cs_after[year] != null){
                    if(cs_after[year] !== void 0 && cs_after[year][mon] !== void 0){
                        if(cs_after[year][mon][day] !== void 0){
                            insCs_after= cs_after[year][mon][day] ;
                        }
                    }
                }
                insCs_before.map((data) =>{
                    if(changeScheduleData_before[data.before_position] === 0)
                        changeScheduleData_before[data.before_position] = data;
                });
                insCs_after.map((data) =>{
                    if(changeScheduleData_after[data.after_position] === 0)
                        changeScheduleData_after[data.after_position] = data;
                });
            }
        }

        //目次を割り当てる
        let pageNom = this.state.page
        if(pageNom === -1){
            if(examData.length > 0){
                pageNom = 0;
            }else if(taskData.length > 0){
                pageNom = 1;
            }else if(ScheduleData.length > 0 || changeScheduleData_before.length > 0 || changeScheduleData_after.length > 0){
                pageNom = 2;
            }
        }

        //目次
        let index = [];
        if(examData.length > 0){
            index.push(
                <div onClick={() => this.setState({page:0})} className={pageNom === 0 ? "aTindexactive" : null}>
                    試験
                </div>
            );
        }
        if(taskData.length > 0){
            index.push(
                <div onClick={() => this.setState({page:1})} className={pageNom === 1 ? "aTindexactive" : null}>
                     タスク
                </div>
            );
        }
        if(ScheduleData.length > 0 || changeScheduleData_before.length > 0 || changeScheduleData_after.length > 0){
            index.push(
                <div onClick={() => this.setState({page:2})} className={pageNom === 2 ? "aTindexactive" : null}>
                    スケジュール
                </div>
            );
        }

        
        //page
        let page = [];
        switch(pageNom){
            case 0:page.push(
                    <P0 
                        exams={examData}
                        apiFunction={this.props.apiFunction}
                    />)
                    break;
            case 1:page.push(
                    <P1 
                        tasks={taskData}
                        apiFunction={this.props.apiFunction}
                    />)
                    break;
            case 2:page.push(
                <P2 
                    schedules={ScheduleData}
                    apiFunction={this.props.apiFunction}
                    before={changeScheduleData_before}
                    after={changeScheduleData_after}
                />)
                break;

        }
        
        return(
            <div style={xyWindowMain} className={value.window ? "xyw-inner xyWindowWrap no-select" : "xyw_de-inner xyWindowWrap"}>
                <div className="flex-jus-between xywindowTitleBox">
                    <div className="windowDate">{value.year}年{value.month}月{value.date}日</div>
                    <div className="windowIcons flex">
                        <div className="brandIcons flex">
                            <div className="line flex-jus-center"><FontAwesomeIcon icon={faLine} style={lineIcon}/></div>
                            <div className="twitter flex-jus-center"><FontAwesomeIcon icon={faTwitter} style={twitterIcon}/></div>
                        </div>
                        <div className="plus flex-jus-center"><FontAwesomeIcon icon={faPlus} style={pmcr}/></div>
                    </div>
                </div>
                <div className="flex xypageIndex">{index}</div>
                <div className="xyWindowInner">
                    {page}
                </div>
            </div>
        );
        
    }
}

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

export default onClickOutside(xyWindow)
