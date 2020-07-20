import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //fontaweresomeのインポート
import { faTwitter } from "@fortawesome/free-brands-svg-icons"; //twitterアイコン
import { faGithub } from "@fortawesome/free-brands-svg-icons"; //githubアイコン
import { faLine } from "@fortawesome/free-brands-svg-icons"; //lineアイコン
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";//plusアイコン
import { faPlus } from "@fortawesome/free-solid-svg-icons";//plusアイコン
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";//minusアイコン
import { faTimes } from "@fortawesome/free-solid-svg-icons";//minusアイコン
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";//矢印アイコン
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";//矢印アイコン
import { faCog } from "@fortawesome/free-solid-svg-icons";//設定


//cssのインポート
import './header.scss';
import './mainstyle.scss';
import './sidebar.scss';
import './toppage.scss';
import './Popup.scss';

import Window from './window/window'
import EditPage from './page/edit/editPage'

import ResultWindow from './ResultWindow'
import Popup from './Popup'
import SettingPage from './SettingPage'
import WeekCalender from './WeekCalender'
import MonthCalender from './MonthCalender'
import SemesterCalender from './SemesterCalender'
import DDMbodyChange from './DDMbodyChange'
import DateBox from './DateBox'
import * as serviceWorker from './serviceWorker';

//APIを叩く関数のインポート
import user_schedule_index from './API/user_schedule/index'
import user_schedule_create from './API/user_schedule/create'
import user_schedule_destroy from './API/user_schedule/destory'

import task_index from './API/task/index'
import task_create from './API/task/create'
import task_update from './API/task/update'
import task_destroy from './API/task/destory'

import exam_index from './API/exam/index'
import exam_create from './API/exam/create'
import exam_update from './API/exam/update'
import exam_destroy from './API/exam/destory'

import change_schedule_index from './API/change_schedule/index'
import change_schedule_create from './API/change_schedule/create'
import change_schedule_destroy from './API/change_schedule/destory'

const ENDPOINT = 'http://localhost:3020'
//const ENDPOINT = 'https://nurture-api.herokuapp.com'

//css
const pmIcons = {
    fontSize:"1.2em",
    margin:"0 10",
    color:"#00aced",
    cursor: "pointer"
}
const pmArrow = {
    fontSize:"1em",
    color:"#00aced",
    cursor: "pointer"
}
const pmIconHead= {
    fontSize:"28px",
    color:"#aaa",
    margin:"0 10",
    cursor: "pointer"
}
const twitterIcon = {
    fontSize:"1.5em",
    margin:"0 15 0 0",
    color:"#00aced",
    cursor: "pointer"
}
const githubIcon = {
    fontSize:"1em",
    margin:"0 3 0 0",
    color:"#24292e",
    cursor: "pointer"
}
const lineIcon = {
    fontSize:"1.5em",
    color:"#00B900",
    cursor: "pointer"
}




const TimeBox = () => {
    return(
           <div className="fa-timeline"><div className="fa-BT-time"><div className="fab-time">9:00</div></div><div className="fa-class-time"><div className="fab-time">10:30</div></div><div className="fa-BT-time"><div className="fab-time">10:40</div></div><div className="fa-class-time"><div className="fab-time">12:10</div></div><div className="fa-BT-time"><div className="fab-time">13:00</div></div><div className="fa-class-time"><div className="fab-time">14:30</div></div><div className="fa-BT-time"><div className="fab-time">14:40</div></div><div className="fa-class-time"><div className="fab-time">16:10</div></div><div className="fa-BT-time"><div className="fab-time">16:20</div></div><div className="fa-class-time"><div className="fab-time">17:50</div></div><div className="fa-BT-time"><div className="fab-time">18:00</div></div><div className="fa-class-time"><div className="fab-time">19:30</div></div><div className="fa-BT-time"></div></div>
    )
}
const Header = (props) => {
    return(
           <header className="fa-header flex-jus-between no-select">
               <h1 className="fa-top-h1">N:urture</h1>
               <div className="header-right flex-jus-between">
                    <DDMbodyChange action={(mode) => props.action(mode)} type={1}/>
                    <FontAwesomeIcon style={pmIconHead} icon={faPlus} onClick={() => props.actionShow("regester")}/>
                    <FontAwesomeIcon style={pmIconHead} icon={faCog} onClick={() => props.actionShow("setting")}/>
                    {props.user.imageURL=="" ?
                        <div className="" onClick={() => props.actionShow("login")}>
                        </div>
                        :
                        <div className="headerIcon flex-jus-center" onClick={() => props.actionShow("login")}>
                            <img src={props.user.imageURL}/>
                        </div>
                    }
                </div>
           </header>
    )
}
class PopupClassManual extends Component{
    constructor(props){
        super(props)
        const page = 0;
    }
    render (){
        return(
               <div className={this.props.isPopup.manual ? 'popup popup_effect' : 'popup popup_effect_de'} >
                   <div className="popup_wrap" onClick={() => this.props.action.popupshow() }></div>
                   <div className="whir no-select">
                        <h2 className="add_scedule">カスタム授業の追加</h2>
                        <h3 className="manual-schedule-h3">基本情報の入力</h3>
                        <input type="text" placeholder="授業名を入力（必須）" className="removeCss formInput adSheduleInput"/>
                        <input type="text" placeholder="教師名を入力（必須）" className="removeCss formInput adSheduleInput"/>
                        <input type="text" placeholder="学年を入力（必須）" className="removeCss formInput adSheduleInput"/>
                        <h3 className="manual-schedule-h3">開講時間の入力</h3>
                        <div className="manual-schedule-sleB">
                            <select class="swal2-select">
                                <option value="" disabled="">クリックして学期を選択</option>
                                <option value="1">前学期</option>
                                <option value="2">後学期</option>
                            </select>
                            の
                            <select class="swal2-select">
                                <option value="" disabled="">クリックして曜日を選択</option>
                                <option value="Mon">月曜日</option>
                                <option value="Tue">火曜日</option>
                                <option value="Wed">水曜日</option>
                                <option value="Thu">木曜日</option>
                                <option value="Fri">金曜日</option>
                            </select>
                            の
                            <select class="swal2-select">
                                <option value="" disabled="">クリックして講時を選択</option>
                                <option value="1">1講時</option>
                                <option value="2">2講時</option>
                                <option value="3">3講時</option>
                                <option value="4">4講時</option>
                                <option value="5">5講時</option>
                                <option value="5">6講時</option>
                            </select>
                            に開講
                        </div>
                        <div className="infBox">
                           <div className="submitBox flex-jus-center">
                               <div className="btn-submit-sub fa-scedule-submit" >キャンセル</div>
                               <div className="btn-submit fa-scedule-submit">授業を追加</div>
                           </div>
                       </div>
                   </div>
               </div>
               )
    }
}


                                                                                      
        

class Nurture extends Component {
    constructor(props){
        super(props)
        
        var tbl  = [...Array(10)].map(k=>[...Array(2)].map(k=>[...Array(7)].map(k=>[...Array(6)].map(k=>0))))
        var tblc = [...Array(7)].map(k=>[...Array(6)].map(k=>[...Array(3)].map(k=>0)))
        
        var insSP = [...Array(10)].map(k=>[...Array(4)].map(k=>""))

        const now = new Date();
        this.state = {
            page:"week",
            rWindow:{isRWindow:0,type:0,mes:""},
            user:{key:"", name:"ゲスト", imageURL:"", session:"", maxAge:0, mes:"", grade:1, created_at:""},
            popup:{regester:false, manual: false, addTask:false, setting:false, login:true, editPage:false},
            select:{year: now.getFullYear(),month: now.getMonth()+1 ,day: now.getDate()},
            selectPopup:0,
            regesterIds:[],
            regesterElements:[],
            caDatas: tbl,
            caCount: tblc,
            schedules:[],
            seSchedule: {start_date:1,end_date:2},
            semesterPeriod:insSP,
            task:{},
            exam:{},
            change_schedules_after:{},
            change_schedules_before:{},
            xyWindow:{window:false,x:0,y:0,year:0,month:0,date:0,semesterNom:0,task:{},exam:{},changeSchedule:{},csBefore:{}},
            xyTaskWindow:{window:false,x:0,y:0,year:0,month:0,date:0,position:0,showData:{},dataPosition:0},
            moreTaskWindow:{window:false,x:0,y:0,year:0,month:0,date:0,position:0,showData:{}},
            xyScheduleWindow:{window:false,x:0,y:0,year:0,month:0,date:0,position:0,showSchedule:{},type:""},
            editPage:{window:false,showData:{title:''},type:""}
        }
    }


    getScheduleData(val,position){
        //スケジュール取得APIを叩く部分
        let eq = "";
        if(position > 0){
            let eq = (position - 1).toString();
        }else{
            let eq = "";
        }
        
        axios.get(ENDPOINT + '/api/v1/schedule?q=' + val + '&p=' + eq)
            .then(response => {
                var scheduleDatas = response.data.schedules
                this.setState({schedules:scheduleDatas})
            })
            .catch(() => {
                console.log('通信に失敗しました');
            });
    }

    
    setGrade(select){
        this.rWindow(true,0,"");
        //学年を設定する
        axios.post(ENDPOINT + '/api/v1/setGrade', {
            grade: select,
            key: this.state.user.key,
            session: this.state.user.session
        })
        .then(response => {
            var user = response
            var ins = this.state.user
            ins.grade = select
            this.setState({user:ins});
            this.rWindow(true,1,"学年を変更しました");
        })
        .catch(() => {
            this.rWindow(true,2,'通信に失敗しました');
        });
    }
    
    setSemesterDate(date1,date2,date3,date4,grade){
        this.rWindow(true,0,"");
        //学年ごとの期間を設定する
        axios.post(ENDPOINT + '/api/v1/setSemesterDate', {
            date1:date1,
            date2:date2,
            date3:date3,
            date4:date4,
            grade: grade,
            key: this.state.user.key,
            session: this.state.user.session
        })
        .then(response => {
            this.rWindow(true,1,"学期の期間を保存しました");
        })
        .catch(() => {
            this.rWindow(true,2,'通信に失敗しました');
        });
    }
    
    userSignin(user,sns){
        //ユーザーのログイン等処理APIを叩く部分
        if(sns == "Google"){
            var profile = user.getBasicProfile();
            var id_token = user.getAuthResponse().id_token;
            
            axios.get(ENDPOINT + '/api/v1/userLogin?token=' + id_token +'&sns=google')
            .then(response => {
                var user = response
                this.setState({user:{key:user.data.userKey,
                                    name: user.data.userName,
                                    imageURL:user.data.pictureURL,
                                    session:user.data.session,
                                    maxAge:user.data.maxAge,
                                    mes:user.data.mes,
                                    grade:user.data.grade,
                                    created_at:user.data.created_at
                }});
                
                //学期期間の取得部分
                let insDate = this.state.semesterPeriod;
                
                for(var i = 0;i < response.data.semesterPeriod.length;i++){
                    let date = response.data.semesterPeriod[i]
                    insDate[i][0] = date.fhSemester1;
                    insDate[i][1] = date.fhSemester2;
                    insDate[i][2] = date.lateSemester1;
                    insDate[i][3] = date.lateSemester2;
                }
                
                
                this.user_schedule("index",0)
                this.task("index",0);
                this.exam("index",0);
                this.change_schedule("index",0)
                
            })
            .catch(() => {
                console.log('通信に失敗しました');
            });
        }
        
    }
    logout(){
        //ログアウト
        let tbl  = [...Array(10)].map(k=>[...Array(2)].map(k=>[...Array(7)].map(k=>[...Array(6)].map(k=>0))))
        let user = this.state.user
        user.session = ""
        user.key = ""
        user.name = "ゲスト"
        user.maxAge = 0
        user.imageURL = ""
        user.created_at = ""
        this.setState({
            user:user,
            caDatas: tbl,
            task:{},
            exam:{},
            change_schedules_after:{},
            change_schedules_before:{}
        });
        this.setState({popup: {login: true,setting:false}});
    }
    
    PopupMenu() {
        this.setState({popup: {regester: !this.state.popup.regester}});
    }
    PopupManual() {
        this.setState({popup: {manual: !this.state.popup.manual}});
    }
    PopupToggle(type){
        switch (type){
            case "regester": this.setState({popup: {regester: !this.state.popup.regester}});this.getScheduleData("","");break;
            case "addTask": this.setState({popup: {addTask: !this.state.popup.addTask}});break;
            case "setting": this.setState({popup: {setting: !this.state.popup.setting}});break;
            case "login": this.setState({popup: {login: !this.state.popup.login}});break;
                
        }
    }
    rWindow(window_bool,type,cont){
        let ins = this.state.rWindow;
        if(window_bool){
            ins.isRWindow = window_bool;
        }else{
            if(ins.isRWindow !== 0){
                ins.isRWindow = window_bool;
            }
        }
        
        ins.type = type;
        ins.mes = cont;
        this.setState({rWindow:ins});
    }
    
    showWindow(bl,x,y,year,month,date,semesterNom,task,exam,changeSchedule,csBefore){
        let ins = this.state.xyWindow;
        ins.window = bl;
        ins.x = x;
        ins.y = y;
        ins.task = task;
        ins.exam = exam;
        ins.changeSchedule = changeSchedule;
        ins.csBefore = csBefore;
        ins.year = year;
        ins.month = month;
        ins.date = date;
        ins.semesterNom = semesterNom;
        this.setState({xyWindow:ins})
    }
    showTaskWindow(bl,x,y,year,month,date,position,showData,dataPosition){
        let ins = this.state.xyTaskWindow;
        ins.window = bl;
        ins.x = x;
        ins.y = y;
        ins.position = position;
        ins.showData = showData;
        ins.dataPosition = dataPosition;
        ins.year = year;
        ins.month = month;
        ins.date = date;
        this.setState({xyTaskWindow:ins})
    }
    showMoreTaskWindow(bl,x,y,year,month,date,position,showData){
        let ins = this.state.moreTaskWindow;
        ins.window = bl;
        ins.x = x;
        ins.y = y;
        ins.position = position;
        ins.showData = showData;
        ins.year = year;
        ins.month = month;
        ins.date = date;
        this.setState({moreTaskWindow:ins})
    }
    showScheduleWindow(bl,x,y,year,month,date,position,showSchedule,type){
        let ins = this.state.xyScheduleWindow;
        ins.window = bl;
        ins.x = x;
        ins.y = y;
        ins.position = position;
        ins.showSchedule = showSchedule;
        ins.year = year;
        ins.month = month;
        ins.date = date;
        ins.type = type;
        this.setState({xyScheduleWindow:ins})
    }
    showEditPage(bl, showData, type){
        let ins = this.state.editPage;
        ins.window = bl;
        ins.showData = showData;
        ins.type = type;
        this.setState({editPage:ins})
        this.closeAllWindow();
    }
    editHandleOnChange(index,e){
        let ins = this.state.editPage;
        switch (index){
            case "taskTitle" : ins.showData.title = e.target.value;break;
            case "taskCont" : ins.showData.content = e;break;
            case "taskDate" : ins.showData.date = e;break;
            case "position" : ins.showData.position = e - 1;break;
        }
        this.setState({editPage:ins});
    }
    
    
    changeSelect(type,amount){
        
        if(type == "today"){
            const now = new Date();
            this.setState({select:{year:now.getFullYear(),month:now.getMonth()+1,day:now.getDate()}});
        }else if(type == "week"){
            
            const selectDate = new Date(this.state.select.year,this.state.select.month - 1, this.state.select.day + parseInt(amount));
            let y = selectDate.getFullYear();
            let m = selectDate.getMonth() + 1;
            let d = selectDate.getDate();
            
            this.setState({select:{year:y,month:m,day:d}});
        }else if(type == "year"){
            let select = this.state.select;
            select.year += parseInt(amount);
            this.setState({select:select});
        }else if(type == "month"){
            //月セレクターの変更
            const selectDate = new Date(this.state.select.year,this.state.select.month - 1 + parseInt(amount), this.state.select.day );
            let y = selectDate.getFullYear();
            let m = selectDate.getMonth() + 1;
            
            let select = this.state.select;
            select.year = y;
            select.month = m;
            this.setState({select:select});
        }
    }
    togglePvmode(mode){
        this.setState({page: mode})
    }
    AttendanceCount(typeNo, count, position){
        //出欠カウント
        const target = this.state.caCount.slice();
        target[Math.floor(position / 6)][position % 6][typeNo] += count
        if (target[Math.floor(position / 6)][position % 6][typeNo] < 0){
            target[Math.floor(position / 6)][position % 6][typeNo] = 0
        }
        this.setState({caCount: target})
    }
                                                                                      
    RegesterId(num, regesarray) {
        //登録予定の教科の配列を作る関数
        const array = this.state.regesterIds
        const eArray = this.state.regesterElements
        if ( array.indexOf(num) >= 0){
          const newArray = array.filter(n => n !== num);
          const newEArray = eArray.filter(n => n !== regesarray);
          this.setState({regesterIds: newArray,
                         regesterElements: newEArray
                        });
        }else{
            this.setState({regesterIds: this.state.regesterIds.concat(num),
                           regesterElements: this.state.regesterElements.concat(regesarray)
                          });
        }
    }
                              
    regesSemesterDate(date,position){
        //学期期間の登録関数
        let insDate = this.state.semesterPeriod;
        insDate[position - 1] = date;
        this.setState({semesterPeriod:insDate});
        this.setSemesterDate(insDate[position - 1][0],insDate[position - 1][1],insDate[position - 1][2],insDate[position - 1][3],position)
    }
                               
    //ユーザーのスケジュールAPIを叩く部分
    user_schedule(type,id, ...args){
        const user = this.state.user;
        let ins;
                
        if(type == "destory" || type == "create" || type == "update")this.rWindow(true,0,"");
        
        switch(type){
            case "index" :
                ins = user_schedule_index(ENDPOINT, user.key, user.session);//外部関数
                ins.then(res => {
                    this.setState({caDatas:res.schedules});
                })
                .catch(() => {
                    this.rWindow(true,2,'通信に失敗しました');
                });
                break;
            case "create" :
                ins = user_schedule_create(ENDPOINT, user.key, user.session, this.state.regesterElements, user.grade);//外部関数
                ins.then(res => {
                    this.rWindow(true,res.status,res.mes);
                    this.setState({
                        regesterIds: [],
                        regesterElements: []
                    });
                    //スケジュールを再読み込み
                    this.user_schedule("index",0);
                })
                .catch(() => {
                    this.rWindow(true,2,'通信に失敗しました');
                    this.setState({
                        regesterIds: [],
                        regesterElements: []
                    });
                });
                this.PopupToggle("regester")
                break;
            case "destory" :
                ins = user_schedule_destroy(ENDPOINT, user.key, user.session, id, user.grade);//外部関数
                ins.then(res => {
                    this.rWindow(true,res.status,res.mes);
                    //スケジュールを再読み込み
                    this.user_schedule("index",0);
                    //ウィンドウを全て閉じる
                    this.closeAllWindow()
                })
                .catch(() => {
                    this.rWindow(true,2,'通信に失敗しました');
                });
                break;
        }
    }
    
    //タスクAPIを叩く部分
    task(type, id, ...args){
        const user = this.state.user;
        let ins;
                
        if(type == "destory" || type == "create" || type == "update")this.rWindow(true,0,"");
        
        switch(type){
            case "index" :
                ins = task_index(ENDPOINT, user.key, user.session);//外部関数
                ins.then(res => {
                    this.setState({task:res.tasks});
                })
                .catch(() => {
                    this.rWindow(true,2,'通信に失敗しました');
                });
                break;
            case "create" :
                ins = task_create(ENDPOINT, user.key, user.session, args[0], user.grade);//外部関数
                ins.then(res => {
                    this.rWindow(true,res.status,res.mes);
                    //タスクを再読み込み
                    this.task("index",0);
                })
                .catch(() => {
                    this.rWindow(true,2,'通信に失敗しました');
                });
                this.PopupToggle("addTask")
                break;
            case "update" :
                ins = task_update(ENDPOINT, user.key, user.session, id, args[0], user.grade);//外部関数
                ins.then(res => {
                    if(args[1] === void 0){
                        this.rWindow(true,res.status,res.mes);
                    }else{
                        this.rWindow(true,res.status,args[1]);
                    }
                    //タスクを再読み込み
                    this.task("index",0);
                })
                .catch(() => {
                    this.rWindow(true,2,'通信に失敗しました');
                });
                break;
            case "destory" :
                ins = task_destroy(ENDPOINT, user.key, user.session, id, user.grade);//外部関数
                ins.then(res => {
                    this.rWindow(true,res.status,res.mes);
                    //タスクを再読み込み
                    this.task("index",0);
                    //ウィンドウを全て閉じる
                    this.closeAllWindow()
                })
                .catch(() => {
                    this.rWindow(true,2,'通信に失敗しました');
                });
                break;
        }
    }
                              
    //試験APIを叩く部分
    exam(type,id, ...args){
        const user = this.state.user;
        let ins;
                
        if(type == "destory" || type == "create" || type == "update")this.rWindow(true,0,"");
        
        switch(type){
            case "index" :
                ins = exam_index(ENDPOINT, user.key, user.session);//外部関数
                ins.then(res => {
                    this.setState({exam:res.exams});
                })
                .catch(() => {
                    this.rWindow(true,2,'通信に失敗しました');
                });
                break;
            case "create" :
                ins = exam_create(ENDPOINT, user.key, user.session, args[0], user.grade);//外部関数
                ins.then(res => {
                    this.rWindow(true,res.status,res.mes);
                    //タスクを再読み込み
                    this.exam("index",0);
                })
                .catch(() => {
                    this.rWindow(true,2,'通信に失敗しました');
                });
                this.PopupToggle("addTask")
                break;
            case "update" :
                ins = exam_update(ENDPOINT, user.key, user.session, id, args[0], user.grade);//外部関数
                ins.then(res => {
                    if(args[1] === void 0){
                        this.rWindow(true,res.status,res.mes);
                    }else{
                        this.rWindow(true,res.status,args[1]);
                    }
                    //試験を再読み込み
                    this.exam("index",0);
                })
                .catch(() => {
                    this.rWindow(true,2,'通信に失敗しました');
                });
                break;
            case "destory" :
                ins = exam_destroy(ENDPOINT, user.key, user.session, id, user.grade);//外部関数
                ins.then(res => {
                    this.rWindow(true,res.status,res.mes);
                    //試験を再読み込み
                    this.exam("index",0);
                    //ウィンドウを全て閉じる
                    this.closeAllWindow()
                })
                .catch(() => {
                    this.rWindow(true,2,'通信に失敗しました');
                });
                break;
        }
    }
    //授業変更APIを叩く部分
    change_schedule(type,id, ...args){
        const user = this.state.user;
        let ins;
                
        if(type == "destory" || type == "create" || type == "update")this.rWindow(true,0,"");
        
        switch(type){
            case "index" :
                ins = change_schedule_index(ENDPOINT, user.key, user.session);//外部関数
                ins.then(res => {
                    this.setState({change_schedules_after:res.change_schedules_after,change_schedules_before:res.change_schedules_before})
                })
                .catch(() => {
                    this.rWindow(true,2,'通信に失敗しました');
                });
                break;
            case "create" :
                ins = change_schedule_create(ENDPOINT, user.key, user.session, args[0], user.grade);//外部関数
                ins.then(res => {
                    this.rWindow(true,res.status,res.mes);
                    //スケジュールを再読み込み
                    this.change_schedule("index",0);
                })
                .catch(() => {
                    this.rWindow(true,2,'通信に失敗しました');
                });
                this.PopupToggle("addTask")
                break;
            case "destory" :
                ins = change_schedule_destroy(ENDPOINT, user.key, user.session, id, user.grade);//外部関数
                ins.then(res => {
                    this.rWindow(true,res.status,res.mes);
                    //スケジュールを再読み込み
                    this.change_schedule("index",0);
                    //ウィンドウを全て閉じる
                    this.closeAllWindow()
                })
                .catch(() => {
                    this.rWindow(true,2,'通信に失敗しました');
                });
                break;
        }
    }
                              
    //すべてのwindowを閉じる
    closeAllWindow(){
        this.showWindow(false,0,0,0,0,0,0,{},{},{},{});
        this.showTaskWindow(false,0,0,0,0,0,0,{},0);
        this.showMoreTaskWindow(false,0,0,0,0,0,0,{});
        this.showScheduleWindow(false,0,0,0,0,0,0,{});
    }
                               
    render(){
                
        return(
               <div>
                    <Window
                        value={{xyWindow: this.state.xyWindow,xyTaskWindow: this.state.xyTaskWindow,moreTaskWindow:this.state.moreTaskWindow,xyScheduleWindow:this.state.xyScheduleWindow}}
                        scheduleDatas={this.state.caDatas[this.state.user.grade - 1]}
                        action={{
                                xyWindow: (bl,x,y,year,month,date,semesterNom,task,exam,changeSchedule,csBefore) => this.showWindow(bl,x,y,year,month,date,semesterNom,task,exam,changeSchedule,csBefore),
                                xyTaskWindow:(bl,x,y,year,month,date,position,showData,dataPosition) => this.showTaskWindow(bl,x,y,year,month,date,position,showData,dataPosition),
                                moreTaskWindow:(bl,x,y,year,month,date,position,showData) => this.showMoreTaskWindow(bl,x,y,year,month,date,position,showData),
                                xyScheduleWindow:(bl,x,y,year,month,date,position,showSchedule,type) => this.showScheduleWindow(bl,x,y,year,month,date,position,showSchedule,type),
                                editPage: (bl, showData, type) => this.showEditPage(bl, showData, type)
                                }}
                        apiFunction={{
                                    user_schedule_destory: (id) => this.user_schedule("destory",id),
                                    task_destroy: (id) => this.task("destory",id),
                                    task_update: (id, value, mes) => this.task("update",id, value, mes),
                                    exam_destroy: (id) => this.exam("destory",id),
                                    exam_update: (id, value, mes) => this.exam("update",id, value, mes),
                                    change_schedule_destroy: (id) => this.change_schedule("destory",id),
                                    }}
                    />
                    <EditPage
                        action={{editPage: (bl, showData, type) => this.showEditPage(bl, showData, type)}}
                        status={this.state.editPage}
                        handleOnChange={(index,e) => this.editHandleOnChange(index,e)}
                        apiFunction={{
                            exam_update: () => this.exam("update", this.state.editPage.showData.id, this.state.editPage.showData),
                            task_update: () => this.task("update", this.state.editPage.showData.id, this.state.editPage.showData)
                           }}
                    />
               
                    <ResultWindow value={this.state.rWindow} action={(a,b,c) => this.rWindow(a,this.state.rWindow.type,this.state.rWindow.mes)}/>
                    <SettingPage regesSemesterDate = {(date,position) => this.regesSemesterDate(date,position)} action={{PopupToggle: (ce) => this.PopupToggle(ce), setGrade: (select) => this.setGrade(select),logout:() => this.logout()}} status={this.state.popup.setting} element={{user:this.state.user,semesterDate:this.state.semesterPeriod}}/>
                    <Header actionShow={(mode) => this.PopupToggle(mode)} action={(mode) => this.togglePvmode(mode)} user={this.state.user}/>
                    <div className="flex-jus-between fa-rap no-select">
                        
                        <Sidebar scheduleDatas = {this.state.caDatas[this.state.user.grade - 1][0]} action = {{popupshow: () => this.PopupMenu(), popupEdit: (ce) => this.PopupCCedit(ce), PopupToggle: (ce) => this.PopupToggle(ce)}}/>
                        <Body pageData={this.state.page}
                            scheduleDatas={this.state.caDatas[this.state.user.grade - 1]}
                            element={{caCount: this.state.caCount,semesterDate: this.state.semesterPeriod[this.state.user.grade - 1]}}
                            action = {{popupshow: () => this.PopupMenu(),
                                popupEdit: (ce) => this.PopupCCedit(ce),
                                changeSelect: (type,amount) => this.changeSelect(type,amount),
                                showWindow:(bl,x,y,year,month,date,semesterNom,task,exam,changeSchedule,csBefore) => this.showWindow(bl,x,y,year,month,date,semesterNom,task,exam,changeSchedule,csBefore),
                                showTaskWindow:(bl,x,y,year,month,date,position,showData,dataPosition) => this.showTaskWindow(bl,x,y,year,month,date,position,showData,dataPosition),
                                showMoreTaskWindow:(bl,x,y,year,month,date,position,showData) => this.showMoreTaskWindow(bl,x,y,year,month,date,position,showData),
                                xyScheduleWindow:(bl,x,y,year,month,date,position,showSchedule,type) => this.showScheduleWindow(bl,x,y,year,month,date,position,showSchedule,type)
                            }}
                            select = {this.state.select}
                            task ={this.state.task}
                            exam ={this.state.exam}
                            change_schedules ={{after:this.state.change_schedules_after,before:this.state.change_schedules_before}}
                        />
                        
                        <PopupClassManual isPopup = {this.state.popup}
                                    action = {{
                                            popupshow: () => this.PopupManual()
                                            }}
                                                                    
                                                                                     
                        />
                        
                        <Popup type={1} action={{PopupToggle: (ce) => this.PopupToggle(ce), setTask: (value) => this.task("create",0, value), setExam: (value) => this.exam("create",0, value),setChangeSchedule:(value) => this.change_schedule("create",0, value)}} status={this.state.popup.addTask}
                                        datas={{schedules:this.state.caDatas[this.state.user.grade - 1],semesterDate: this.state.semesterPeriod[this.state.user.grade - 1]}}
                                                                                     
                                                                                     />
                        <Popup type={3} user={this.state.user} action={{PopupToggle: (ce) => this.PopupToggle(ce),userSignin:(user,sns) => this.userSignin(user,sns), logout: () => this.logout()}} status={this.state.popup.login}/>
                        <Popup type={4} status={this.state.popup.regester}
                                   action = {{popupshow: () => this.PopupMenu(),popupshowMnual: () => this.PopupManual(),
                                              addregesterId: (cd, array) => this.RegesterId(cd, array),
                                              regester: () => this.user_schedule("create",0),
                                              getSchedule: (val,position) => this.getScheduleData(val,position)
                                            }}
                                   sceduleDatas = {{APIresult: this.state.schedules, regesterIds: this.state.regesterIds, regesterElements: this.state.regesterElements}}/>
                    </div>
               </div>
                                                                                     
        )
    }
}

                               
class Body extends Component {
    constructor(props){
        super(props);
    }
    
    render(){
        if(this.props.pageData == "week"){
            return(
                <main className="fa-mainContainer">
                    <DateBox type={"week"} action={(type,amount) => this.props.action.changeSelect(type,amount)} select={{year:this.props.select.year,month:this.props.select.month,day:this.props.select.day}}/>
                    <div className="flex-jus-between fa-scedule">
                        <TimeBox />
                        <WeekCalender action = {this.props.action}
                            scheduleData = {this.props.scheduleDatas}
                            element={this.props.element}
                            select={{year:this.props.select.year,month:this.props.select.month,day:this.props.select.day}}
                            task={this.props.task} exam={this.props.exam} change_schedules={this.props.change_schedules}
                            change_schedules = {this.props.change_schedules}
                        />
                    </div>
                </main>
            )
        }else if(this.props.pageData == "month"){
            return(
                <main className="fa-mainContainer">
                   <DateBox type={"month"} action={(type,amount) => this.props.action.changeSelect(type,amount)} data={{year:this.props.select.year,month:this.props.select.month}}/>
                   <div className="fa-scedule">
                   <MonthCalender select={{year:this.props.select.year,month:this.props.select.month,day:this.props.select.day}} scheduleData = {this.props.scheduleDatas} element={this.props.element} task={this.props.task} exam={this.props.exam} change_schedules ={this.props.change_schedules} action={{showWindow:(bl,x,y,year,month,date,semesterNom,task,exam,changeSchedule,csBefore) => this.props.action.showWindow(bl,x,y,year,month,date,semesterNom,task,exam,changeSchedule,csBefore)}}/>
                   </div>
                </main>
            )
        }else if(this.props.pageData == "semester"){
            return(
                <main className="fa-mainContainer">
                   <DateBox type={"semester"} action={(type,amount) => this.props.action.changeSelect(type,amount)}
                        data={{year:this.props.select.year,month:this.props.select.month}}
                   />
                   <div className="fa-scedule">
                   <SemesterCalender data={{year:this.props.select.year,month:this.props.select.month}}
                        scheduleData = {this.props.scheduleDatas} element={this.props.element}
                        task={this.props.task} exam={this.props.exam} change_schedules ={this.props.change_schedules}
                        action={{showWindow:(bl,x,y,year,month,date,semesterNom,task,exam,changeSchedule,csBefore) => this.props.action.showWindow(bl,x,y,year,month,date,semesterNom,task,exam,changeSchedule,csBefore)}}
                   />
                   </div>
                </main>
            )
        }
    }
}

                               


    

const Sidebar = (props) => {
    const dayString=["月","火","水","木","金","土","日"]
    return(
        <aside className="fa-sideContainer">
           <div className="buttonBox" onClick={() => props.action.PopupToggle("addTask")}>
                <div>
                    <FontAwesomeIcon icon={faPlus} /> 予定を追加
                </div>
           </div>
           <div className="timetable">
               {props.scheduleDatas.map((d, i) =>
                    <div className="weekdays-lap" key={"sidebar" + i}>
                        <div className="weekdays">{dayString[i]+"曜日"}</div>
                        {d.map((data, index) =>
                            <div key={"sidebar"+ index + i}>
                                {data == 0 ?
                                    <div className="fa-schedule-side" onClick={() => props.action.popupshow() } ><div className="ss-headline">{index+1}講時</div><div className="ss-title">授業なし</div><div className="cszt">クリックして授業を追加</div></div>:
                                    <div className="fa-schedule-side" onClick={() => props.action.popupEdit(data.position)} ><div className="ss-headline">{index+1}講時</div><div className="ss-title">{data.title}</div><div className="cszt">{data.teacher}</div></div>
                                }
                            </div>
                        )}
                    </div>
                )}
            </div>
           <div className="side-more flex-align-center">
                <div>
                    <div>TakumiHiguchi</div>
                    <a href="https://github.com/TakumiHiguchi"><FontAwesomeIcon style={githubIcon} icon={faGithub} />github</a>
                </div>
           </div>
        </aside>
    )
}





ReactDOM.render(
    <Nurture />,
    document.getElementById('root')
)









// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
