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
                    <h2 className="setting_h2 flex-align-center" onClick={() => this.props.action.PopupToggle("setting") }>
                        <div className="backButtonBlock flex-jus-center">
                            <FontAwesomeIcon icon={faArrowLeft} style={FASiconsstyle.arrowLeft} />
                        </div>
                        設定
                    </h2>
                    <div className="flex">
                        <Sidebar />
                        <Body />
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
    render(){
        return(
               <main className="bodyWrap">
                    <section className="settingBody">
                        <h2 className="menu flex-algin-center">現在の学年</h2>
                        <DDMsettingGrade element={{grade: 3}}/>
                        <p className="secline">ここで選択された学年のスケジュールが、カレンダーに表示されます。</p>
                    </section>
                    <section className="settingBody">
                        <h2 className="menu flex-algin-center">授業開始日</h2>
                        <DDMsettingGrade element={{grade: 3}}/>
                        <div className="flex-align-center semeswrap">
                            <div className="semesLabel">前学期</div>
                            <FontAwesomeIcon icon={faClock} style={FASiconsstyle.clock} />
                            <div className="calpoint"><Calender /></div> 〜 <div className="calpoint"><Calender /></div>
                        </div>
                        <div className="flex-align-center semeswrap">
                            <div className="semesLabel">後学期</div>
                            <FontAwesomeIcon icon={faClock} style={FASiconsstyle.clock} />
                            <div className="calpoint"><Calender /></div> 〜 <div className="calpoint"><Calender /></div>
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
    this.setState({
      startDate: date
    });
  };
  parseAsMoment = (dateTimeStr) => {
    return moment.utc(dateTimeStr, 'YYYY-MM-DDTHH:mm:00Z', 'ja').utcOffset(9)
  }
 
  render() {
    return (
      <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
        locale="ja"
        customInput={
          <div>
            {this.parseAsMoment(this.state.startDate).format('YYYY年 MM月 DD日')}
          </div>
        }
      />
    );
  }
}
