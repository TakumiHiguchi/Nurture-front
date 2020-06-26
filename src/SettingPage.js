import React, { Component } from 'react';
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
                    <Body element={{user:this.props.element.user,semesterDate: this.props.element.semesterDate}} action={{setGrade: (select) => this.props.action.setGrade(select)}}/>
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
            semesterDateGrade:3
        }
        
    }
    
    setDate(date,position){
        console.log(date);
    }
    
    render(){
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
                        <div className="calpoint"><Calender element={this.props.element.semesterDate[this.state.semesterDateGrade - 1].fhSemester1} action={(date) => this.setDate(date,1)}/></div> 〜 <div className="calpoint"><Calender element={this.props.element.semesterDate[this.state.semesterDateGrade - 1].fhSemester2} action={(date) => this.setDate(date,2)}/></div>
                        </div>
                        <div className="flex-align-center semeswrap">
                            <div className="semesLabel">後学期</div>
                            <FontAwesomeIcon icon={faClock} style={FASiconsstyle.clock} />
                        <div className="calpoint"><Calender element={this.props.element.semesterDate[this.state.semesterDateGrade - 1].lateSemester1} action={(date) => this.setDate(date,3)}/></div> 〜 <div className="calpoint"><Calender element={this.props.element.semesterDate[this.state.semesterDateGrade - 1].lateSemmester2} action={(date) => this.setDate(date,4)}/></div>
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

class Calender extends Component {
  state = {
    startDate: new Date()
  };
 
  handleChange = date => {
      //親のアクションを呼ぶ
      this.props.action(this.parseAsMoment(date).format('YYYY/MM/DD'));
  };
  parseAsMoment = (dateTimeStr) => {
    //dateオブジェクトから変換
    return moment.utc(dateTimeStr, 'YYYY-MM-DDTHH:mm:00Z', 'ja').utcOffset(9)
  }
 
  render() {
      // YYYY/MM/DD形式から、dateオブジェクトを生成
      var dateSeme = this.props.element.split('/');
      let stDate = new Date();
      if(dateSeme.length == 3){
          stDate = new Date(dateSeme[0],dateSeme[1],dateSeme[2]);
          console.log(stDate);
      }
      return (
        <DatePicker
        selected={stDate}
        onChange={this.handleChange}
        locale="ja"
        customInput={
          <div>
            {this.parseAsMoment(stDate).format('YYYY年 MM月 DD日')}
          </div>
        }
      />
    );
  }
}
