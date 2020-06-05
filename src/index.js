import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import './header.scss';
import './mainstyle.scss';
import './sidebar.scss';
import './toppage.scss';

import Register from './Register' //後で消す
import * as serviceWorker from './serviceWorker';

const WeekLine = (props) => {
       return(
           <div className="fa-sceduleLine">
              {props.daySchedule.map((data) =>
                                            <div>
                                                <div className="fa-BT-scedule"></div>
                                                <div className="flex-jus-center fa-class-sceduleContainer">
                                                    {data == 0 ?
                                                        <div className="fa-class-scedule flex-jus-center" onClick={() => props.action.popupshow() }>
                                                            <div className="status"></div>
                                                        </div>
                                                                :
                                                        <div className="fa-class-scedule">
                                                            <div>
                                                                <div>{data.title}</div>
                                                                <div className="classroom">107</div>
                                                                <div className="status">{data.status}</div>
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
               <div className="fa-timeline">
                   
               </div>
                   <div className="fa-sceduleLine">
           
                   </div>
                   <div className="fa-sceduleLine">
                       
                   </div>
                   <div className="fa-sceduleLine">
                       
                   </div>
                   <div className="fa-sceduleLine">
                       
                   </div>
                   <div className="fa-sceduleLine">
                       
                   </div>
                   <div className="fa-sceduleLine">
                       
                   </div>
                   <div className="fa-sceduleLine">
                       
                   </div>
           </div>
    )
}
const TimeBox = () => {
    return(
           <div className="fa-timeline"><div className="fa-BT-time"><div className="fab-time">9:00</div></div><div className="fa-class-time"><div className="fab-time">10:30</div></div><div className="fa-BT-time"><div className="fab-time">10:40</div></div><div className="fa-class-time"><div className="fab-time">12:10</div></div><div className="fa-BT-time"><div className="fab-time">13:00</div></div><div className="fa-class-time"><div className="fab-time">14:30</div></div><div className="fa-BT-time"><div className="fab-time">14:40</div></div><div className="fa-class-time"><div className="fab-time">16:10</div></div><div className="fa-BT-time"><div className="fab-time">16:20</div></div><div className="fa-class-time"><div className="fab-time">17:50</div></div><div className="fa-BT-time"><div className="fab-time">18:00</div></div><div className="fa-class-time"><div className="fab-time">19:30</div></div></div>
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

const PopupMenu = (props) => {
    const dayString=["月","火","水","木","金"]
    let k = 0
    const {APIresult, regesterIds, regesterElements} = props.sceduleDatas
        return(
                <div className={props.isPopup ? 'popup popup_effect' : 'popup popup_effect_de'} >
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
                                            {element.title}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="submitBox flex-jus-center">
                                <div className="btn-submit-sub fa-scedule-submit">手動で授業を追加</div>
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
        
        var tbl = new Array(5);
        for(let y = 0; y < 5; y++) {
          tbl[y] = new Array(6).fill(0);
        }
        
        this.state = {
            page:"week",
            popup:false,
            regesterIds:[],
            regesterElements:[],
            caDatas: tbl,
            schedules:[
                {id:1, title:"人工知能1" ,CoNum:"G610628101" ,teacher:"和泉　勇治" ,semester:"前学期"　,position:0 ,grade:3 ,status: "コース選択必修 コース選択"},
                {id:2, title:"人工知能1" ,CoNum:"G610628102" ,teacher:"和泉　勇治" ,semester:"前学期"　,position:11 ,grade:3 ,status: "コース選択必修 コース選択"},
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
        this.setState({popup: !this.state.popup});
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
                    <Header actionShow={(cs) => this.PopupMenu(cs)}/>
                    <div className="flex-jus-between fa-rap no-select">
                        <Sidebar scheduleDatas = {this.state.caDatas} action = {{popupshow: () => this.PopupMenu()}}/>
                        <Body pageData={this.state.page}
                        scheduleDatas={this.state.caDatas}
                        action = {{popupshow: () => this.PopupMenu()}}
                        />
                        <PopupMenu isPopup = {this.state.popup}
                                   action = {{
                                            popupshow: () => this.PopupMenu(),
                                            addregesterId: (cd, array) => this.RegesterId(cd, array),
                                            regester: () => this.Regester()
                                            }}
                                   sceduleDatas = {{APIresult: this.state.schedules, regesterIds: this.state.regesterIds, regesterElements: this.state.regesterElements}}
                        />
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
                        {this.props.scheduleDatas.map((data) =>
                            <WeekLine daySchedule={data} action = {{popupshow: () => this.props.action.popupshow() }}/>
                        )}
                    </div>
                </main>
            )
        }
    }
}

                               


    

const Sidebar = (props) => {
    const dayString=["月","火","水","木","金"]
    return(
        <aside className="fa-sideContainer">
           <div className="warap"></div>
           <div className="timetable">
               {props.scheduleDatas.map((d, i) =>
                    <div className="weekdays-lap">
                        <div className="weekdays">{dayString[i]+"曜日"}</div>
                        {d.map((data, index) =>
                            <div>
                                {data == 0 ?
                                    <div className="fa-schedule-side" onClick={() => props.action.popupshow() } key={"sidebar"+ index + i}><div className="ss-headline">{index+1}講時</div><div className="ss-title">授業なし</div><div className="cszt">クリックして授業を追加</div></div>:
                                    <div className="fa-schedule-side" key={"sidebar"+ index + i}><div className="ss-headline">{index+1}講時</div><div className="ss-title">{data.title}</div><div className="cszt">{data.teacher}</div></div>
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
