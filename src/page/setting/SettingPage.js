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
            cData:{popup:false,submit:"",cancel:"",main:"",type:""},
            changePage:false,
            targetCalendar:[],
            targetId:0
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
    ConfirmationPopup(submit,cancel,main,target, type){
        let ins = this.state.cData;
        ins.popup = !ins.popup;
        ins.submit = submit;
        ins.cancel = cancel;
        ins.main = main;
        ins.type = type;
        switch(type){
            case "calDelete" :
                this.setState({targetCalendar:target});
            case "clone" :
                this.setState({targetId:target});
            case "follow" :
                this.setState({targetId:target});
        }
        this.setState({cData:ins});
    }
    cancel(){
        this.ConfirmationPopup("","","",[]);
    }
    submit(type){
        switch(type){
            case "calDelete" :
                console.log(this.state.targetCalendar)
                if(this.state.targetCalendar.user_id != this.state.targetCalendar.author_id){
                    this.props.apiFunction.calendar_share("destroy_follow",this.state.targetCalendar.id);
                }else{
                    this.props.apiFunction.calendar_destroy(this.state.targetCalendar)
                }
                this.setState({calPage:1})
                this.ConfirmationPopup("","","",[]);
                break;
            case "clone":
                this.props.apiFunction.calendar_share("clone",this.state.targetId);
                this.ConfirmationPopup("","","",[]);
                break;
            case "follow":
                this.props.apiFunction.calendar_share("follow",this.state.targetId);
                this.ConfirmationPopup("","","",[]);
                break;
        }
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
                                    ConfirmationPopup:(submit,cancel,main,target,type) => this.ConfirmationPopup(submit,cancel,main,target,type)
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
                        isPopup={this.state.cData.popup}
                        action={{cancel:() => this.cancel(),submit:(type) => this.submit(type)}}
                        label={this.state.cData}
                    />
                </div>
            </div>
        )
    }
}