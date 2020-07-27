import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //fontaweresomeのインポート
import { faChevronRight,faTimes } from "@fortawesome/free-solid-svg-icons";//矢印アイコン
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";//カレンダー

import DDMsearchPosition from '../DDMsearchPosition'
import DDMcalendar from '../dropdownMenu/DDMcalendar'

export default class ScheduleRegester extends Component{
    constructor(props){
        super(props);
        let name = "カレンダーを選択";
        
        this.state={
            moreSearch: false,
            moreSetting:false,
            value:{calendarArray:{id:0, name:name}}
        }
    }
    _esGetsc(event){
        let val = event.target.value;
        this.props.action.getSchedule(val,"");
    }
    handleOnChange(index,e){
        let ins = this.state.value
        
        switch (index){
            case "calendar" : ins.calendarArray = {id:e.id, name:e.name};break;
        }
        this.setState({value:ins});
    }
    
    togglesh(){
        this.setState({moreSearch: !this.state.moreSearch})
    }
    toggEns(){
        this.setState({moreSetting: !this.state.moreSetting})
    }
    scheduleRegist(cal_id){
        this.props.action.regester(cal_id);
        this.setState({moreSetting:false});
    }
    close(){
        this.props.action.PopupToggle("regester")
        this.setState({moreSetting:false});
    }

    render(){
        const dayString=["月","火","水","木","金","土","日"];
        let k = 0;
        const {APIresult, regesterIds, regesterElements} = this.props.sceduleDatas;
        return(
                <div className={this.props.isPopup ? 'popup popup_effect' : 'popup popup_effect_de'} >
                <div className="popup_wrap" onClick={() => this.close() }></div>
                <div className="whir no-select">
                    <h2 className="add_scedule">授業の追加</h2>
                        <div className={!this.state.moreSetting ? 'reges_toggle_effect' : 'reges_toggle_effect_de'}>            
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
                            <div className="schedulesBox">
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
                        </div>
                        <div className={this.state.moreSetting ? 'reges_toggle_effect' : 'reges_toggle_effect_de'}>
                            <div className="moreSettingBox">
                                <div className="msB-h2">スケジュールを保存するカレンダー：</div>
                                <div className="msB-line">
                                    <FontAwesomeIcon icon={faCalendarAlt} style={clock} />
                                    <DDMcalendar element={this.state.value.calendarArray.name} data={this.props.calendar} action={(val) => this.handleOnChange("calendar",val)} key={"addschedule1DDMcalendar"}/>
                                </div>
                            </div>
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
                                {!this.state.moreSetting ?                
                                    <>                                                    
                                    <div className="btn-submit-sub fa-scedule-submit" onClick={() => this.props.action.PopupToggle("manual")}>手動で授業を追加</div>
                                    <div className="btn-submit fa-scedule-submit" onClick={() => this.toggEns()}>次へ</div>
                                    </>
                                :
                                    <>
                                    <div className="btn-submit-sub fa-scedule-submit" onClick={() => this.toggEns()}>戻る</div>
                                    <div className="btn-submit fa-scedule-submit" onClick={() => this.scheduleRegist(this.state.value.calendarArray.id)}>選択した授業を追加</div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                
        )
    }
}

//style
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
const clock = {
    fontSize:"1em",
}