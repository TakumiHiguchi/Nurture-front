import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //fontaweresomeのインポート
import { faClock } from '@fortawesome/free-regular-svg-icons';

import DDMposition from '../dropdownMenu/DDMposition'
import DDMsettingGrade from '../dropdownMenu/DDMsettingGrade'
import DDMsemester from '../dropdownMenu/DDMsemester'
import DDMday from '../dropdownMenu/DDMday'
import { faBlackTie } from '@fortawesome/free-brands-svg-icons';

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

export default class ScheduleManual extends Component{
    constructor(props){
        super(props);
        this.state={
            schedule:{title:"", teacher:"", number:"", position:1, grade:1, semester:"", day:""}
        }
    }
    handleOnChange(index,val){
        let ins = this.state.schedule
        switch (index){
            case "title" : ins.title = val.target.value;break;
            case "teacher" : ins.teacher = val.target.value;break;
            case "number" : ins.number = val.target.value;break;
            case "position" : ins.position = val;break;
            case "grade" : ins.grade = val;break;
            case "semester" : ins.semester = val;break;
            case "day" : ins.day = val;break;
        }
        this.setState({schedule:ins});
    }

    render(){
        return (
            <div className={this.props.isPopup ? 'popup popup_effect' : 'popup popup_effect_de'} >
                <div className="popup_wrap" onClick={() => this.props.action.PopupToggle("manual") }></div>
                <div className="whir no-select">
                    <h2 className="add_scedule">手動で授業を追加</h2>
                    <input type="text" onChange={e => this.handleOnChange("title",e)} value={this.state.schedule.title} placeholder="授業名を入力（必須）" className="removeCss formInput adSheduleInput"/>
                    <input type="text" onChange={e => this.handleOnChange("teacher",e)} value={this.state.schedule.teacher} placeholder="教師名を入力（必須）" className="removeCss formInput adSheduleInput"/>
                    <input type="text" onChange={e => this.handleOnChange("number",e)} value={this.state.schedule.number} placeholder="科目番号を入力" className="removeCss formInput adSheduleInput"/>
                    <div className="manual-schedule-sleB flex-align-center"><div style={{paddingRight:"20px"}}>開講学年を選択</div><DDMsettingGrade element={this.state.schedule.grade} action={(val) => this.handleOnChange("grade",val)} key={"SMpop1DDM1"}/></div>
                    
                    <div className="manual-schedule-sleB">
                        <FontAwesomeIcon icon={faClock} style={FASiconsstyle.clock} />
                        <DDMsemester element={this.state.schedule.semester == "" ? "学期を選択" : this.state.schedule.semester} action={(val) => this.handleOnChange("semester",val)} key={"SMpop1DDM2"}/>
                        <DDMday element={this.state.schedule.day == "" ? "曜日を選択" : this.state.schedule.day} action={(val) => this.handleOnChange("day",val)} key={"SMpop1DDM3"}/>
                        <DDMposition element={this.state.schedule.position} action={(val) => this.handleOnChange("position",val)} key={"SMpop1DDM4"}/>
                    </div>
                    <div className="infBox">
                        <div className="submitBox flex-jus-center">
                            <div className="btn-submit-sub fa-scedule-submit" onClick={() => this.props.action.PopupToggle("manual")}>キャンセル</div>
                            <div className="btn-submit fa-scedule-submit">授業を追加</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 