import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //fontaweresomeのインポート
import { faTwitter } from "@fortawesome/free-brands-svg-icons"; //twitterアイコン
import { faLine } from "@fortawesome/free-brands-svg-icons"; //lineアイコン
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";//plusアイコン
import { faPlus } from "@fortawesome/free-solid-svg-icons";//plusアイコン
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";//minusアイコン
import { faTimes } from "@fortawesome/free-solid-svg-icons";//minusアイコン

//cssのインポート
import './header.scss';
import './mainstyle.scss';
import './sidebar.scss';
import './toppage.scss';
import './Popup.scss';

import Popup from './Popup'
import * as serviceWorker from './serviceWorker';

//css
const pmIcons = {
    fontSize:"1.2em",
    margin:"0 10",
    color:"#00aced",
    cursor: "pointer"
}
const twitterIcon = {
    fontSize:"1.5em",
    margin:"0 15 0 0",
    color:"#00aced",
    cursor: "pointer"
}
const lineIcon = {
    fontSize:"1.5em",
    color:"#00B900",
    cursor: "pointer"
}
const WeekLine = (props) => {
       return(
           <div className="fa-sceduleLine">
              {props.daySchedule.map((data,index) =>
                <div key={"ds" + data +index }>
                    <div className="fa-BT-scedule"></div>
                    <div className="flex-jus-center fa-class-sceduleContainer">
                        {data == 0 ?
                            <div className="fa-class-scedule flex-jus-center" onClick={() => props.action.popupshow() }>
                            <div className="status"></div>
                            </div>
                        :
                            <div className="fa-class-scedule" onClick={() => props.action.popupEdit(data.position)} >
                                <div>
                                    <div>{data.title}</div>
                                    <div className="classroom">107</div>
                                    <div className="status">出席:{props.element.caCount[index][0]} 遅刻:{props.element.caCount[index][1]} 欠席:{props.element.caCount[index][2]}</div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            )}
           </div>
            
       )
   }
const DateBox = () => {
    return(
           <div className="flex-jus-between fa-dateContainer">

           </div>
    )
}
const TimeBox = () => {
    return(
           <div className="fa-timeline"><div className="fa-BT-time"><div className="fab-time">9:00</div></div><div className="fa-class-time"><div className="fab-time">10:30</div></div><div className="fa-BT-time"><div className="fab-time">10:40</div></div><div className="fa-class-time"><div className="fab-time">12:10</div></div><div className="fa-BT-time"><div className="fab-time">13:00</div></div><div className="fa-class-time"><div className="fab-time">14:30</div></div><div className="fa-BT-time"><div className="fab-time">14:40</div></div><div className="fa-class-time"><div className="fab-time">16:10</div></div><div className="fa-BT-time"><div className="fab-time">16:20</div></div><div className="fa-class-time"><div className="fab-time">17:50</div></div><div className="fa-BT-time"><div className="fab-time">18:00</div></div><div className="fa-class-time"><div className="fab-time">19:30</div></div><div className="fa-BT-time"><div className="fab-time">19:40</div></div><div className="fa-class-time"><div className="fab-time">21:10</div></div></div>
    )
}
const Header = (props) => {
    return(
           <header className="fa-header flex-jus-between">
               <h1 className="fa-top-h1">N:urture</h1>
               <div className="header-right" onClick={() => props.actionShow()}><i className="op_plus"></i></div>
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
const PopupClassRegester = (props) => {
    const dayString=["月","火","水","木","金","土","日"]
    let k = 0
    const {APIresult, regesterIds, regesterElements} = props.sceduleDatas
        return(
                <div className={props.isPopup.regester ? 'popup popup_effect' : 'popup popup_effect_de'} >
                    <div className="popup_wrap" onClick={() => props.action.popupshow() }></div>
                    <div className="whir no-select">
                        <h2 className="add_scedule">授業の追加</h2>
                        <input type="text" placeholder="授業名や科目番号で検索" className="removeCss searchInput adSheduleInput"/>
                        <div className="scedulesBox">
                           {APIresult.map((data) =>
                                <div className="fa-schedule-enm flex" key={data.CoNum + data.title + data.id} onClick={() => props.action.addregesterId(data.id, data)}>
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
                                        <div className="reges-schedule" key={"regester" + element.CoNum + element.title + element.id} onClick={() => props.action.addregesterId(element.id, element)}>
                                            {element.title} <FontAwesomeIcon icon={faTimes} />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="submitBox flex-jus-center">
                                <div className="btn-submit-sub fa-scedule-submit" onClick={() => props.action.popupshowMnual()}>手動で授業を追加</div>
                                <div className="btn-submit fa-scedule-submit" onClick={() => props.action.regester()}>選択した授業を追加</div>
                            </div>
                        </div>
                    </div>
                </div>
        )
}
                                                                                      
        

class Nurture extends Component {
    constructor(props){
        super(props)
        
        var tbl = new Array(7);
        for(let y = 0; y < 7; y++) {
          tbl[y] = new Array(6).fill(0);
        }
        var tblc = [...Array(7)].map(k=>[...Array(6)].map(k=>[...Array(3)].map(k=>0)))

        
        this.state = {
            page:"week",
        popup:{regester:false, editSchedule:false,manual: false,addTask:false},
            selectPopup:0,
            regesterIds:[],
            regesterElements:[],
            caDatas: tbl,
            caCount: tblc,
            schedules:[
                {id:1, title:"人工知能1" ,CoNum:"G610628101" ,teacher:"和泉　勇治" ,semester:"前学期"　,position:0 ,grade:3 ,status: "コース選択必修 コース選択"},
                {id:2, title:"人工知能1" ,CoNum:"G610628102" ,teacher:"和泉　勇治" ,semester:"前学期"　,position:41 ,grade:3 ,status: "コース選択必修 コース選択"},
                {id:5, title:"臨床心理家族" ,CoNum:"G610628103" ,teacher:"和泉　勇治" ,semester:"前学期"　,position:1 ,grade:3 ,status: "コース選択必修 コース選択"},
                {id:6, title:"人工知能1" ,CoNum:"G610628103" ,teacher:"和泉　勇治" ,semester:"前学期"　,position:2 ,grade:3 ,status: "コース選択必修 コース選択"},
                {id:7, title:"人工知能1" ,CoNum:"G610628103" ,teacher:"和泉　勇治" ,semester:"前学期"　,position:3 ,grade:3 ,status: "コース選択必修 コース選択"},
                {id:8, title:"人工知能1" ,CoNum:"G610628103" ,teacher:"和泉　勇治" ,semester:"前学期"　,position:6 ,grade:3 ,status: "コース選択必修 コース選択"},
                {id:9, title:"人工知能1" ,CoNum:"G610628103" ,teacher:"和泉　勇治" ,semester:"前学期"　,position:19 ,grade:3 ,status: "コース選択必修 コース選択"},
                {id:10, title:"人工知能1" ,CoNum:"G610628103" ,teacher:"和泉　勇治" ,semester:"前学期"　,position:21 ,grade:3 ,status: "コース選択必修 コース選択"},
                {id:10909, title:"人工知能1" ,CoNum:"G610628104" ,teacher:"和泉　勇治" ,semester:"前学期"　,position:4 ,grade:3 ,status: "コース選択必修 コース選択"}
            ],
            seSchedule: {start_date:1,end_date:2}
            
        }
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
            case "addTask": this.setState({popup: {addTask: !this.state.popup.addTask}});
        }
        
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
    Regester() {
        var regesArray = this.state.caDatas;
        
        for (let i = 0; i < this.state.regesterElements.length; i++) {
            let element = this.state.regesterElements[i]
            let w = Math.floor(element.position / 6)
            let d = (element.position % 6)
                                 
            if(regesArray[w][d] == 0){
                regesArray[w][d] = element
            }
        }
        this.setState({
                      caDatas: regesArray,
                      regesterIds: [],
                      regesterElements: [],
                      })
        this.PopupMenu()
    }
    render(){
        return(
               <div>
                    <Header actionShow={() => this.PopupMenu()}/>
                    <div className="flex-jus-between fa-rap no-select">
                        <Sidebar scheduleDatas = {this.state.caDatas} action = {{popupshow: () => this.PopupMenu(), popupEdit: (ce) => this.PopupCCedit(ce), PopupToggle: (ce) => this.PopupToggle(ce)}}/>
                        <Body pageData={this.state.page}
                            scheduleDatas={this.state.caDatas}
                            element={{caCount: this.state.caCount}}
                            action = {{popupshow: () => this.PopupMenu(),
                                popupEdit: (ce) => this.PopupCCedit(ce)
                            }}
                        />
                        <PopupClassRegester isPopup = {this.state.popup}
                                   action = {{
                                            popupshow: () => this.PopupMenu(),popupshowMnual: () => this.PopupManual(),
                                            addregesterId: (cd, array) => this.RegesterId(cd, array),
                                            regester: () => this.Regester()
                                            }}
                                   sceduleDatas = {{APIresult: this.state.schedules, regesterIds: this.state.regesterIds, regesterElements: this.state.regesterElements}}
                        />
                        <PopupClassEdit isPopup = {this.state.popup}
                                   action = {{
                                            popupshow: (ce) => this.PopupCCedit(ce),
                                            count: (typeNo, count, position) => this.AttendanceCount(typeNo, count, position)
                                            }}
                                   element = {{caDatas: this.state.caDatas[Math.floor(this.state.selectPopup / 6)][this.state.selectPopup % 6],
                                              caCount: this.state.caCount[Math.floor(this.state.selectPopup / 6)][this.state.selectPopup % 6]
                                            }}
                        />
                        <PopupClassManual isPopup = {this.state.popup}
                                    action = {{
                                            popupshow: () => this.PopupManual()
                                            }}
                                                                    
                                                                                     
                        />
                        <Popup type={1} action={{PopupToggle: (ce) => this.PopupToggle(ce)}} status={this.state.popup.addTask}/>

                    </div>
               </div>
                                                                                     
        )
    }
}

                               
class Body extends Component {
    constructor(props){
        super(props)
    }
    
    render(){
        if(this.props.pageData == "week"){
            return(
                <main className="fa-mainContainer">
                    <DateBox />
                    <div className="flex-jus-between fa-scedule">
                        <TimeBox />
                        {this.props.scheduleDatas.map((data,index) =>
                            <WeekLine daySchedule={data} key={"weekLine"+index} action = {{popupshow: () => this.props.action.popupshow(),popupEdit: (ce) => this.props.action.popupEdit(ce) }}
                                element={{caCount: this.props.element.caCount[index]}}
                                                      
                            />
                            
                        )}
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
