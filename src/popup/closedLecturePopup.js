import React, { Component,useState } from 'react';
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import moment from 'moment'
import { findAllByPlaceholderText } from '@testing-library/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //fontaweresomeのインポート
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";//下矢印

export default class closedLecturePopup extends Component{
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
                <h2>補講先の選択</h2>
                <div className="des">授業を休講にするためには補講先を登録する必要があります。</div>
                <div className="flex canceledLectureBox">
                    <div className="des left">休講</div>
                    <div>
                        <p>{this.props.value.showSchedule.title}</p>
                        <p style={{fontSize:"0.8em"}}>{this.props.value.year}年{this.props.value.month}月{this.props.value.date}日 {this.props.value.showSchedule.position % 6 + 1}限目</p>
                    </div>
                </div>
                <div>↓</div>
                <div className="flex canceledLectureBox">
                    <div className="des left">補講</div>
                    <div>
                        <p>{this.props.value.showSchedule.title}</p>
                        <p style={{fontSize:"0.8em",cursor:"pointer"}} className="flex">
                            <Calender action={(date) => this.setState({date:date})} key={"cLPcal1"} value={this.state.date}/>
                            <DDMposition action={(position) => this.setState({position:position})} value={this.state.position} key={"cLPposition1"}/>
                        </p>
                    </div>
                </div>
            <div className="confirmation-button flex">
                <div onClick={() => this.props.action.cancel() } className="clpCancel">キャンセル</div>
                <div 
                    onClick={this.state.date !== -1 && this.state.position !== -1 ? () => this.props.action.submit({date:this.state.date,position:this.state.position}) : null} 
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
  const pmArrow = {
    color:"#aaa",
    cursor: "pointer",
    margin:"0 0 0 5px"
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

class DDMposition extends Component{
    constructor(props) {
       super(props)
       this.state = {
         listOpen: false,
       }
     }
    
     toggleList() {
       this.setState(prevState => ({
         listOpen: !prevState.listOpen,
       }))
     }
    
     handleClickMenu(val) {
         this.props.action(val);
         this.setState({
            listOpen: false
         })
         
       
     }
    
     handleClickOutside() {
       this.setState({
         listOpen: false
       })
     }
    
     render() {
       const { listOpen } = this.state
       return (
         <div style={styles.dropDown}>
           <div onClick={this.toggleList.bind(this)}>
           {this.props.value}限目<FontAwesomeIcon style={pmArrow} icon={faCaretDown}/>
           </div>
           {listOpen && (
             <div className="dropMenuGrade">
               <div className="dropMenuElement" onClick={this.handleClickMenu.bind(this, 1)}>
                 <div>1講時</div>
               </div>
               <div className="dropMenuElement" onClick={this.handleClickMenu.bind(this, 2)}>
                 <div>2講時</div>
               </div>
               <div className="dropMenuElement" onClick={this.handleClickMenu.bind(this, 3)}>
                 <div>3講時</div>
               </div>
               <div className="dropMenuElement" onClick={this.handleClickMenu.bind(this, 4)}>
                 <div>4講時</div>
               </div>
               <div className="dropMenuElement" onClick={this.handleClickMenu.bind(this, 5)}>
                 <div>5講時</div>
               </div>
               <div className="dropMenuElement" onClick={this.handleClickMenu.bind(this, 6)}>
                 <div>6講時</div>
               </div>
             </div>
           )}
         </div>
       )
     }
}


const styles = {
    DDMss:{
         position: 'relative',
        padding:'10px 0'
    },
    dropDown:{
        position: 'relative',
        display:'inline-block',
        margin:'0 0 0 10px'
    },
  menuButton: {
    height: '26px',
    cursor: 'pointer',
    border: '1px solid #aaa',
    borderRadius: '5px',
    padding:'2px 10px',
    color:'#aaa'
  },
  lastMenuContent: {
    padding: '3px 5px',
  },
}
