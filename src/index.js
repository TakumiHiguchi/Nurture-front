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

import Popup from './Popup'
import SettingPage from './SettingPage'
import WeekCalender from './WeekCalender'
import MonthCalender from './MonthCalender'
import SemesterCalender from './SemesterCalender'
import DDMbodyChange from './DDMbodyChange'
import * as serviceWorker from './serviceWorker';

const ENDPOINT = 'http://localhost:3020'
//'https://nurture-api.herokuapp.com'

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



const DateBox = (props) => {
    if(props.type == "week"){
        return(
               <div>
                    <div className="flex-align-center fa-dateContainer">
                        <div className="faIcon-arrow flex-jus-center">
                            <FontAwesomeIcon style={pmArrow} icon={faChevronLeft}/>
                        </div>
                        <div className="bord-today">
                            今日
                        </div>
                        <div className="faIcon-arrow flex-jus-center">
                            <FontAwesomeIcon style={pmArrow} icon={faChevronRight}/>
                        </div>
                        <div className="bord-month  no-pad">
                            2020年6月
                        </div>
                        
                    </div>
                   <div className="flex-jus-between fa-dateContainer fa-endline">
                        <div className="fa-timeline"></div>
                        <div className="fa-sceduleLine fa-dateline flex-jus-center">
                            1(月)
                        </div>
                        <div className="fa-sceduleLine fa-dateline flex-jus-center">
                            2(火)
                        </div>
                       <div className="fa-sceduleLine fa-dateline flex-jus-center">
                           3(水)
                       </div>
                       <div className="fa-sceduleLine fa-dateline flex-jus-center">
                           4(木)
                       </div>
                       <div className="fa-sceduleLine fa-dateline flex-jus-center">
                           5(金)
                       </div>
                       <div className="fa-sceduleLine fa-dateline flex-jus-center">
                           6(土)
                       </div>
                        <div className="fa-sceduleLine fa-dateline flex-jus-center">
                            7(日)
                        </div>
                   </div>
               </div>
        )
    }else if(props.type == "month"){
        return(
               <div>
                    <div className="flex-align-center fa-dateContainer">
                        <div className="faIcon-arrow flex-jus-center" onClick={() => props.action("month",-1)}>
                            <FontAwesomeIcon style={pmArrow} icon={faChevronLeft}/>
                        </div>
                        <div className="bord-today" onClick={() => props.action("today",-1)}>
                            今日
                        </div>
                        <div className="faIcon-arrow flex-jus-center" onClick={() => props.action("month",1)}>
                            <FontAwesomeIcon style={pmArrow} icon={faChevronRight}/>
                        </div>
                        <div className="bord-month no-pad">
                            {props.data.year}年{props.data.month}月
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
    }else if(props.type == "semester"){
        return(
               <div>
                    <div className="flex-align-center fa-dateContainer">
                        <div className="faIcon-arrow flex-jus-center" onClick={() => props.action("year",-1)}>
                            <FontAwesomeIcon style={pmArrow} icon={faChevronLeft}/>
                        </div>
                        <div className="bord-today" onClick={() => props.action("today",-1)}>
                            今日
                        </div>
                        <div className="faIcon-arrow flex-jus-center" onClick={() => props.action("year",1)}>
                            <FontAwesomeIcon style={pmArrow} icon={faChevronRight}/>
                        </div>
                        <div className="bord-month no-pad">
                            {props.data.year}年
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
const PopupClassEdit = (props) => {
    const dayString=["月","火","水","木","金","土","日"]
    const {caDatas, caCount} = props.element
    return(
           <div className={props.isPopup.editSchedule ? 'popup popup_effect' : 'popup popup_effect_de'} >
               <div className="popup_wrap" onClick={() => props.action.popupshow(caDatas.position) }></div>
                <div className="pceWhir no-select">
                    <h2 className="add_scedule">{props.element.title}</h2>
                    <div className="pcePopup-item">
                        <div><span className="t-index">授業コード</span> {caDatas.CoNum}</div>
                        <div><span className="t-index">担当教員</span> {caDatas.teacher}</div>
                        <div><span className="t-index">学期</span> {caDatas.semester}・{dayString[Math.floor(caDatas.position / 6)]}曜 {caDatas.position % 6 + 1}講時</div>
                        <div><span className="t-index">学年</span> {caDatas.grade}学年</div>
                        <div><span className="t-index">必修等</span> {caDatas.status}</div>
                        <div><span className="t-index">教室</span> <input type="text" placeholder="クリックして教室を登録" className="removeCss pcePopup-input"/></div>
                    </div>
                    <h3 className="fa-Attendance-h3">出欠管理</h3>
                    <div className="pcePopup-item flex-jus-center">
                        <div className="counter">
                            <div className="flex-jus-center">出席回数</div>
                            <div className="fa-counter-lap flex-jus-between">
                                <FontAwesomeIcon style={pmIcons} icon={faPlusCircle} onClick={() => props.action.count(0, 1, caDatas.position)}/>
                                <div>{caCount[0]}</div>
                                <FontAwesomeIcon style={pmIcons} icon={faMinusCircle} onClick={() => props.action.count(0, -1, caDatas.position)}/>
                            </div>
                        </div>
                        <div className="counter">
                            <div className="flex-jus-center">遅刻回数</div>
                            <div className="fa-counter-lap flex-jus-between">
                                <FontAwesomeIcon style={pmIcons} icon={faPlusCircle} onClick={() => props.action.count(1, 1, caDatas.position)}/>
                                <div>{caCount[1]}</div>
                                <FontAwesomeIcon style={pmIcons} icon={faMinusCircle} onClick={() => props.action.count(1, -1, caDatas.position)}/>
                            </div>
                        </div>
                        <div className="counter">
                            <div className="flex-jus-center">欠席回数</div>
                            <div className="fa-counter-lap flex-jus-between">
                                <FontAwesomeIcon style={pmIcons} icon={faPlusCircle} onClick={() => props.action.count(2, 1, caDatas.position)}/>
                                <div>{caCount[2]}</div>
                                <FontAwesomeIcon style={pmIcons} icon={faMinusCircle} onClick={() => props.action.count(2, -1, caDatas.position)}/>
                            </div>
                        </div>
                    </div>
                    <div className="sns-shere flex">
                        <a href=""><FontAwesomeIcon style={twitterIcon} icon={faTwitter} /></a>
                        <a href=""><FontAwesomeIcon style={lineIcon} icon={faLine} /></a>
                    </div>
                </div>
           </div>
           )
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
            user:{key:"", name:"ゲスト", imageURL:"", session:"", maxAge:0, mes:"", grade:1},
            popup:{regester:false, editSchedule:false, manual: false, addTask:false, setting:false, login:true},
            select:{year: now.getFullYear(),month: now.getMonth()+1 ,day: now.getDay()},
            selectPopup:0,
            regesterIds:[],
            regesterElements:[],
            caDatas: tbl,
            caCount: tblc,
            schedules:[],
            seSchedule: {start_date:1,end_date:2},
            semesterPeriod:insSP,
            
        }
    }
    //api叩く部分


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
    loadUserSchedule(key ,session){
        //ユーザーのスケジュールを取得する部分
        axios.get(ENDPOINT + '/api/v1/loadUserDetail?key='+ key +'&session='+ session)
            .then(response => {
                console.log(response.data.schedules);
                console.log(response.data.mes);
                console.log(key);
                console.log(session);
                this.setState({caDatas:response.data.schedules})
                
            })
            .catch(() => {
                console.log('通信に失敗しました');
            });
        
        
    }
    
    setGrade(select){
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
            console.log(response.data.mes);
        })
        .catch(() => {
            console.log('通信に失敗しました');
        });
    }
    
    setSemesterDate(date1,date2,date3,date4,grade){
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
            console.log(response.data.mes);
        })
        .catch(() => {
            console.log('通信に失敗しました');
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
                                    grade:user.data.grade
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
                
                
                this.loadUserSchedule(user.data.userKey ,user.data.session);
                
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
        user.maxAge = 0
        user.imageURL = ""
        this.setState({user:user,caDatas: tbl});
        this.setState({popup: {login: true}});
    }
    
    PopupMenu() {
        this.setState({popup: {regester: !this.state.popup.regester}});
    }
    PopupCCedit(ce) {
        this.setState({popup: {editSchedule: !this.state.popup.editSchedule},selectPopup:ce});
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
    changeSelect(type,amount){
        
        if(type == "today"){
            const now = new Date();
            this.setState({select:{year:now.getFullYear(),month:now.getMonth()+1}});
        }else if(type == "year"){
            this.setState({select:{year:this.state.select.year + parseInt(amount),month:this.state.select.month}});
        }else{
            //月セレクターの変更
            let y = this.state.select.year
            let m = this.state.select.month + parseInt(amount);
            
            if(m == 0){
                y-=1;
                m=12;
            }else if(m == 13){
                y+=1;
                m=1;
            }
            
            this.setState({select:{year:y,month:m}});
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
    Regester() {
        var regesArray = this.state.caDatas;
        var grade = this.state.user.grade - 1;//更新する学年
            
        for (let i = 0; i < this.state.regesterElements.length; i++) {
            let element = this.state.regesterElements[i]
            let w = Math.floor(element.position / 6)
            let d = (element.position % 6)
            
            if(element.semester == "前学期"){var semester = 0}else{ var semester = 1}
                                 
            if(regesArray[grade][semester][w][d] == 0 && this.state.user.maxAge > (new Date().getTime() / 1000) ){
                
                axios.post(ENDPOINT + '/api/v1/setUserSchedule', {
                               title: element.title,
                               teacher: element.teacher,
                               semester: element.semester,
                               position: element.position,
                               grade: element.grade,
                               key: this.state.user.key,
                               session: this.state.user.session,
                               user_grade: this.state.user.grade
                           })
                .then(response => {
                    console.log(response.data.mes);
                    
                    if(response.data.status == "SUCCESS"){
                        regesArray[grade][semester][w][d] = element
                        this.setState({
                            caDatas: regesArray,
                            regesterIds: [],
                            regesterElements: []
                        })
                    }
                })
                .catch(() => {
                    console.log('通信に失敗しました');
                });
            }
        }
        this.PopupMenu()
    }
    render(){
                
        return(
               <div>
               
                    <SettingPage regesSemesterDate = {(date,position) => this.regesSemesterDate(date,position)} action={{PopupToggle: (ce) => this.PopupToggle(ce), setGrade: (select) => this.setGrade(select)}} status={this.state.popup.setting} element={{user:this.state.user,semesterDate:this.state.semesterPeriod}}/>
                    <Header actionShow={(mode) => this.PopupToggle(mode)} action={(mode) => this.togglePvmode(mode)} user={this.state.user}/>
                    <div className="flex-jus-between fa-rap no-select">
                        
                        <Sidebar scheduleDatas = {this.state.caDatas[this.state.user.grade - 1][0]} action = {{popupshow: () => this.PopupMenu(), popupEdit: (ce) => this.PopupCCedit(ce), PopupToggle: (ce) => this.PopupToggle(ce)}}/>
                        <Body pageData={this.state.page}
                            scheduleDatas={this.state.caDatas[this.state.user.grade - 1][0]}
                            element={{caCount: this.state.caCount}}
                            action = {{popupshow: () => this.PopupMenu(),
                                popupEdit: (ce) => this.PopupCCedit(ce),
                                changeSelect: (type,amount) => this.changeSelect(type,amount)
                            }}
                            select = {this.state.select}
                        />
                        <PopupClassEdit isPopup = {this.state.popup}
                                   action = {{
                                            popupshow: (ce) => this.PopupCCedit(ce),
                                            count: (typeNo, count, position) => this.AttendanceCount(typeNo, count, position)
                                            }}
                                   element = {{caDatas: this.state.caDatas[this.state.user.grade - 1][0][Math.floor(this.state.selectPopup / 6)][this.state.selectPopup % 6],
                                              caCount: this.state.caCount[Math.floor(this.state.selectPopup / 6)][this.state.selectPopup % 6]
                                            }}
                        />
                        <PopupClassManual isPopup = {this.state.popup}
                                    action = {{
                                            popupshow: () => this.PopupManual()
                                            }}
                                                                    
                                                                                     
                        />
                        
                        <Popup type={1} action={{PopupToggle: (ce) => this.PopupToggle(ce)}} status={this.state.popup.addTask}
                                        datas={{schedules:this.state.caDatas[this.state.user.grade - 1][0]}}/>
                        <Popup type={3} user={this.state.user} action={{PopupToggle: (ce) => this.PopupToggle(ce),userSignin:(user,sns) => this.userSignin(user,sns), logout: () => this.logout()}} status={this.state.popup.login}/>
                        <Popup type={4} status={this.state.popup.regester}
                                   action = {{popupshow: () => this.PopupMenu(),popupshowMnual: () => this.PopupManual(),
                                              addregesterId: (cd, array) => this.RegesterId(cd, array),
                                              regester: () => this.Regester(),
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
                    <DateBox type={"week"}/>
                    <div className="flex-jus-between fa-scedule">
                        <TimeBox />
                        <WeekCalender action = {{popupshow: () => this.props.action.popupshow(),popupEdit: (ce) => this.props.action.popupEdit(ce) }}
                            scheduleData = {this.props.scheduleDatas}
                            element={{caCount: this.props.element.caCount}}
                        />
                    </div>
                </main>
            )
        }else if(this.props.pageData == "month"){
            return(
                <main className="fa-mainContainer">
                   <DateBox type={"month"} action={(type,amount) => this.props.action.changeSelect(type,amount)} data={{year:this.props.select.year,month:this.props.select.month}}/>
                   <div className="fa-scedule">
                   <MonthCalender data={{year:this.props.select.year,month:this.props.select.month}}/>
                   </div>
                </main>
            )
        }else if(this.props.pageData == "semester"){
            return(
                <main className="fa-mainContainer">
                   <DateBox type={"semester"} action={(type,amount) => this.props.action.changeSelect(type,amount)}
                        data={{year:this.props.select.year,month:this.props.select.month}}/>
                   <div className="fa-scedule">
                   <SemesterCalender data={{year:this.props.select.year,month:this.props.select.month}}/>
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
