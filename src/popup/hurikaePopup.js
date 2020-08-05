import React, { Component,useState } from 'react';
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import moment from 'moment'
import { findAllByPlaceholderText } from '@testing-library/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //fontaweresomeのインポート
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";//下矢印

export default class hurikae extends Component{
    constructor(props){
        super(props)
        this.state={
            date: -1,
            position:1
        }
    }
    render(){
        return (
        <div className={this.props.isPopup ? 'popup popup_effect' : 'popup popup_effect_de'} style={{zIndex:"999999"}}>
            <div className="popup_wrap" onClick={() => this.props.action.cancel() }></div>
            <div className="clpWrap">
                <h2>振替先の日時の選択</h2>
                <div className="flex canceledLectureBox">
                    <div className="des left">振替前</div>
                    <div>
                        <p>{this.props.value.year}年{this.props.value.month}月{this.props.value.date}日</p>
                    </div>
                </div>
                <div>↓</div>
                <div className="flex canceledLectureBox">
                    <div className="des left">振替先</div>
                    <div>
                        <p><Calender action={(date) => this.setState({date:date})} key={"hPcal1"} value={this.state.date}/></p>
                    </div>
                </div>
            <div className="confirmation-button flex">
                <div onClick={() => this.props.action.cancel() } className="clpCancel">キャンセル</div>
                <div 
                    onClick={this.state.date !== -1 ? () => this.props.action.submit(this.state.date) : null} 
                    className={this.state.date !== -1 && this.state.position !== -1 ? "active clpSubmit" : "clpSubmit"}
                >
                    授業を休講にする
                </div>
            </div>
            </div>
        </div>
        )
    }
  }

  //あとで分割したときに親コンポーネントの値から変更するようにする。
class Calender extends Component {
    constructor(props){
        super(props)
        this.state={
            startDate: -1
        }
    }
    handleChange = date => {
    this.setState({
        startDate: date
    });
        this.props.action(this.parseAsMoment(date).format('YYYY/MM/DD'));
    };
    parseAsMoment = (dateTimeStr) => {
    return moment.utc(dateTimeStr, 'YYYY-MM-DDTHH:mm:00Z', 'ja').utcOffset(9)
    }

 render() {
   return (
     <DatePicker
       selected={this.props.value === -1 ? new Date() : this.state.startDate}
       onChange={this.handleChange}
       locale="ja"
       customInput={
         <div className="cLPdatepicker">
             {this.props.value === -1 ? 
                <>----年--月--日</>
                :
                <>{this.parseAsMoment(this.state.startDate).format('YYYY年 MM月 DD日')}</>
             }
         </div>
       }
     />
   );
 }
}

