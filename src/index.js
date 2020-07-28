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
import './toppage.scss';
import './Popup.scss';

import Popup from './popup/popup'
import Window from './window/window'
import EditPage from './page/edit/editPage'

import TimeContainer from './page/timeContainer'

import ResultWindow from './ResultWindow'
import Popup1 from './Popup'
import SettingPage from './page/setting/SettingPage'
import WeekCalender from './WeekCalender'
import MonthCalender from './MonthCalender'
import SemesterCalender from './SemesterCalender'
import DDMbodyChange from './DDMbodyChange'
import DateBox from './DateBox'
import Sidebar from './Sidebar'
import * as serviceWorker from './serviceWorker';

//APIを叩く関数のインポート
import calendar_index from './API/calendar/index'
import calendar_update from './API/calendar/update'
import calendar_destroy from './API/calendar/destroy'

import news_index from './API/news/index'

import schedule_index from './API/schedule/index'
import schedule_create from './API/schedule/create'

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
            news:[],
            change_schedules_after:{},
            change_schedules_before:{},
            xyWindow:{window:false,x:0,y:0,year:0,month:0,date:0,semesterNom:0,task:{},exam:{},changeSchedule:{},csBefore:{}},
            xyTaskWindow:{window:false,x:0,y:0,year:0,month:0,date:0,position:0,showData:{}},
            moreTaskWindow:{window:false,x:0,y:0,year:0,month:0,date:0,position:0,showData:{}},
            xyScheduleWindow:{window:false,x:0,y:0,year:0,month:0,date:0,position:0,showSchedule:{},type:""},
            editPage:{window:false,showData:{title:''},type:""},
            calendar:[],
            selectCalendarNumber:[0]
        }
    }
    //カレンダーの選択を変更
    changeSelectCalendar(index){
        const ins = this.state.selectCalendarNumber;
        let newArray = [];
        if(ins.indexOf(index) === -1){
            ins.push(index);
            newArray = ins;
        }else{
            newArray = ins.filter(n => n !== index);
        }
        this.setState({selectCalendarNumber:newArray});

    }
    //学年を保存するAPIを叩く部分
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

    //学期期間の登録関数
    regesSemesterDate(cal, date, position){
        let insDate = cal.semesterPeriod
        insDate[position - 1] = date;
        this.setSemesterDate(cal.id, insDate[position - 1].fhSemester1, insDate[position - 1].fhSemester2, insDate[position - 1].lateSemester1, insDate[position - 1].lateSemester2, position)
    }
    setSemesterDate(calId, date1, date2, date3, date4, grade){
        this.rWindow(true,0,"");
        //学年ごとの期間を設定する
        axios.post(ENDPOINT + '/api/v1/setSemesterDate', {
            calendarId:calId,
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

    //カレンダーAPIを叩く部分
    calendar(type, calendar, ...args){
        const user = this.state.user;
        let ins;
           
        switch(type){
            case "index" :
                ins = calendar_index(ENDPOINT, user.key, user.session);//外部関数
                ins.then(res => {
                    if(res){
                        this.setState({calendar:res.calendars})
                    }else{
                        this.rWindow(true,2,'セッション切れです');
                    }
                })
                .catch(() => {
                    this.rWindow(true,2,'通信に失敗しました');
                });
                break;
            case "update" :
                ins = calendar_update(ENDPOINT, user.key, user.session, calendar);//外部関数
                ins.then(res => {
                    if(args[1] === void 0){
                        this.rWindow(true,res.status,res.mes);
                    }else{
                        this.rWindow(true,res.status,args[1]);
                    }
                    //カレンダーを再読み込みはしない
                    //this.calendar("index");
                })
                .catch(() => {
                    this.rWindow(true,2,'通信に失敗しました');
                });
                break;
            case "destory" :
                ins = calendar_destroy(ENDPOINT, user.key, user.session, calendar);//外部関数
                ins.then(res => {
                    this.rWindow(true,res.status,res.mes);
                    //カレンダーを再読み込み
                    //this.calendar("index");
                })
                .catch(() => {
                    this.rWindow(true,2,'通信に失敗しました');
                });
                break;
        }
    }

    //タスクAPIを叩く部分
    task(type, id, cal_id, ...args){
        const user = this.state.user;
        let ins;
                
        if(type == "destory" || type == "create" || type == "update")this.rWindow(true,0,"");
        
        switch(type){
            case "index" :
                //未対応
                ins = task_index(ENDPOINT, user.key, user.session);//外部関数
                ins.then(res => {
                    if(res){
                        this.setState({task:res.tasks});
                    }else{
                        this.rWindow(true,2,'セッション切れです');
                    }
                })
                .catch(() => {
                    this.rWindow(true,2,'通信に失敗しました');
                });
                break;
            case "create" :
                ins = task_create(ENDPOINT, user.key, user.session, args[0], user.grade, cal_id);//外部関数
                ins.then(res => {
                    this.rWindow(true,res.status,res.mes);
                    //タスクを再読み込み
                    this.calendar("index");
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
                    this.calendar("index");
                })
                .catch(() => {
                    this.rWindow(true,2,'通信に失敗しました');
                });
                break;
            case "destory" :
                ins = task_destroy(ENDPOINT, user.key, user.session, id, user.grade, cal_id);//外部関数
                ins.then(res => {
                    this.rWindow(true,res.status,res.mes);
                    //タスクを再読み込み
                    this.calendar("index");
                    //ウィンドウを全て閉じる
                    this.closeAllWindow()
                })
                .catch(() => {
                    this.rWindow(true,2,'通信に失敗しました');
                });
                break;
        }
    }

    //ユーザーのスケジュールAPIを叩く部分
    schedule(type, ...args){
        const user = this.state.user;
        let ins;
                
        if(type == "create" || type == "update")this.rWindow(true,0,"");

        switch(type){
            case "index" :
                ins = schedule_index(ENDPOINT, args[0]);//外部関数
                ins.then(res => {
                    this.setState({schedules:res.schedules});
                })
                .catch(() => {
                    this.rWindow(true,2,'通信に失敗しました');
                });
                break;
            case "create" :
                //未対応
                ins = schedule_create(ENDPOINT, user.key, user.session, args[0], user.grade);//外部関数
                ins.then(res => {
                    this.rWindow(true,res.status,res.mes);
                    //スケジュールを再読み込み
                    this.calendar("index");
                })
                .catch(() => {
                    this.rWindow(true,2,'通信に失敗しました');
                });
                this.PopupToggle("manual")
                break;
        }
    }

    //ユーザーのスケジュールAPIを叩く部分
    user_schedule(type, id, cal_id, ...args){
        const user = this.state.user;
        let ins;
                
        if(type == "destory" || type == "create" || type == "update")this.rWindow(true,0,"");
        
        switch(type){
            case "index" :
                //未対応
                ins = user_schedule_index(ENDPOINT, user.key, user.session);//外部関数
                ins.then(res => {
                    this.setState({caDatas:res.schedules});
                })
                .catch(() => {
                    this.rWindow(true,2,'通信に失敗しました');
                });
                break;
            case "create" :
                ins = user_schedule_create(ENDPOINT, user.key, user.session, this.state.regesterElements, user.grade, cal_id);//外部関数
                ins.then(res => {
                    this.rWindow(true,res.status,res.mes);
                    this.setState({
                        regesterIds: [],
                        regesterElements: []
                    });
                    //スケジュールを再読み込み
                    this.calendar("index");
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
                ins = user_schedule_destroy(ENDPOINT, user.key, user.session, id, user.grade, cal_id);//外部関数
                ins.then(res => {
                    this.rWindow(true,res.status,res.mes);
                    //スケジュールを再読み込み
                    this.calendar("index");
                    //ウィンドウを全て閉じる
                    this.closeAllWindow()
                })
                .catch(() => {
                    this.rWindow(true,2,'通信に失敗しました');
                });
                break;
        }
    }
    
    exam(type, id, cal_id, ...args){
        const user = this.state.user;
        let ins;
        if(type == "destory" || type == "create" || type == "update")this.rWindow(true,0,"");
        
        switch(type){
            case "index" :
                //未対応
                ins = exam_index(ENDPOINT, user.key, user.session);//外部関数
                ins.then(res => {
                    if(res){
                        this.setState({exam:res.exams});
                    }else{
                        this.rWindow(true,2,'セッション切れです');
                    }
                })
                .catch(() => {
                    this.rWindow(true,2,'通信に失敗しました');
                });
                break;
            case "create" :
                ins = exam_create(ENDPOINT, user.key, user.session, args[0], user.grade, cal_id);//外部関数
                ins.then(res => {
                    this.rWindow(true,res.status,res.mes);
                    //タスクを再読み込み
                    this.calendar("index");
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
                    this.calendar("index");
                })
                .catch(() => {
                    this.rWindow(true,2,'通信に失敗しました');
                });
                break;
            case "destory" :
                ins = exam_destroy(ENDPOINT, user.key, user.session, id, user.grade, cal_id);//外部関数
                ins.then(res => {
                    this.rWindow(true,res.status,res.mes);
                    //試験を再読み込み
                    this.calendar("index");
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
    change_schedule(type,id, cal_id, ...args){
        const user = this.state.user;
        let ins;
                
        if(type == "destory" || type == "create" || type == "update")this.rWindow(true,0,"");
        
        switch(type){
            case "index" :
                //未対応
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
                    this.calendar("index");
                })
                .catch(() => {
                    this.rWindow(true,2,'通信に失敗しました');
                });
                this.PopupToggle("addTask")
                break;
            case "destory" :
                ins = change_schedule_destroy(ENDPOINT, user.key, user.session, id, user.grade, cal_id);//外部関数
                ins.then(res => {
                    this.rWindow(true,res.status,res.mes);
                    //スケジュールを再読み込み
                    this.calendar("index");
                    //ウィンドウを全て閉じる
                    this.closeAllWindow()
                })
                .catch(() => {
                    this.rWindow(true,2,'通信に失敗しました');
                });
                break;
        }
    }

    /*

    ここまで修正済み


    */
    //試験APIを叩く部分
    
    
    
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
                
                this.calendar("index");
                this.news("index")
                
                //学期期間の取得部分
                /*
                let insDate = this.state.semesterPeriod;
                
                for(var i = 0;i < response.data.semesterPeriod.length;i++){
                    let date = response.data.semesterPeriod[i]
                    insDate[i][0] = date.fhSemester1;
                    insDate[i][1] = date.fhSemester2;
                    insDate[i][2] = date.lateSemester1;
                    insDate[i][3] = date.lateSemester2;
                }
                
                
                this.user_schedule("index",0);
                this.task("index",0);
                this.exam("index",0);
                this.change_schedule("index",0);
                
                */
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
            calendar:[]
        });
        this.setState({popup: {login: true,setting:false}});
    }
    

    PopupToggle(type){
        switch (type){
            case "regester": this.setState({popup: {regester: !this.state.popup.regester}});this.schedule("index","");break;
            case "addTask": this.setState({popup: {addTask: !this.state.popup.addTask}});break;
            case "setting": this.setState({popup: {setting: !this.state.popup.setting}});break;
            case "login": this.setState({popup: {login: !this.state.popup.login}});break;
            case "manual": this.setState({popup: {manual: !this.state.popup.manual}});break;
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
    showTaskWindow(bl,x,y,year,month,date,position,showData){
        let ins = this.state.xyTaskWindow;
        ins.window = bl;
        ins.x = x;
        ins.y = y;
        ins.position = position;
        ins.showData = showData;
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
                              
    
    
                               
    
    
    
                              
    
    

    //newsAPIを叩く部分
    news(type){
        let ins;
           
        switch(type){
            case "index" :
                ins = news_index(ENDPOINT);//外部関数
                ins.then(res => {
                    if(res){
                        this.setState({news:res.NUnews});
                    }else{
                        this.rWindow(true,2,'newsデータがありません');
                    }
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
                                xyTaskWindow:(bl,x,y,year,month,date,position,showData) => this.showTaskWindow(bl,x,y,year,month,date,position,showData),
                                moreTaskWindow:(bl,x,y,year,month,date,position,showData) => this.showMoreTaskWindow(bl,x,y,year,month,date,position,showData),
                                xyScheduleWindow:(bl,x,y,year,month,date,position,showSchedule,type) => this.showScheduleWindow(bl,x,y,year,month,date,position,showSchedule,type),
                                editPage: (bl, showData, type) => this.showEditPage(bl, showData, type)
                                }}
                        apiFunction={{
                                    user_schedule_destory: (id,cal_id) => this.user_schedule("destory", id, cal_id),
                                    task_destroy: (id,cal_id) => this.task("destory",id,cal_id),
                                    task_update: (id, value, mes) => this.task("update",id, 0, value, mes),
                                    exam_destroy: (id,cal_id) => this.exam("destory",id, cal_id),
                                    exam_update: (id, value, mes) => this.exam("update",id, 0, value, mes),
                                    change_schedule_destroy: (id, cal_id) => this.change_schedule("destory",id, cal_id),
                                    }}
                    />
                    <EditPage
                        action={{editPage: (bl, showData, type) => this.showEditPage(bl, showData, type)}}
                        status={this.state.editPage}
                        handleOnChange={(index,e) => this.editHandleOnChange(index,e)}
                        apiFunction={{
                            exam_update: () => this.exam("update", this.state.editPage.showData.id, 0, this.state.editPage.showData),
                            task_update: () => this.task("update", this.state.editPage.showData.id, 0, this.state.editPage.showData),
                           }}
                    />
                    <Popup 
                        status={this.state.popup}
                        calendar={this.state.calendar}
                        sceduleDatas = {{APIresult: this.state.schedules, regesterIds: this.state.regesterIds, regesterElements: this.state.regesterElements}}
                        action={{
                            PopupToggle:(mode) => this.PopupToggle(mode),
                            addregesterId: (cd, array) => this.RegesterId(cd, array),
                            regester: (cal_id) => this.user_schedule("create",0,cal_id),
                            getSchedule: (val,position) => this.schedule("index",val,position)
                        }}
                        apiFunction={{
                            schedule_create: (schedule) => this.schedule("create",schedule)
                        }}
                    />
               
                    <ResultWindow value={this.state.rWindow} action={(a,b,c) => this.rWindow(a,this.state.rWindow.type,this.state.rWindow.mes)}/>
                    <SettingPage 
                        regesSemesterDate = {(cal,date,position) => this.regesSemesterDate(cal,date,position)} 
                        action={{PopupToggle: (ce) => this.PopupToggle(ce), setGrade: (select) => this.setGrade(select),logout:() => this.logout()}} 
                        status={this.state.popup.setting} 
                        element={{user:this.state.user,semesterDate:this.state.semesterPeriod}}
                        calendar = {this.state.calendar}
                        apiFunction={{
                            calendar_update: (calendar, mes) => this.calendar("update", calendar, 0, mes)
                           }}
                    />
                    <Header actionShow={(mode) => this.PopupToggle(mode)} action={(mode) => this.togglePvmode(mode)} user={this.state.user}/>
                    <div className="flex-jus-between fa-rap no-select">
                        
                        <Sidebar calendar={this.state.calendar} selectCalendarNumber={this.state.selectCalendarNumber} exam={this.state.exam}
                            changeSelectCalendar={(index) => this.changeSelectCalendar(index)}
                            action={{PopupToggle:(mode) => this.PopupToggle(mode),
                                showTaskWindow:(bl,x,y,year,month,date,position,showData) => this.showTaskWindow(bl,x,y,year,month,date,position,showData)
                            }}/>
                        <Body pageData={this.state.page}
                            scheduleDatas={this.state.caDatas[this.state.user.grade - 1]}
                            element={{caCount: this.state.caCount,semesterDate: this.state.semesterPeriod[this.state.user.grade - 1]}}
                            action = {{
                                changeSelect: (type,amount) => this.changeSelect(type,amount),
                                showWindow:(bl,x,y,year,month,date,semesterNom,task,exam,changeSchedule,csBefore) => this.showWindow(bl,x,y,year,month,date,semesterNom,task,exam,changeSchedule,csBefore),
                                showTaskWindow:(bl,x,y,year,month,date,position,showData) => this.showTaskWindow(bl,x,y,year,month,date,position,showData),
                                showMoreTaskWindow:(bl,x,y,year,month,date,position,showData) => this.showMoreTaskWindow(bl,x,y,year,month,date,position,showData),
                                xyScheduleWindow:(bl,x,y,year,month,date,position,showSchedule,type) => this.showScheduleWindow(bl,x,y,year,month,date,position,showSchedule,type)
                            }}
                            select = {this.state.select}
                            task ={this.state.task}
                            exam ={this.state.exam}
                            change_schedules ={{after:this.state.change_schedules_after,before:this.state.change_schedules_before}}
                            calendar={this.state.calendar}
                            selectCalendarNumber={this.state.selectCalendarNumber}
                            user = {this.state.user}
                        />
                        
                        
                        <Popup1 type={1} action={{PopupToggle: (ce) => this.PopupToggle(ce), setTask: (value, cal_id) => this.task("create",0, cal_id, value), setExam: (value, cal_id) => this.exam("create",0, cal_id, value),setChangeSchedule:(value) => this.change_schedule("create",0,0, value)}} status={this.state.popup.addTask}
                                        datas={{schedules:this.state.caDatas[this.state.user.grade - 1],semesterDate: this.state.semesterPeriod[this.state.user.grade - 1]}}
                                        calendar={this.state.calendar}
                                        user = {this.state.user}                                                   
                        />
                        <Popup1 type={3} user={this.state.user} action={{PopupToggle: (ce) => this.PopupToggle(ce),userSignin:(user,sns) => this.userSignin(user,sns), logout: () => this.logout()}} status={this.state.popup.login}
                            news={this.state.news}
                        />
                        
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
                        <TimeContainer />
                        <WeekCalender action = {this.props.action}
                            element={this.props.element}
                            select={{year:this.props.select.year,month:this.props.select.month,day:this.props.select.day}}

                            calendar={this.props.calendar}
                            selectCalendarNumber={this.props.selectCalendarNumber}
                            user = {this.props.user}
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

                               


    






ReactDOM.render(
    <Nurture />,
    document.getElementById('root')
)









// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
