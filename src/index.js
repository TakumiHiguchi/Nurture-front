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

class Nurture extends Component {
    constructor(props){
        super(props)
        this.state = {
            page:"week",
            popup:false,
            caDatas: {mon:[0,2,3,4,5,6,7], tue:[1,0,0,0,0,0,0], wed:[2,0,0,0,0,0,0], thu:[3,0,0,0,0,0,0], fri:[4,0,0,0,0,0,0]},
            schedules:[
                {id:1, title:"人工知能1" ,CoNum:"G610628101" ,teacher:"和泉　勇治" ,semester:"Fh"　,position:0 ,grade:3 ,status: "コース選択必修 コース選択"}
            ],
            seSchedule: {start_date:1,end_date:2}
        }
    }
    PopupMenu() {
        this.setState({popup: !this.state.popup});
    }
    render(){
        return(
               <div>
                    <Header actionShow={(cs) => this.PopupMenu(cs)}/>
                    <div className="flex-jus-between fa-rap">
                        <Sidebar data={this.state.caDatas}/>
                        <Body pageData={this.state.page}/>
                        <PopupMenu isPopup={this.state.popup} actionShow={() => this.PopupMenu()} sceduleDatas = {this.state.schedules}/>
                    </div>
               </div>
        )
    }
}
const Header = (props) => {
    return(
           <header className="fa-header flex-jus-between">
               <h1 className="fa-top-h1">N:urture</h1>
               <div className="header-right" onClick={() => props.actionShow()}><i className="op_plus"></i></div>
           </header>
    )
}
const Body = (page) => {
    const WeekLine = () => {
        return(
            <div className="fa-sceduleLine">
                    <div className="fa-BT-scedule"></div>
                    <div className="flex-jus-center fa-class-sceduleContainer">
                        <div className="fa-class-scedule"></div>
                    </div>
                    <div className="fa-BT-scedule"></div>
                    <div className="flex-jus-center fa-class-sceduleContainer">
                        <div className="fa-class-scedule"></div>
                    </div>
                    <div className="fa-BT-scedule"></div>
                    <div className="flex-jus-center fa-class-sceduleContainer">
                        <div className="fa-class-scedule"></div>
                    </div>
                    <div className="fa-BT-scedule"></div>
                    <div className="flex-jus-center fa-class-sceduleContainer">
                        <div className="fa-class-scedule"></div>
                    </div>
                    <div className="fa-BT-scedule"></div>
                    <div className="flex-jus-center fa-class-sceduleContainer">
                        <div className="fa-class-scedule"></div>
                    </div>
                    <div className="fa-BT-scedule"></div>
                    <div className="flex-jus-center fa-class-sceduleContainer">
                        <div className="fa-class-scedule"></div>
                    </div>
                    <div className="fa-BT-scedule"></div>
                    <div className="flex-jus-center fa-class-sceduleContainer">
                        <div className="fa-class-scedule"></div>
                    </div>
                    <div className="fa-BT-scedule"></div>
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
               <div className="fa-timeline"><div className="fa-BT-time"><div className="fab-time">9:00</div></div><div className="fa-class-time"><div className="fab-time">10:30</div></div><div className="fa-BT-time"><div className="fab-time">10:40</div></div><div className="fa-class-time"><div className="fab-time">12:10</div></div><div className="fa-BT-time"><div className="fab-time">13:00</div></div><div className="fa-class-time"><div className="fab-time">14:30</div></div><div className="fa-BT-time"><div className="fab-time">14:40</div></div><div className="fa-class-time"><div className="fab-time">16:10</div></div><div className="fa-BT-time"><div className="fab-time">16:20</div></div><div className="fa-class-time"><div className="fab-time">17:50</div></div><div className="fa-BT-time"><div className="fab-time">18:00</div></div><div className="fa-class-time"><div className="fab-time">19:30</div></div><div className="fa-BT-time"><div className="fab-time">19:40</div></div><div className="fa-class-time"><div className="fab-time">21:10</div></div></div>
        )
    }
    if(page.pageData == "week"){
        return(
               <main className="fa-mainContainer">
                   <DateBox />
                   <div className="flex-jus-between fa-scedule">
                        <TimeBox />
                        <WeekLine /><WeekLine /><WeekLine /><WeekLine /><WeekLine /><WeekLine /><WeekLine />
                   </div>
               </main>
        )
    }
}
const PopupMenu = (props) => {
        return(
                <div className={props.isPopup ? 'popup popup_effect' : 'popup popup_effect_de'} >
                    <div className="popup_wrap" onClick={() => props.actionShow() }></div>
                    <div className="whir">
                        <h2 className="add_scedule">授業の追加</h2>
                        <input type="text" placeholder="授業名や科目番号で検索" className="removeCss searchInput adSheduleInput"/>
                        <div className="scedulesBox">
                        </div>
                        <div class="infBox">
                        </div>
                    </div>
                </div>
        )
}



const Sidebar = (props) => {
    const {mon, tue, wed, thu, fri} = props.data
    return(
        <aside className="fa-sideContainer">
           
           
        </aside>
           //{mon.map((data) =>
           //         data < 0 ? null :
           //         <div><div>{data}</div></div>
           //)}
    )
}
Sidebar.propTypes = {
    data:PropTypes.object.isRequired
}




ReactDOM.render(
    <Nurture />,
    document.getElementById('root')
)









// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
