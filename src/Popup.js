import React, { Component } from 'react';
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import moment from 'moment'
import { GoogleLogout } from 'react-google-login'; //googleログインのログアウト

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //fontaweresomeのインポート
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faGoogle} from "@fortawesome/free-brands-svg-icons";//Lineアイコン
import { faTwitter } from "@fortawesome/free-brands-svg-icons"; //twitterアイコン
import { faGithub } from "@fortawesome/free-brands-svg-icons"; //githubアイコン
import { faLine } from "@fortawesome/free-brands-svg-icons"; //lineアイコン
import { faTimes } from "@fortawesome/free-solid-svg-icons";//minusアイコン
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";//矢印アイコン

import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";//カレンダー
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";//情報
import { faUsers } from "@fortawesome/free-solid-svg-icons";//ユーザー
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";//リンク
import { faSignOutAlt,faBook } from "@fortawesome/free-solid-svg-icons";//サインアウト


import DDMschedule from './DDMschedule'
import DDMposition from './DDMposition'
import GoogleAuthentication from './GoogleAuthentication'
import DDMsearchPosition from './DDMsearchPosition'

import TlEditor from './TlEditor'

//datepicker
import ja from 'date-fns/locale/ja';
registerLocale('ja', ja)


const githubIcon = {
    fontSize:"1.3em",
    color:"#24292e",
    cursor: "pointer"
}
const exLogout = {
    fontSize:"1.2em",
    color:"#494949",
    cursor: "pointer"
}
const exLink = {
    fontSize:"1em",
    color:"#494949",
    cursor: "pointer"
}
const info = {
    fontSize:"1.3em",
    color:"#00aced",
    cursor: "pointer"
}
const clock = {
    fontSize:"1em",
    margin:"0 15 0 5"
}
const calendar={
}
const twitterIcon = {
    fontSize:"1.5em",
    color:"white",
    cursor: "pointer"
}
const lineIcon = {
    fontSize:"1.5em",
    color:"#Line",
    cursor: "pointer"
}
const pmArrow = {
    fontSize:"0.9em",
    color:"rgb(170, 170, 170)",
    cursor: "pointer",
    padding:"0 0 0 10",
    height:"28px"
}
const pmcr = {
    fontSize:"1em",
    color:"rgb(170, 170, 170)",
    cursor: "pointer"
}
const p2head ={
    color:"#aaa"
}
const p2inner ={
    color:"#aaa",
fontSize:"0.8em"
}
const beforeBox={
    marginBottom: "40px"
}
const exdp = {
zIndex:9999
}

export default class Popup extends Component {
    constructor(props){
        super(props);
        let d = new Date();
        d = this.parseAsMoment(d).format('YYYY/MM/DD');
        this.state={
            taskPpage:0,
            selectDate: new Date(),
            value:{taskTitle:"",taskCont:"",taskDate:d,position:1,examTitle:"",examCont:"",examDate:d,selectSchedule:{},changeScheduleBeforeDate:"",changeScheduleAfterDate:""}
        }
    }
    changePage(no){
        this.setState({taskPpage:no});
    }
    sec(type){
        if(type === 1){
            this.props.action.PopupToggle("login");
            this.props.action.PopupToggle("login-dn");
        }else{
            this.props.action.PopupToggle("login");
        }
    }
    parseAsMoment = (dateTimeStr) => {
      return moment.utc(dateTimeStr, 'YYYY-MM-DDTHH:mm:00Z', 'ja').utcOffset(9)
    }
    setTask(){
        let value = this.state.value
        this.props.action.setTask(value);
        this.props.action.PopupToggle("addTask");
        
        //初期化
        value.taskTitle = "";
        
        this.setState({value:value});
    }
    
    setExam(){
        let value = this.state.value
        this.props.action.setExam(value);
        this.props.action.PopupToggle("addTask");
        
        this.setState({value:value});
    }
    
    setChangeSchedule(){
        let value = this.state.value
        this.props.action.setChangeSchedule(value);
        this.props.action.PopupToggle("addTask");
        
    }
    handleOnChange(index,e){
        let ins = this.state.value
        
        switch (index){
            case "taskTitle" : ins.taskTitle = e.target.value;break;
            case "taskCont" : ins.taskCont = e;break;
            case "taskDate" : ins.taskDate = e;break;
            case "position" : ins.position = e;break;
            case "examCont" : ins.examCont = e;break;
            case "examDate" : ins.examDate = e;break;
            case "examTitle" : ins.examTitle = e;break;
            case "changeScheduleBeforeDate" : ins.changeScheduleBeforeDate = e;break;
            case "changeScheduleAfterDate" : ins.changeScheduleAfterDate = e;break;
            case "selectSchedule" : ins.selectSchedule = e;console.log(e);break;
        }
        this.setState({value:ins});
    }
    
    render(){
        if(this.props.type == 1){
            return(
                   <AddTask isPopup={this.props.status} action={() => this.props.action.PopupToggle("addTask")}
                            setTask={() => this.setTask()}
                            setExam={() => this.setExam()}
                            setChangeSchedule={() => this.setChangeSchedule()}
                            handleOnChange={(index,e) => this.handleOnChange(index,e)}
                            changePage={(ce) => this.changePage(ce)} page={this.state.taskPpage}
                            datas={this.props.datas}
                            value={this.state.value}
                            selectSchedule={this.state.value.selectSchedule}
                            />
                   
                   )
        }else if(this.props.type == 2){
            return(
                    <div></div>
                   )
        }else if(this.props.type == 3){
            return(
                   <Login user={this.props.user} isPopup={this.props.status} action={{sec: (type) => this.sec(type) ,userSignin: (user,sns) => this.props.action.userSignin(user,sns) ,logout: () => this.props.action.logout()}}/>
                   
                   )
        }else if(this.props.type == 4){
            return(
                   <PopupClassRegester isPopup={this.props.status}
                                       action={{popupshow: () => this.props.action.popupshow(),
                                               popupshowMnual: () => this.props.action.popupshowMnual(),
                                               addregesterId:(cd, array) => this.props.action.addregesterId(cd, array),
                                               regester: () => this.props.action.regester(),
                                               getSchedule: (val,position) => this.props.action.getSchedule(val,position)
                                               }}
                                       sceduleDatas = {{APIresult: this.props.sceduleDatas.APIresult, regesterIds: this.props.sceduleDatas.regesterIds, regesterElements: this.props.sceduleDatas.regesterElements}}/>
                   )
        }
    }
    
}


class UserDetail extends Component {
    constructor(props){
        super(props)
        this.state={
            drop:{github:false}
        }
    }
    render(){
        return(
               <div className={this.props.isPopup ? 'popup popup_toggle_effect' : 'popup popup_toggle_effect_de'} >
                    <div className="popup_wrap" onClick={() => this.props.action(1) }></div>
                    <div className="userDetailwhir flex">
                        <div class="userDetailBox">
                            <div className="iconBox flex-jus-center">
                                <div className="userIcon"><img src={this.props.user.imageURL} /></div>
                            </div>
                            <div className="userName flex-jus-center">{this.props.user.name}</div>
                            <div className="flex-jus-center"><div className="userKey flex">{this.props.user.key}</div></div>
                            <div className="flex-jus-center nsB"><div className="nurtureSettingB flex-jus-center">Nurtureの設定</div></div>
                            <div className="menuBox">
                                <a href="https://portal.upex.ce.nihon-u.ac.jp/up/faces/login/Com00501A.jsp" className="menu flex">
                                    <div className="flex-jus-center sPmenuIcon"><FontAwesomeIcon style={exLink} icon={faExternalLinkAlt} /></div>
                                    日本大学工学部ポータルサイト
                                </a>
                                <a href="https://classroom.google.com/u/0/h" className="menu flex">
                                    <div className="flex-jus-center sPmenuIcon"><FontAwesomeIcon style={githubIcon} icon={faUsers} /></div>
                                    GoogleClassroom
                                </a>
                                <a href="https://calendar.google.com/calendar/" className="menu flex">
                                    <div className="flex-jus-center sPmenuIcon"><FontAwesomeIcon style={githubIcon} icon={faCalendarAlt} /></div>
                                        Googleカレンダー
                                </a>
                                <div className="menu flex" onClick={() => this.setState({drop:{github:!this.state.drop.github}})}>
                                    <div className="flex-jus-center sPmenuIcon"><FontAwesomeIcon style={githubIcon} icon={faGithub} /></div>
                                    N:urture Githubレポジトリ
                                </div>
                                <div className={this.state.drop.github ? 'toggle_effect' : 'toggle_effect_de'} >
                                    <div className="sContentBox">
                                        <p>N:urtureは、フロントエンド、バックエンドの全てのソースコードを公開しています。</p>
                                        <p>N:urture（web版)の主な使用言語はフロントエンド: React、JSX バックエンド: Java、Ruby(API)です。</p>
                                        <a href="https://github.com/TakumiHiguchi/Nurture-front" className="nurtureGithubB flex-jus-center">N:urture-front-end Repository</a>
                                        <a href="https://github.com/TakumiHiguchi/Nurture-backendAPI" className="nurtureGithubB flex-jus-center">N:urture-API Repository</a>
                                    </div>
                                </div>
                                <div className="menu flex">
                                    <div className="flex-jus-center sPmenuIcon"><FontAwesomeIcon style={info} icon={faInfoCircle} /></div>
                                    N:urtureについて
                                </div>
                                <div className="menu flex">
                                    <div className="flex-jus-center sPmenuIcon"><FontAwesomeIcon style={info} icon={faBook} /></div>
                                    API
                                </div>
                                <GoogleLogout
                                  clientId="653992313170-okt2tfmukp5eg4s4g8fiaf6u3261a0ov.apps.googleusercontent.com"
                                  render={renderProps => (
                                    <div className="menu flex" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                        <div className="flex-jus-center sPmenuIcon"><FontAwesomeIcon style={exLogout} icon={faSignOutAlt} /></div>
                                        ログアウト
                                    </div>
                                  )}
                                  buttonText="Logout"
                                        onLogoutSuccess={() => this.props.logout()}
                                />
                                
                                
                            </div>
                        </div>
                       <div class="newsBox">
                           <h2 className="flex-jus-center">{this.props.user.mes}</h2>
                           
                       </div>
                    </div>
                </div>
               
        )
    }
    
}

const Login = (props) => {
    if(props.user.session.length > 0){
        return(
               <UserDetail isPopup={props.isPopup} action={() => props.action.sec(0)} user={props.user} logout={() => props.action.logout()}/>
               
        )
    }else{
        return(
               <div className={props.isPopup ? 'popup popup_effect' : 'popup popup_effect_de'} >
                    <div className="popup_wrap" ></div>
                    <div className="logwhir">
                        <div class="her-right">
                            <h2>N:urture</h2>
                            <p class="clx">今すぐログインして、自分の予定を管理したり、タスクを追加してみたりしましょう。</p>
                            <GoogleAuthentication action={(user,sns) => props.action.userSignin(user,sns)}/>
                            <p class="ghi hrm"><span>または</span></p>
                            <a class="linkBox-twitter hrm" href=""><FontAwesomeIcon style={twitterIcon} icon={faTwitter} /> twitterでログイン</a>
                            <a class="linkBox-line hrm" href=""><FontAwesomeIcon style={lineIcon} icon={faLine} /> Lineでログイン</a>
                            <div class="new_user" >
                                <p class="cls">ログインすることにより、N:urture利用規約、データーに関するポリシーに同意したものとみなされます。</p>
                                <p class="alg">アカウントをお持ちではありませんか？<p onClick={() => props.action.sec(1) }>保存しないで利用する</p></p>
                            </div>
                        </div>
                    </div>
                </div>
               
        )
    }
    
}

const AddTask = (props) => {
    if(props.page == 0){
        return(
            <div className={props.isPopup ? 'popup popup_effect' : 'popup popup_effect_de'} >
                <div className="popup_wrap" onClick={() => props.action() }></div>
                <div className="whir no-select">
                    <h2 className="add_scedule">予定を追加</h2>
                    <div className="pageIndexBox flex">
                        <div onClick={() => props.changePage(0)} className="aTindexactive">タスク</div>
                        <div onClick={() => props.changePage(1)}>試験</div>
                        <div onClick={() => props.changePage(2)}>授業の変更</div>
                    </div>
                    <div className="pcePopup-item adTaskbody">
                        <input type="text" placeholder="タスク名を入力（必須）" className="removeCss formInput task-input" onChange={e => props.handleOnChange("taskTitle",e)} value={props.value.taskTitle}/>
                        <div><FontAwesomeIcon icon={faClock} style={clock} /><div className="calpointer"><Calender action={(date) => props.handleOnChange("taskDate",date)} key={"dscal0"}/></div>
                        <DDMposition element={props.value.position} action={(val) => props.handleOnChange("position",val)} key={"page1DDM"}/>
                        </div>
                    </div>
                    
                    <TlEditor onChange={(val) => props.handleOnChange("taskCont",val)} placeholder={"タスクの内容を入力"}/>
                    <div className="infBox flex-jus-center cd">
                        <div className="submitBox flex-jus-center ">
                            <div className="btn-submit-sub fa-scedule-submit" onClick={() => props.action()}>キャンセル</div>
                            <div className="btn-submit fa-scedule-submit" onClick={() => props.setTask()}>タスクを追加</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }else if (props.page == 1){
        return(
            <div className={props.isPopup ? 'popup popup_effect' : 'popup popup_effect_de'} >
                <div className="popup_wrap" onClick={() => props.action() }></div>
                <div className="whir no-select">
                    <h2 className="add_scedule">予定を追加</h2>
                    <div className="pageIndexBox flex">
                        <div onClick={() => props.changePage(0)}>タスク</div>
                        <div onClick={() => props.changePage(1)} className="aTindexactive">試験</div>
                        <div onClick={() => props.changePage(2)}>授業の変更</div>
                    </div>
                    <div className="pcePopup-item adTaskbody">
                        <DDMschedule type={2} data={props.datas.schedules} fLabel={"試験がある授業を選択"} action={(val) => props.handleOnChange("examTitle",val.title)} key={"DDMschedule1"}/>
                        <div>
                            <FontAwesomeIcon icon={faClock} style={clock} />
                            <div className="calpointer"><Calender action={(date) => props.handleOnChange("examDate",date)} key={"dscal1"}/></div>
                            <DDMposition element={props.value.position} action={(val) => props.handleOnChange("position",val)} key={"page2DDM"}/>
                        </div>
                    </div>
                    <TlEditor onChange={(val) => props.handleOnChange("examCont",val)} placeholder={"試験の内容を入力"}/>
                    <div className="infBox flex-jus-center cd">
                        <div className="submitBox flex-jus-center ">
                            <div className="btn-submit-sub fa-scedule-submit" onClick={() => props.action()}>キャンセル</div>
                            <div className="btn-submit fa-scedule-submit" onClick={() => props.setExam()}>試験を追加</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }else if (props.page == 2){
        let semesNum = 0
        if(props.selectSchedule.position !== void 0){
            if(props.selectSchedule.semester != "前学期"){
                semesNum = 1;
            }
        }
        return(
            <div className={props.isPopup ? 'popup popup_effect' : 'popup popup_effect_de'} >
                <div className="popup_wrap" onClick={() => props.action() }></div>
                <div className="whir no-select">
                    <h2 className="add_scedule">予定を追加</h2>
                    <div className="pageIndexBox flex">
                        <div onClick={() => props.changePage(0)}>タスク</div>
                        <div onClick={() => props.changePage(1)}>試験</div>
                        <div onClick={() => props.changePage(2)} className="aTindexactive">授業の変更</div>
                    </div>
                    <div className="pcePopup-item adTaskbody">
                        <div style={p2head}>変更する授業と日時</div>
                        <div style={beforeBox}>
                            <DDMschedule type={2} data={props.datas.schedules} fLabel={"変更する授業を選択"} action={(val) => props.handleOnChange("selectSchedule",val)} key={"DDMschedule2"}/>
                            
                            {props.selectSchedule.position !== void 0 &&
                                <div>
                                    <FontAwesomeIcon icon={faClock} style={clock} />
                                    <div className="calpointer"><ExCalender action={(date) => props.handleOnChange("changeScheduleBeforeDate",date)} select={parseInt(props.selectSchedule.position / 6)} semesterMinDate={props.datas.semesterDate[semesNum]} semesterMaxDate={props.datas.semesterDate[semesNum + 2]}/></div>
                                </div>
                            }
                            
                        </div>
                        <div style={p2head}>授業の変更先日時</div>
                        <div style={beforeBox}>
                            <FontAwesomeIcon icon={faClock} style={clock} />
                            <div className="calpointer"><Calender action={(date) => props.handleOnChange("changeScheduleAfterDate",date)} key={"dscal2"}/></div>
                            <DDMposition element={props.value.position} action={(val) => props.handleOnChange("position",val)} key={"page2DDM"}/>
                            <div style={p2inner}>ここで選択された日時をもとに授業を変更します。変更前の授業は、表示されなくなります。</div>
                            <div style={p2inner}>詳しくは、ヘルプをご覧ください。</div>
                        </div>
                        
                    </div>
                    <div className="infBox flex-jus-center cd fa-df-uo">
                        <div className="submitBox flex-jus-center ">
                            <div className="btn-submit-sub fa-scedule-submit" onClick={() => props.action()}>キャンセル</div>
                            <div className="btn-submit fa-scedule-submit" onClick={() => props.setChangeSchedule()}>授業を追加</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
}



class PopupClassRegester extends Component{
    constructor(props){
        super(props)
        this.state={
            moreSearch: false
            
        }
    }
    _esGetsc(event){
        let val = event.target.value;
        this.props.action.getSchedule(val,"");
    }
    togglesh(){
        this.setState({moreSearch: !this.state.moreSearch})
    }
    render(){
        const dayString=["月","火","水","木","金","土","日"];
        let k = 0;
        const {APIresult, regesterIds, regesterElements} = this.props.sceduleDatas;
        return(
               <div className={this.props.isPopup ? 'popup popup_effect' : 'popup popup_effect_de'} >
               <div className="popup_wrap" onClick={() => this.props.action.popupshow() }></div>
                    <div className="whir no-select">
                        <h2 className="add_scedule">授業の追加</h2>
                        <input type="text" placeholder="授業名や科目番号で検索" className="removeCss searchInput adSheduleInput"
                            onChange={(e) => this._esGetsc(e)} onBlur={(e) => this._esGetsc(e)}
                        />
                        <div className={!this.state.moreSearch ? 'toggle_effect searchBox flex-align-center bgHyu' : 'toggle_effect_de searchBox flex bgHyu'} onClick={() => this.togglesh()}>
                            <div className="moreSearchIb flex-jus-center">もっと詳しく検索する <FontAwesomeIcon style={pmArrow} icon={faChevronRight}/></div>
                        </div>
                        <div className={this.state.moreSearch ? 'toggle_effect searchBox flex' : 'toggle_effect_de searchBox flex'} >
                            <DDMsearchPosition />
                            <div className="flex-jus-center crossSC" onClick={() => this.togglesh()}><FontAwesomeIcon icon={faTimes} style={pmcr}/></div>
                        </div>
                        <div className="scedulesBox">
                           {APIresult.map((data,index) =>
                                <div className="fa-schedule-enm flex" key={data.CoNum + data.title + data.id + index} onClick={() => this.props.action.addregesterId(data.id, data)}>
                                    <div className="checkBoxlap">
                                        <div className="checkBox"><div className={regesterIds.indexOf(data.id) >= 0 ? "checkBoxInner cBIactive" : "checkBoxInner"}></div></div>
                                                      
                                    </div>
                                    <div className="sceduleDataBox">
                                          <div className="sceduleName">
                                            {data.title}
                                          </div>
                                          <div className="scheduleSubdata">
                                              {data.CoNum}・{data.semester}・{dayString[Math.floor(data.position / 6)]}曜 {data.position % 6 + 1}講時
                                          </div>
                                          <div className="scheduleSubdata">
                                              {data.status}
                                          </div>
                                          <div className="scheduleSubdata">
                                              {data.teacher}
                                          </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="infBox">
                            <div className="flex fa-reges-elementBox">
                                <div className="fa-reges-h">選択した授業</div>
                                <div className="flex fa-reges-elementInner">
                                   {regesterElements.map((element) =>
                                        <div className="reges-schedule" key={"regester" + element.CoNum + element.title + element.id} onClick={() => this.props.action.addregesterId(element.id, element)}>
                                            {element.title} <FontAwesomeIcon icon={faTimes} />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="submitBox flex-jus-center">
                                                                                      
                            <div className="btn-submit-sub fa-scedule-submit" onClick={() => this.props.action.popupshowMnual()}>手動で授業を追加</div>
                            <div className="btn-submit fa-scedule-submit" onClick={() => this.props.action.regester()}>選択した授業を追加</div>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}

class Calender extends Component {
     constructor(props){
         super(props)
         this.state={
             startDate: new Date()
         }
     }
  handleChange = date => {
    this.setState({
      startDate: date
    });
      this.props.action(this.parseAsMoment(date).format('YYYY/MM/DD'));
  };
  parseAsMoment = (dateTimeStr) => {
    return moment.utc(dateTimeStr, 'YYYY-MM-DDTHH:mm:00Z', 'ja').utcOffset(9)
  }
 
  render() {
    return (
      <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
        locale="ja"
        customInput={
          <div>
            {this.parseAsMoment(this.state.startDate).format('YYYY年 MM月 DD日')}
          </div>
        }
      />
    );
  }
}

class ExCalender extends Component {
     constructor(props){
         super(props)
         this.state={
             startDate: new Date()
         }
     }
  handleChange = date => {
    this.setState({
      startDate: date
    });
      this.props.action(this.parseAsMoment(date).format('YYYY/MM/DD'));
  };
  parseAsMoment = (dateTimeStr) => {
    return moment.utc(dateTimeStr, 'YYYY-MM-DDTHH:mm:00Z', 'ja').utcOffset(9)
  }
  render() {
      const isWeekday = date => {
          let select = this.props.select +1;
          if(select === 7)select = 0;
          const day = date.getDay();
          return day === select;
      };
    return (
      <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
        locale="ja"
        filterDate={isWeekday}
            minDate={new Date(this.props.semesterMinDate)}
            maxDate={new Date(this.props.semesterMaxDate)}
            style={exdp}
        customInput={
          <div>
            {this.parseAsMoment(this.state.startDate).format('YYYY年 MM月 DD日')}
          </div>
        }
      />
    );
  }
}
                                                                                      
