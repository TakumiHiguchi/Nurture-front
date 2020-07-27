import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //fontaweresomeのインポート
import { faClock } from '@fortawesome/free-regular-svg-icons';

import DDMsettingGrade from '../../../dropdownMenu/DDMsettingGrade'
import DateRangeDatePicker from '../DateRangeDatePicker'

export default class p1 extends Component{
    constructor(props){
        super(props);
        this.state={
            semesterDateGrade:1
        }
    }
    parDate(target){
        var dateSeme = target.split('/');
        let stDate = new Date();
        if(dateSeme.length == 3){
            stDate = new Date(dateSeme[0],dateSeme[1] - 1,dateSeme[2]);
        }
        return stDate
    }

    setDate(nowCal, date, position){
        //カレンダーの日付処理
        let target = nowCal.semesterPeriod[this.state.semesterDateGrade - 1]

        switch(position){
            case 1: {
                if(this.parDate(target.fhSemester2) > this.parDate(date)){
                    target.fhSemester1 = date;
                    this.props.regesSemesterDate(nowCal, target, this.state.semesterDateGrade);
                }
            }
            case 2:{
                if(this.parDate(date) > this.parDate(target.fhSemester1) && this.parDate(date) < this.parDate(target.lateSemester1)){
                    target.fhSemester2 = date;
                    this.props.regesSemesterDate(nowCal, target, this.state.semesterDateGrade);
                }
            }
            case 3:{
                if(this.parDate(date) > this.parDate(target.fhSemester2) && this.parDate(date) < this.parDate(target.lateSemester2)){
                    target.lateSemester1 = date;
                    this.props.regesSemesterDate(nowCal, target, this.state.semesterDateGrade);
                }
            }
            case 4:{
                if(this.parDate(date) > this.parDate(target.lateSemester1) ){
                    target.lateSemester2 = date;
                    this.props.regesSemesterDate(nowCal, target, this.state.semesterDateGrade);
                }
            }
        }
    }
    

    render(){
        let semeDate = {}
        const nowCalendar = this.props.calendar[this.props.page.calPage - 1];
        if(this.props.calendar.length > 0){
            semeDate = nowCalendar.semesterPeriod[this.state.semesterDateGrade - 1];
        }
        return(
            <main key={"p3"} className={this.props.element.page === 3 ? 'settingBodyWrap popup_toggle_effect' : 'settingBodyWrap popup_toggle_effect_de'}>
                <h2>{nowCalendar.name}</h2>
                <div className="authorContainer">作成者：{nowCalendar.author_name}</div>
                <section className="settingBody">
                    <h2 className="menuH2 flex-algin-center">公開設定</h2>
                    <div className="setting_CalCheckBox flex-align-center" style={{cursor:"pointer"}}>
                        <div className="point flex-jus-center" style={{border:"2px solid " + nowCalendar.color}} >
                            {nowCalendar.share &&
                                <div style={{background:nowCalendar.color}}></div>
                            }
                        </div>
                        <div className="label scroll-x">カレンダーを公開して他の人と共有する</div>
                    </div>
                    <div className="setting_CalCheckBox flex-align-center" style={nowCalendar.share ? {cursor:"pointer"} : null}>
                        <div className="point flex-jus-center" style={nowCalendar.share ? {border:"2px solid " + nowCalendar.color,cursor:"pointer"} : {border:"2px solid #aaa"}}>
                            {nowCalendar.clone &&
                                <div style={nowCalendar.share ? {background:nowCalendar.color} : {background:"#aaa"}}></div>
                            }
                        </div>
                        <div className="label scroll-x" style={nowCalendar.share ? null : {color:"#aaa"}}>カレンダーのコピーを許可する</div>
                    </div>
                </section>
                <section className="settingBody">
                    <h2 className="menuH2 flex-algin-center">授業開始日</h2>
                    <DDMsettingGrade element={this.state.semesterDateGrade} action={(select) => this.setState({semesterDateGrade:select})}/>
                    <div className="flex-align-center semeswrap">
                        <div className="semesLabel">前学期</div>
                        <FontAwesomeIcon icon={faClock} style={FASiconsstyle.clock} />
                        <DateRangeDatePicker date={{start:this.parDate(semeDate.fhSemester1),end:this.parDate(semeDate.fhSemester2)}}
                            action={(date,select) => this.setDate(nowCalendar,date,select)}
                            start={1}
                        />
                    </div>
                    <div className="flex-align-center semeswrap">
                        <div className="semesLabel">後学期</div>
                        <FontAwesomeIcon icon={faClock} style={FASiconsstyle.clock} />
                        <DateRangeDatePicker date={{start:this.parDate(semeDate.lateSemester1),end:this.parDate(semeDate.lateSemester2)}}
                            action={(date,select) => this.setDate(nowCalendar,date,select)}
                            start={3}
                        />
                    </div>
                    <p className="secline">ここで選択された日時をもとに、カレンダーにスケジュールを表示します。</p>
                    <p className="secline">不正な日時であった場合登録されません。登録条件については<a>ヘルプ: 授業開始日の登録について</a>をご覧ください。</p>
                </section>
            </main>
        )
    }
}
//style
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