import React, { Component,useState } from 'react';
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker"
import moment from 'moment'

import './setting.scss';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //fontaweresomeのインポート
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";//矢印アイコン

import DDMsettingGrade from './DDMsettingGrade'


const FASiconsstyle = {
    arrowLeft:{
        fontSize:"1em"
    },
    clock :{
        fontSize:"1.1em",
        margin:"0 5 0 0"
    }
}

export default class SettingPage extends Component {
    constructor(props){
        super(props);
        this.state={
            page: 0
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
                        <Sidebar />
                    <Body element={{user:this.props.element.user,semesterDate: this.props.element.semesterDate}} action={{setGrade: (select) => this.props.action.setGrade(select)}}
                        regesSemesterDate = {(date,position) => this.props.regesSemesterDate(date,position)}
                    />
                    </div>
                    <div className="pageIndexBox flex">
                        <div className="aTindexactive">授業開始日の登録</div>
                        <div>学年の登録</div>
                        <div>設定1</div>
                        <div>設定2</div>
                        <div>設定3</div>
                    </div>
                    <div className="pcePopup-item adTaskbody">
                        
                    </div>
                </div>
            </div>
        )
    }
}
class Body extends Component{
    
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
    
    setDate(date,position){
        let target = this.props.element.semesterDate[this.state.semesterDateGrade - 1]
        
        switch(position){
            case 1: {
                if(this.parDate(target[1]) > this.parDate(date)){
                    target[0] = date;
                    this.props.regesSemesterDate(target,this.state.semesterDateGrade);
                }
            }
            case 2:{
                if(this.parDate(date) > this.parDate(target[0]) && this.parDate(date) < this.parDate(target[2])){
                    target[1] = date;
                    this.props.regesSemesterDate(target,this.state.semesterDateGrade);
                }
            }
            case 3:{
                if(this.parDate(date) > this.parDate(target[1]) && this.parDate(date) < this.parDate(target[3])){
                    target[2] = date;
                    this.props.regesSemesterDate(target,this.state.semesterDateGrade);
                }
            }
            case 4:{
                if(this.parDate(date) > this.parDate(target[2]) ){
                    target[3] = date;
                    this.props.regesSemesterDate(target,this.state.semesterDateGrade);
                }
            }
        }
    }
    

    render(){
        var semeDate = this.props.element.semesterDate[this.state.semesterDateGrade - 1];
        return(
               <main className="bodyWrap">
                    <section className="settingBody">
                        <h2 className="menu flex-algin-center">現在の学年</h2>
                        <DDMsettingGrade element={this.props.element.user.grade} action={(select) => this.props.action.setGrade(select)}/>
                        <p className="secline">ここで選択された学年のスケジュールが、カレンダーに表示されます。</p>
                    </section>
                    <section className="settingBody">
                        <h2 className="menu flex-algin-center">授業開始日</h2>
                        <DDMsettingGrade element={this.state.semesterDateGrade} action={(select) => this.setState({semesterDateGrade:select})}/>
                        <div className="flex-align-center semeswrap">
                            <div className="semesLabel">前学期</div>
                            <FontAwesomeIcon icon={faClock} style={FASiconsstyle.clock} />
                            <DateRangeDatePicker date={{start:this.parDate(semeDate[0]),end:this.parDate(semeDate[1])}}
                                action={(date,select) => this.setDate(date,select)}
                                start={1}
                            />
                        </div>
                        <div className="flex-align-center semeswrap">
                            <div className="semesLabel">後学期</div>
                            <FontAwesomeIcon icon={faClock} style={FASiconsstyle.clock} />
                            <DateRangeDatePicker date={{start:this.parDate(semeDate[2]),end:this.parDate(semeDate[3])}}
                                action={(date,select) => this.setDate(date,select)}
                                start={3}
                            />
                        </div>
                        <p className="secline">ここで選択された日時をもとに、カレンダーにスケジュールを表示します。</p>
                        <p className="secline">不正な日時であった場合登録されません。登録条件については<a>ヘルプ: 授業開始日の登録について</a>をご覧ください。</p>
                    </section>
               </main>
               
               
               
               );
    }
    
}

const Sidebar = (props) => {
    return(
           <aside className="sidebarWrap">
                <div className="menu flex-algin-center active">基本設定</div>
                
           </aside>
           
           
           
           );
    
}



const DateRangeDatePicker = (props) => {
  const handleChangeStart = (selectedDate) => {
      props.action(parseAsMoment(selectedDate).format('YYYY/MM/DD'),props.start);
  }
  const handleChangeEnd = (selectedDate) => {
      props.action(parseAsMoment(selectedDate).format('YYYY/MM/DD'),props.start + 1);
  }
  const parseAsMoment = (dateTimeStr) => {
      //dateオブジェクトから変換
      return moment.utc(dateTimeStr, 'YYYY-MM-DDTHH:mm:00Z', 'ja').utcOffset(9)
    }
  return (
    <div className="flex">
        <div className="calpoint">
            <DatePicker
                selected={props.date.start}
                selectsStart
                startDate={props.date.start}
                endDate={props.date.end}
                onChange={handleChangeStart}
                customInput={
                    <div>
                        {parseAsMoment(props.date.start).format('YYYY年 MM月 DD日')}
                    </div>
                }
            />
        </div>
        <div className="flex-jus-center"> 〜 </div>
        <div className="calpoint">
          <DatePicker
            selected={props.date.end}
            selectsEnd
            startDate={props.date.start}
            endDate={props.date.end}
            onChange={handleChangeEnd}
            customInput={
              <div>
                {parseAsMoment(props.date.end).format('YYYY年 MM月 DD日')}
              </div>
            }
          />
        </div>
    </div>
  )
}
