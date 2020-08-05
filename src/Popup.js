import React, { Component } from 'react';
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import moment from 'moment'


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //fontaweresomeのインポート
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faGoogle} from "@fortawesome/free-brands-svg-icons";//Lineアイコン
import { faTwitter } from "@fortawesome/free-brands-svg-icons"; //twitterアイコン
import { faGithub } from "@fortawesome/free-brands-svg-icons"; //githubアイコン
import { faLine } from "@fortawesome/free-brands-svg-icons"; //lineアイコン
import { faTimes } from "@fortawesome/free-solid-svg-icons";//minusアイコン
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";//矢印アイコン

import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";//カレンダー


import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";//リンク
import { faSignOutAlt,faBook } from "@fortawesome/free-solid-svg-icons";//サインアウト

import DDMschedule from './DDMschedule'
import DDMcalendar from './dropdownMenu/DDMcalendar'
import DDMposition from './DDMposition'
import GoogleAuthentication from './GoogleAuthentication'
import DDMsearchPosition from './DDMsearchPosition'

import TlEditor from './TlEditor'

import icon from './image/nurture.png';

//datepicker
import ja from 'date-fns/locale/ja';
registerLocale('ja', ja)





const clock = {
    fontSize:"1em",
    margin:"0 15 0 5"
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
            value:{calendarArray:{id:0, name:"クリックしてカレンダーを選択"},calPosition:0,taskTitle:"",taskCont:"",taskDate:d,position:1,examTitle:"",examCont:"",examDate:d,selectSchedule:{},changeScheduleBeforeDate:"",changeScheduleAfterDate:d}
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
        this.props.action.setTask(value, value.calendarArray.id);
        this.props.action.PopupToggle("addTask");
        
        //初期化
        value.taskTitle = "";
        
        this.setState({value:value});
    }
    
    setExam(){
        let value = this.state.value
        
        this.props.action.setExam(value, value.calendarArray.id);
        this.props.action.PopupToggle("addTask");
        
        this.setState({value:value});
    }
    
    setChangeSchedule(){
        let value = this.state.value
        this.props.action.setChangeSchedule(value);
        this.props.action.PopupToggle("addTask");
        
    }
    setCanceled_lecture(){
        const ins ={
            grade: this.props.user.grade,
            date: this.state.value.changeScheduleBeforeDate,
            position: parseInt(this.state.value.selectSchedule.position % 6)
        }
        this.props.apiFunction.canceled_lectureAPI("create", this.state.value.calendarArray.id, ins);
        this.props.action.PopupToggle("addTask");
    }
    handleOnChange(index, e, ...args){
        let ins = this.state.value;

        switch (index){
            case "taskTitle" : ins.taskTitle = e.target.value;break;
            case "taskCont" : ins.taskCont = e;break;
            case "taskDate" : ins.taskDate = e;break;
            case "position" : ins.position = e;break;
            case "examCont" : ins.examCont = e;break;
            case "examDate" : ins.examDate = e;break;
            case "examTitle" : ins.examTitle = e;ins.calendarArray = {id:args[0], name:this.state.value.calendarArray.name};break;
            case "changeScheduleBeforeDate" : ins.changeScheduleBeforeDate = e;break;
            case "changeScheduleAfterDate" : ins.changeScheduleAfterDate = e;break;
            case "selectSchedule" : ins.selectSchedule = e;ins.calendarArray = {id:args[0], name:this.state.value.calendarArray.name};ins.calPosition = args[1];ins.changeScheduleBeforeDate = "";break;
            case "calendar" : ins.calendarArray = {id:e.id, name:e.name};break;
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
                            setCanceled_lecture={() => this.setCanceled_lecture()}
                            handleOnChange={(index,e, cal_id, selectCal) => this.handleOnChange(index,e, cal_id, selectCal)}
                            changePage={(ce) => this.changePage(ce)} page={this.state.taskPpage}
                            datas={this.props.datas}
                            value={this.state.value}
                            selectSchedule={this.state.value.selectSchedule}
                            calendar={this.props.calendar}
                            user={this.props.user}
                            />
                   
                   )
        }
    }
    
}





//持ってない場合の処理のやつ
//<p class="alg">アカウントをお持ちではありませんか？<p onClick={() => props.action.sec(1) }>保存しないで利用する</p></p>

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
                    <div className="pcePopup-item">
                        <input type="text" placeholder="タスク名を入力（必須）" className="removeCss formInput task-input" onChange={e => props.handleOnChange("taskTitle",e)} value={props.value.taskTitle}/>
                        <div>
                            <FontAwesomeIcon icon={faClock} style={clock} /><div className="calpointer"><Calender action={(date) => props.handleOnChange("taskDate",date)} key={"dscal0"}/></div>
                            <DDMposition element={props.value.position} action={(val) => props.handleOnChange("position",val)} key={"page1DDM"}/>
                        </div>
                        <div style={{marginTop:"5px"}}>
                            <FontAwesomeIcon icon={faCalendarAlt} style={clock} />
                            <DDMcalendar element={props.value.calendarArray.name} data={props.calendar} action={(val) => props.handleOnChange("calendar",val)} key={"page1DDMcalendar"}/>
                        </div>
                    </div>
                    <div className="TlEditor_task"><TlEditor onChange={(val) => props.handleOnChange("taskCont",val)} placeholder={"タスクの内容を入力"}/></div>
                    
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
                        <div style={{margin:"10px 0 5px 0"}}>
                            <FontAwesomeIcon style={clock} icon={faBook} />
                            <DDMschedule data={props.calendar} user={props.user} fLabel={"試験がある授業を選択"} label={props.value.examTitle} action={(val, cal_id) => props.handleOnChange("examTitle", val.title, cal_id)} key={"DDMschedule1"}/>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faClock} style={clock} />
                            <div className="calpointer"><Calender action={(date) => props.handleOnChange("examDate",date)} key={"dscal1"}/></div>
                            <DDMposition element={props.value.position} action={(val) => props.handleOnChange("position",val)} key={"page2DDM"}/>
                        </div>
                    </div>
                    <div className="TlEditor_exam"><TlEditor onChange={(val) => props.handleOnChange("examCont",val)} placeholder={"試験の内容を入力"}/></div>
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
                    <div className="pcePopup-item" style={{margin:"10px 0 5px 0"}}>
                        <div style={p2head}>変更する授業と日時</div>
                        <div style={beforeBox}>
                        <FontAwesomeIcon style={clock} icon={faBook} />
                        <DDMschedule 
                            data={props.calendar} 
                            user={props.user}
                            fLabel={"授業変更をする授業を選択"} 
                            label={props.value.selectSchedule.title} 
                            action={(val, cal_id, selectCal) => props.handleOnChange("selectSchedule", val, cal_id, selectCal)} 
                            key={"DDMschedule2"}
                        />
                            
                            {props.selectSchedule.position !== void 0 &&
                                <div>
                                    <FontAwesomeIcon icon={faClock} style={clock} />
                                    <div className="calpointer">
                                        <ExCalender 
                                            action={(date) => props.handleOnChange("changeScheduleBeforeDate",date)} 
                                            select={parseInt(props.selectSchedule.position / 6)} 
                                            value={props.value}
                                            calendar={props.calendar}
                                            user={props.user}
                                            key={"p2exCal"}
                                        />
                                    </div>
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

//あとで分割したときに親コンポーネントの値から変更するようにする。
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
  handleChange = date => {
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

    //学期の期間の処理
    let semesterMinDate = 0;
    let semesterMaxDate = 0;
    if(this.props.calendar !== void 0){
        if(this.props.value.selectSchedule.semester != "前学期"){
            semesterMinDate = this.props.calendar[this.props.value.calPosition].semesterPeriod[this.props.user.grade - 1].lateSemester1;
            semesterMaxDate = this.props.calendar[this.props.value.calPosition].semesterPeriod[this.props.user.grade - 1].lateSemester2;
            
        }else{
            semesterMinDate = this.props.calendar[this.props.value.calPosition].semesterPeriod[this.props.user.grade - 1].fhSemester1;
            semesterMaxDate = this.props.calendar[this.props.value.calPosition].semesterPeriod[this.props.user.grade - 1].fhSemester2;
        }
    }
    const changeScheduleBeforeDate = this.props.value.changeScheduleBeforeDate

    return (
      <DatePicker
        selected={changeScheduleBeforeDate == "" ? new Date() : new Date(changeScheduleBeforeDate)}
        onChange={this.handleChange}
        locale="ja"
        filterDate={isWeekday}
        minDate={new Date(semesterMinDate)}
        maxDate={new Date(semesterMaxDate)}
        style={exdp}
        customInput={
          <div>
            {changeScheduleBeforeDate == "" ?
                <>クリックして変更する日付を選択</>
            :
                <>{this.parseAsMoment(new Date(changeScheduleBeforeDate)).format('YYYY年 MM月 DD日')}</>
            }
          </div>
        }
      />
    );
  }
}
                                                                                      
