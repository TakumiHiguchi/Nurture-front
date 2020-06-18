import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //fontaweresomeのインポート
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";//下矢印

import './dropdown.scss'

const pmArrow = {
    fontSize:"1em",
    color:"#aaa",
    cursor: "pointer",
    margin:"0 0 0 10px"
}


class DDMsearchPosition extends Component{
    constructor(props) {
       super(props)
       this.state = {
         listOpen: false,
         nLp:"講時"
       }
     }
    
     toggleList() {
       this.setState(prevState => ({
         listOpen: !prevState.listOpen,
       }))
     }
    
     handleClickMenu(val) {
         switch(val){
             case 1: {
                 this.props.action("week");
                 this.setState({
                   nLp:"週",
                     listOpen: false
                 })
                 break;
             }
             case 2: {
                 this.props.action("month");
                 this.setState({
                   nLp:"月",
                     listOpen: false
                 })
                 break;
             }
             case 3: {
                 this.props.action("semester");
                 this.setState({
                   nLp:"学期",
                     listOpen: false
                 })
                 break;
             }
         }
       
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
           <div onClick={this.toggleList.bind(this)} style={styles.menuButton} className="flex-jus-center">
               {this.state.nLp}<FontAwesomeIcon style={pmArrow} icon={faCaretDown}/>
           </div>
           {listOpen && (
             <div className="dropMenu">
               <div className="dropMenuElement" onClick={this.handleClickMenu.bind(this, 1)}>
                 <div>週表示</div>
               </div>
               <div className="dropMenuElement" onClick={this.handleClickMenu.bind(this, 2)}>
                 <div>月表示</div>
               </div>
               <div className="dropMenuElement" onClick={this.handleClickMenu.bind(this, 3)}>
                 <div>学期表示</div>
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
             DDMssmb:{
               padding:'5px 0',
            height: '26px',
            cursor: 'pointer',
            border: '1px solid #aaa',
            borderRadius: '5px',
            color:'#aaa'
             },
    dropDown:{
        position: 'relative',
        margin:'0px 10px',
        display:'inline-block'
    },
  menuButton: {
    height: '26px',
    cursor: 'pointer',
    border: '1px solid #aaa',
    borderRadius: '5px',
    padding:'0 10px 0 10px',
    color:'#aaa'
  },
  lastMenuContent: {
    padding: '3px 5px',
  },
}
 
export default onClickOutside(DDMsearchPosition)
