import React, { Component } from 'react';
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import moment from 'moment'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //fontaweresomeのインポート
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faGoogle} from "@fortawesome/free-brands-svg-icons";//Lineアイコン
import { faTwitter } from "@fortawesome/free-brands-svg-icons"; //twitterアイコン
import { faLine } from "@fortawesome/free-brands-svg-icons"; //lineアイコン
import { faTimes } from "@fortawesome/free-solid-svg-icons";//minusアイコン

import DDMschedule from './DDMschedule'
import GoogleAuthentication from './GoogleAuthentication'

//datepicker
import ja from 'date-fns/locale/ja';
registerLocale('ja', ja)



const clock = {
    fontSize:"1em",
    margin:"0 15 0 5"
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



export default class Popup extends Component {
    constructor(props){
        super(props)
        this.state={
            taskPpage:0,
            selectDate: new Date()
        }
    }
    changePage(no){
        this.setState({taskPpage:no});
    }
    sec(type){
        if(type === 1){
            this.props.action.PopupToggle("login");
            this.props.action.PopupToggle("login-dn");
        }
    }
    
    render(){
        if(this.props.type == 1){
            return(
                   <AddTask isPopup={this.props.status} action={() => this.props.action.PopupToggle("addTask")}
                            changePage={(ce) => this.changePage(ce)} page={this.state.taskPpage}
                            datas={{schedules:this.props.datas.schedules}}
                            />
                   
                   )
        }else if(this.props.type == 2){
            return(
                   <Setting isPopup={this.props.status} action={() => this.props.action.PopupToggle("setting")}/>
                   
                   )
        }else if(this.props.type == 3){
            return(
                   <Login isPopup={this.props.status} action={(type) => this.sec(type)}/>
                   
                   )
        }else if(this.props.type == 4){
            return(
                   <PopupClassRegester isPopup={this.props.status}
                                       action={{popupshow: () => this.props.action.popupshow(),
                                               popupshowMnual: () => this.props.action.popupshowMnual(),
                                               addregesterId:(cd, array) => this.props.action.addregesterId(cd, array),
                                               regester: () => this.props.action.regester(),
                                               getSchedule: (val) => this.props.action.getSchedule(val)
                                               }}
                                       sceduleDatas = {{APIresult: this.props.sceduleDatas.APIresult, regesterIds: this.props.sceduleDatas.regesterIds, regesterElements: this.props.sceduleDatas.regesterElements}}/>
                   )
        }
    }
    
}
const Setting = (props) => {
    return(
           <div className={props.isPopup ? 'popup popup_effect' : 'popup popup_effect_de'} >
                <div className="popup_wrap" onClick={() => props.action() }></div>
                <div className="whir no-select">
                    <h2 className="add_scedule">設定</h2>
                    <div className="pageIndexBox flex">
                        <div className="aTindexactive">授業開始日の登録</div>
                        <div>学年の登録</div>
                        <div>設定1</div>
                        <div>設定2</div>
                        <div>設定3</div>
                    </div>
                    <div className="pcePopup-item adTaskbody">
                        <div>前学期</div>
                        <div className="flex-algin-center">
                            <FontAwesomeIcon icon={faClock} style={clock} />
                            <div className="calpointer"><Calender /></div> 〜 <div className="calpointer"><Calender /></div>
                        </div>
                        <div>後学期</div>
                        <div className="flex-algin-center">
                            <FontAwesomeIcon icon={faClock} style={clock} />
                            <div className="calpointer"><Calender /></div> 〜 <div className="calpointer"><Calender /></div>
                        </div>
                    </div>
                </div>
            </div>
           
    )
}

const Login = (props) => {
    return(
           <div className={props.isPopup ? 'popup popup_effect' : 'popup popup_effect_de'} >
                <div className="popup_wrap" ></div>
                <div className="logwhir">
                    <div class="her-right">
                        <h2>N:urture</h2>
                        <p class="clx">今すぐログインして、自分の予定を管理したり、タスクを追加してみたりしましょう。</p>
                        <GoogleAuthentication />
                        <p class="ghi hrm"><span>または</span></p>
                        <a class="linkBox-twitter hrm" href=""><FontAwesomeIcon style={twitterIcon} icon={faTwitter} /> twitterでログイン</a>
                        <a class="linkBox-line hrm" href=""><FontAwesomeIcon style={lineIcon} icon={faLine} /> Lineでログイン</a>
                        <div class="new_user" >
                            <p class="cls">ログインすることにより、N:urture利用規約、データーに関するポリシーに同意したものとみなされます。</p>
                            <p class="alg">アカウントをお持ちではありませんか？<p onClick={() => props.action(1) }>保存しないで利用する</p></p>
                        </div>
                    </div>
                </div>
            </div>
           
    )
    
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
                        <input type="text" placeholder="タスク名を入力（必須）" className="removeCss formInput task-input"/>
                        <div className=""><FontAwesomeIcon icon={faClock} style={clock} /><div className="calpointer"><Calender /></div>
                            <select class="swal2-select">
                                <option value="" disabled="">クリックして講時を選択</option>
                                <option value="1">1講時</option>
                                <option value="2">2講時</option>
                                <option value="3">3講時</option>
                                <option value="4">4講時</option>
                                <option value="5">5講時</option>
                                <option value="5">6講時</option>
                            </select>
                        </div>
                    </div>
                    <textarea className="removeTACss task-textarea" placeholder="タスクの内容を入力">
                    </textarea>
                    <div className="infBox flex-jus-center cd">
                        <div className="submitBox flex-jus-center ">
                            <div className="btn-submit-sub fa-scedule-submit" >キャンセル</div>
                            <div className="btn-submit fa-scedule-submit">タスクを追加</div>
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
                        <DDMschedule type={2} data={props.datas.schedules}/>
                        <div className="">
                            <FontAwesomeIcon icon={faClock} style={clock} />
                            <div className="calpointer"><Calender /></div>
                            <select class="swal2-select">
                                <option value="" disabled="">クリックして講時を選択</option>
                                <option value="1">1講時</option>
                                <option value="2">2講時</option>
                                <option value="3">3講時</option>
                                <option value="4">4講時</option>
                                <option value="5">5講時</option>
                                <option value="5">6講時</option>
                            </select>
                        </div>
                    </div>
                    <textarea className="removeTACss task-textarea" placeholder="試験の内容を入力">
                    </textarea>
                    <div className="infBox flex-jus-center cd">
                        <div className="submitBox flex-jus-center ">
                            <div className="btn-submit-sub fa-scedule-submit" >キャンセル</div>
                            <div className="btn-submit fa-scedule-submit">試験を追加</div>
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
                    <div className="pcePopup-item adTaskbody">
                       <input type="text" placeholder="授業名を入力（必須）" className="removeCss formInput task-input"/>
                       <input type="text" placeholder="教師名を入力（必須）" className="removeCss formInput task-input"/>
                       <input type="text" placeholder="学年を入力（必須）" className="removeCss formInput task-input"/>
                        <div>
                            <FontAwesomeIcon icon={faClock} style={clock} />
                            <div className="calpointer"><Calender /></div>
                            <select class="swal2-select">
                                <option value="" disabled="">クリックして講時を選択</option>
                                <option value="1">1講時</option>
                                <option value="2">2講時</option>
                                <option value="3">3講時</option>
                                <option value="4">4講時</option>
                                <option value="5">5講時</option>
                                <option value="5">6講時</option>
                            </select>
                        </div>
                    </div>
                    <div className="infBox flex-jus-center cd fa-df-uo">
                        <div className="submitBox flex-jus-center ">
                            <div className="btn-submit-sub fa-scedule-submit" >キャンセル</div>
                            <div className="btn-submit fa-scedule-submit">授業を追加</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
}

class Calender extends Component {
  state = {
    startDate: new Date()
  };
 
  handleChange = date => {
    this.setState({
      startDate: date
    });
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

class PopupClassRegester extends Component{
    constructor(props){
        super(props)
    }
    _esGetsc(event){
        let val = event.target.value;
        this.props.action.getSchedule(val);
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
                        <div className="scedulesBox">
                           {APIresult.map((data) =>
                                <div className="fa-schedule-enm flex" key={data.CoNum + data.title + data.id} onClick={() => this.props.action.addregesterId(data.id, data)}>
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
