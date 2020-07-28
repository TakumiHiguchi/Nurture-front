import React, { Component,useState } from 'react';

import './setting.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //fontaweresomeのインポート
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";//矢印アイコン

import Sidebar from './SettingSidebar'
import Body from './SettingBody'
import Confirmation from './Popup/Confirmation'

const FASiconsstyle = {
    arrowLeft:{
        fontSize:"1em"
    },
    clock :{
        fontSize:"1.1em",
        margin:"0 5 0 0"
    },
    clock_lp :{
        fontSize:"1.1em",
        margin:"0 15 0 0"
    }
}

export default class SettingPage extends Component {
    constructor(props){
        super(props);
        this.state={
            page: 1,
            calPage:1,
            calendarDelete:{popup:false,submit:"",cancel:"",main:""},
            changePage:false,
            targetCalendar:[]
        }
    }
    
    changePage(index,page){
        switch(index){
            case "page" :
                this.setState({page:page});break;
            case "cal" :
                this.setState({calPage:page});break;
            
        }
        this.setState({changePage:true});
    }
    calendarDelete(submit,cancel,main,target){
        let ins = this.state.calendarDelete;
        ins.popup = !ins.popup;
        ins.submit = submit;
        ins.cancel = cancel;
        ins.main = main;
        this.setState({calendarDelete:ins});
        this.setState({targetCalendar:target});
    }
    cancel(){
        this.calendarDelete("","","",[]);
    }
    submit(){
        this.props.apiFunction.calendar_destroy(this.state.targetCalendar)
        this.calendarDelete("","","",[]);
    }
    
    render(){
        
        return(
               <div className={this.props.status ? 'popup popup_effect' : 'popup popup_effect_de'} >
                <div className="settingWhir no-select">
                    <h2 className="setting_h2 flex-align-center" >
                        <div className="backButtonBlock flex-jus-center" onClick={() => this.props.action.PopupToggle("setting") }>
                            <FontAwesomeIcon icon={faArrowLeft} style={FASiconsstyle.arrowLeft} />
                        </div>
                        設定
                    </h2>
                    <div className="flex">
                        <Sidebar action={(index,page) => this.changePage(index,page)} page={this.state} calendar={this.props.calendar}/>
                        <Body element={{user:this.props.element.user,semesterDate: this.props.element.semesterDate,page:this.state.page}}
                            action={{setGrade: (select) => this.props.action.setGrade(select),
                                    logout:() => this.props.action.logout(),
                                    calendarDelete:(submit,cancel,main,target) => this.calendarDelete(submit,cancel,main,target)
                                    }}
                            regesSemesterDate = {(cal,date,position) => this.props.regesSemesterDate(cal,date,position)}
                            calendar={this.props.calendar}
                            calendarSearchResult = {this.props.calendarSearchResult}
                            page={this.state}
                            apiFunction={this.props.apiFunction}
                            changePage={{value:this.state.changePage,action:() => this.setState({changePage:false})}}
                        />
                    </div>
                    <Confirmation 
                        isPopup={this.state.calendarDelete.popup}
                        action={{cancel:() => this.cancel(),submit:() => this.submit()}}
                        label={this.state.calendarDelete}
                    />
                </div>
            </div>
        )
    }
}