import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //fontaweresomeのインポート
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faKey } from "@fortawesome/free-solid-svg-icons";

import DDMsettingGrade from '../../../dropdownMenu/DDMsettingGrade'
import DateRangeDatePicker from '../DateRangeDatePicker'

let nTimer;
export default class p3 extends Component{
    constructor(props){
        super(props);
        this.state={
            semesterDateGrade:1,
            name:-1,
            description:-1,
            anim:-1,
            sleep:false
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
    calendarUpdate(type, calendar, mes, val){
        let ins ={
            id: calendar.id,
            name: calendar.name,
            description: calendar.description,
            color: calendar.color,
            shareBool: calendar.shareBool,
            cloneBool: calendar.cloneBool
        }
        switch(type){
            case "shareBool": calendar.shareBool = val; break;
            case "cloneBool": calendar.cloneBool = val; break;
            case "name": calendar.name = val; break;
            case "description": calendar.description = val; break;
        }
        this.props.apiFunction.calendar_update(calendar, mes)
    }
    inputNameStart(val){
        let nowCalendar = this.props.calendar[this.props.page.calPage - 1];
        this.setState({name:val});
        if(nTimer){clearTimeout(nTimer);}
        nTimer = setTimeout(() => {
            this.calendarUpdate("name", nowCalendar, "カレンダーの名前を変更しました", this.state.name);
        }, 1000)
    }
    inputDescriptionStart(val){
        let nowCalendar = this.props.calendar[this.props.page.calPage - 1];
        this.setState({description:val});
        if(nTimer){clearTimeout(nTimer);}
        nTimer = setTimeout(() => {
            this.calendarUpdate("description", nowCalendar, "カレンダーの説明を変更しました", this.state.description);
        }, 1000)
    }

    render(){
        let semeDate = {}
        let nowCalendar = this.props.calendar[this.props.page.calPage - 1];
        if(this.props.calendar.length > 0){
            semeDate = nowCalendar.semesterPeriod[this.state.semesterDateGrade - 1];
        }

        //ページが変わった時の処理
        if(this.props.changePage.value){
            this.setState({name:-1,description:-1,anim:this.props.page.calPage});
            this.props.changePage.action();
        }
        return(
            <main key={"p3"} className={this.props.element.page === 3 ? 'settingBodyWrap popup_toggle_effect scroll-y' : 'settingBodyWrap popup_toggle_effect_de scroll-y'}>
                <div key={"calSettingInner" + this.state.anim} className={this.props.page.calPage === this.state.anim ? 'popup_toggle_effect' : 'popup_toggle_effect_de'}>
                    <h2 className="flex-align-center">{nowCalendar.name}{nowCalendar.user_id != nowCalendar.author_id && <div className="followedBox flex-jus-center" style={{background:nowCalendar.color}}>フォロー</div>}</h2>
                    <div className="authorContainer">作成者：{nowCalendar.author_name}</div>
                    {nowCalendar.user_id == nowCalendar.author_id &&
                        <section className="settingBody">
                            <h2 className="menuH2 flex-algin-center">公開設定</h2>
                            <div className="setting_CalCheckBox flex-align-center" style={{cursor:"pointer"}} onClick={() => this.calendarUpdate("shareBool", nowCalendar, "共有設定を変更しました", !nowCalendar.shareBool)}>
                                <div className="point flex-jus-center" style={{border:"2px solid " + nowCalendar.color}} >
                                    {nowCalendar.shareBool ?
                                        <div style={{background:nowCalendar.color}}></div>
                                        :
                                        <div></div>
                                    }
                                </div>
                                <div className="label scroll-x">カレンダーを公開して他の人と共有する</div>
                            </div>
                            <div className="setting_CalCheckBox flex-align-center" style={nowCalendar.shareBool ? {cursor:"pointer"} : null} onClick={nowCalendar.shareBool ? () => this.calendarUpdate("cloneBool", nowCalendar, "共有設定を変更しました", !nowCalendar.cloneBool) : null}>
                                <div className="point flex-jus-center" style={nowCalendar.shareBool ? {border:"2px solid " + nowCalendar.color,cursor:"pointer"} : {border:"2px solid #aaa"}}>
                                    {(nowCalendar.shareBool && nowCalendar.cloneBool) ?
                                        <div style={nowCalendar.cloneBool ? {background:nowCalendar.color} : {background:"#aaa"}}></div>
                                        :
                                        <div></div>
                                    }
                                </div>
                                <div className="label scroll-x" style={nowCalendar.shareBool ? null : {color:"#aaa"}}>カレンダーのコピーを許可する</div>
                            </div>
                            <p className="secline">「カレンダーを公開して他の人と共有する」を選択すると、誰でもあなたの予定を見れるようになります。</p>
                            <p className="secline">詳しいカレンダーの公開設定の説明については<a>ヘルプ: カレンダーの公開設定について</a>をご覧ください。</p>
                        </section>
                    }
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
                    {nowCalendar.user_id == nowCalendar.author_id &&
                        <section className="settingBody">
                            <h2 className="menuH2 flex-algin-center">カレンダーの設定</h2>
                            <div className="formInputWrap" style={{marginBottom:"10px"}}>
                                <div>カレンダーの名前</div>
                                <input type="text" placeholder="カレンダーの名前を入力（必須）" className="removeCss" value={this.state.name == -1 ? nowCalendar.name : this.state.name} onChange={(e) => this.inputNameStart(e.target.value)}/>
                            </div>
                            <div className="formTextareaWrap" style={{marginBottom:"10px"}}> 
                                <div>カレンダーの説明</div>
                                <textarea placeholder="カレンダーの説明を入力" className="removeTACss" rows="10" value={this.state.description == -1 ? nowCalendar.description : this.state.description} onChange={(e) => this.inputDescriptionStart(e.target.value)}>
                                    
                                </textarea>
                            </div>
                        </section>
                    }
                    <section className="settingBody">
                        <h2 className="menuH2 flex-algin-center">カレンダーのKey</h2>
                        <div className="flex-align-center">
                            <FontAwesomeIcon icon={faKey} style={FASiconsstyle.key} />
                            <div>{nowCalendar.key}</div>
                        </div>
                        <p className="secline">カレンダーのKeyはこのカレンダーに固有の文字列です。お問い合わせ時や、カレンダーの検索で使用します。</p>
                    </section>
                    <section className="settingBody">
                        {nowCalendar.user_id == nowCalendar.author_id ?
                            <>
                                <h2 className="menuH2 flex-algin-center">カレンダーの削除</h2>
                                <div className="btn-submit settingDeleteBtn" onClick={() => this.props.action.ConfirmationPopup("削除する","キャンセル","「" + nowCalendar.name + "」カレンダーを削除しようとしています。カレンダーを削除すると永久的にデータにアクセスできなくなります。本当にカレンダーを削除しますか？",nowCalendar,"calDelete")}>カレンダーを削除</div>

                                <p className="secline">このカレンダーのすべての予定が削除されます。</p>
                                <p className="secline">このカレンダーをFollowしたユーザからもカレンダーが削除されます。</p>
                            </>
                        :
                            <>
                                <h2 className="menuH2 flex-algin-center">フォローの解除</h2>
                                <div className="btn-submit settingDeleteBtn" onClick={() => this.props.action.ConfirmationPopup("解除する","キャンセル","「" + nowCalendar.name + "」カレンダーのフォローを解除しようとしています。フォローを解除するとデータにアクセスできなくなります。本当にフォローを解除しますか？",nowCalendar,"calDelete")}>フォローを解除</div>

                                <p className="secline">このカレンダーのフォローが解除されます。</p>
                                <p className="secline">一度解除した場合でも、カレンダーライブラリーから再度フォローすることができます。</p>
                            </>
                        }
                    </section>
                </div>
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
    key :{
        fontSize:"1em",
        margin:"0 15 0 0"
    },
    clock_lp :{
        fontSize:"1.1em",
        margin:"0 15 0 0"
    }
}