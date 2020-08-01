import React, { Component } from 'react';
import moment from 'moment'
import RichTextEditor from 'react-rte';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //fontaweresomeのインポート
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";//矢印アイコン
import { faClock } from '@fortawesome/free-regular-svg-icons';

import './editPage.scss';
import TlEditor from './editTlEditor'
import DatePickerComponent from './datepicker'
import DDMposition from '../../DDMposition'


const FASiconsstyle = {
    arrowLeft:{
        fontSize:"1em"
    },
    clock :{
        fontSize:"1.1em",
        margin:"0 5 0 0",
        color:'#aaa'
    },
    clock_lp :{
        fontSize:"1.1em",
        margin:"0 15 0 0"
    }
}

export default class editPage extends Component {
    constructor(props){
        super(props);
        this.state={
            closePop: false
        }
    }
    
    toggleWindow(){
        this.setState({closePop: !this.state.closePop});
    }
    
    render(){
        return(
               <div className={this.props.status.window ? 'popup popup_effect' : 'popup popup_effect_de'} >
                    <div className="settingWhir no-select">
                        <h2 className="setting_h2 flex-align-center" >
                            <div className="backButtonBlock flex-jus-center" onClick={() => this.toggleWindow() }>
                                <FontAwesomeIcon icon={faArrowLeft} style={FASiconsstyle.arrowLeft} />
                            </div>
                            編集
                        </h2>
                        <div className="flex">
                            <Body
                                status={this.props.status}
                                handleOnChange={this.props.handleOnChange}
                                isPopup={this.state.closePop} action={this.props.action} popupFunction={() => this.toggleWindow()}
                                apiFunction={this.props.apiFunction}
                            />
                            
                        </div>
                    </div>
               </div>
        )
    }
}

class Body extends Component{
    constructor(props){
        super(props);
        //今日の日付を生成
        let d = new Date();
        d = this.parseAsMoment(d).format('YYYY/MM/DD');
        this.state={
            rteBl:false
        }
    }

    
    parseAsMoment = (dateTimeStr) => {
        //日付を調整
        return moment.utc(dateTimeStr, 'YYYY-MM-DDTHH:mm:00Z', 'ja').utcOffset(9)
    }
    
    // YYYY-MM-DD形式からdateオブジェクトを生成
    parDate(target){
        if(target){
            var dateSeme = target.split('-');
            var dateSemeSec = dateSeme[0].split('/')
            let stDate = new Date();
            if(dateSeme.length == 3){
                stDate = new Date(dateSeme[0],dateSeme[1] - 1,dateSeme[2]);
            }else{
                stDate = new Date(dateSemeSec[0],dateSemeSec[1] - 1,dateSemeSec[2]);
            }
            return stDate
        }
    }
    handleRTE(val){
        this.setState({rteBl:true});
        this.props.handleOnChange("taskCont",val);
    }
    popupFunction(e){
        if(e)this.setState({rteBl:false});
        this.props.popupFunction();
    }
    apiFunction(type){
        switch (type){
            case "task_update" :
                this.props.apiFunction.task_update();
                this.props.action.editPage(false, {title:'', content:'', position:0, date:'0/0/0'}, "");
                break;
            case "exam_update" :
                this.props.apiFunction.exam_update();
                this.props.action.editPage(false, {title:'', content:'', position:0, date:'0/0/0'}, "");
                break;
        }
    }

    render(){
        return(
               <>
               <ClosePopup isPopup={this.props.isPopup} action={this.props.action} popupFunction={(e) => this.popupFunction(e)}/>
               <div className="flex-jus-between editContainer">
                    <div className="leftContainer">
                        <input type="text" placeholder="タスク名" className="removeCss formInput edit-input" onChange={e => this.props.handleOnChange("taskTitle",e)} value={this.props.status.showData.title}/>
                        <div className="flex editDateContainer">
                            <div className="clockIcon flex-jus-center"><FontAwesomeIcon icon={faClock} style={FASiconsstyle.clock} /></div>
                            <DatePickerComponent date={this.parDate(this.props.status.showData.date)} action={(date) => this.props.handleOnChange("taskDate",date)}/>
                            <DDMposition element={this.props.status.showData.position + 1} action={(val) => this.props.handleOnChange("position",val)} key={"editpage1DDM"}/>
                        </div>
                        <div className="editSubmitContainer">
                            <div className="edit-submitButton" onClick={this.props.status.type == "task" ? () => this.apiFunction("task_update") : () => this.apiFunction("exam_update")}>
                                保存する
                            </div>
                        </div>
                    </div>
                    <div className="rightContainer">
                        <TlEditor onChange={(val) => this.handleRTE(val)} placeholder={"内容を入力"} value={this.props.status.showData.content} bl={this.state.rteBl}/>
                    </div>
               </div>
               </>
               );
    }
}

function ClosePopup(props){
    const close = () =>{
        props.popupFunction(true);
        props.action.editPage(false, {title:'', content:'', position:0, date:'0/0/0'}, "task");
    }
    const cancel = () =>{
        props.popupFunction(false);
    }
    return(
           <div className={props.isPopup ? 'popup popup_effect' : 'popup popup_effect_de'} >
               <div className="popup_wrap" onClick={() => cancel() }></div>
               <div className="confirmationWhir flex-jus-center">
                    <div>
                        <div>変更内容は保存されません。保存されていない変更内容を破棄しますか？</div>
                        <div className="flex-jus-center">
                            <div className="edit-submit-y" onClick={() => close() }>
                                破棄する
                            </div>
                            <div className="edit-submit-n" onClick={() => cancel() }>
                                キャンセル
                            </div>
                        </div>
                    </div>
               </div>
           </div>
           );
}
