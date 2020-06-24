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


class DDMsettingGrade extends Component{
    constructor(props) {
       super(props)
       this.state = {
         listOpen: false,
         nLp:this.props.element.grade+"学年（現在）"
       }
     }
    
     toggleList() {
       this.setState(prevState => ({
         listOpen: !prevState.listOpen,
       }))
     }
    
     handleClickMenu(val) {
         let ofs = "";
         if(this.props.element.grade == val){
             ofs = "（現在）";
         }
         switch(val){
             case 1: {
                 this.setState({
                    nLp:"1学年"+ofs,
                    listOpen: false
                 })
                 break;
             }
             case 2: {
                 this.setState({
                    nLp:"2学年"+ofs,
                    listOpen: false
                 })
                 break;
             }
             case 3: {
                 this.setState({
                    nLp:"3学年"+ofs,
                    listOpen: false
                 })
                 break;
             }
             case 4: {
                 this.setState({
                    nLp:"4学年"+ofs,
                    listOpen: false
                 })
                 break;
             }
             case 5: {
                 this.setState({
                    nLp:"5学年"+ofs,
                    listOpen: false
                 })
                 break;
             }
             case 6: {
                 this.setState({
                    nLp:"6学年"+ofs,
                    listOpen: false
                 })
                 break;
             }
             case 7: {
                 this.setState({
                    nLp:"7学年"+ofs,
                    listOpen: false
                 })
                 break;
             }
             case 8: {
                 this.setState({
                    nLp:"8学年"+ofs,
                    listOpen: false
                 })
                 break;
             }
             case 9: {
                 this.setState({
                    nLp:"9学年"+ofs,
                    listOpen: false
                 })
                 break;
             }
             case 10: {
                 this.setState({
                    nLp:"10学年"+ofs,
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
             <div className="dropMenuGrade">
               <div className="dropMenuElement" onClick={this.handleClickMenu.bind(this, 1)}>
                 <div>1学年</div>
               </div>
               <div className="dropMenuElement" onClick={this.handleClickMenu.bind(this, 2)}>
                 <div>2学年</div>
               </div>
               <div className="dropMenuElement" onClick={this.handleClickMenu.bind(this, 3)}>
                 <div>3学年</div>
               </div>
               <div className="dropMenuElement" onClick={this.handleClickMenu.bind(this, 4)}>
                 <div>4学年</div>
               </div>
               <div className="dropMenuElement" onClick={this.handleClickMenu.bind(this, 5)}>
                 <div>5学年</div>
               </div>
               <div className="dropMenuElement" onClick={this.handleClickMenu.bind(this, 6)}>
                 <div>6学年</div>
               </div>
               <div className="dropMenuElement" onClick={this.handleClickMenu.bind(this, 7)}>
                 <div>7学年</div>
               </div>
               <div className="dropMenuElement" onClick={this.handleClickMenu.bind(this, 8)}>
                 <div>8学年</div>
               </div>
               <div className="dropMenuElement" onClick={this.handleClickMenu.bind(this, 9)}>
                 <div>9学年</div>
               </div>
               <div className="dropMenuElement" onClick={this.handleClickMenu.bind(this, 10)}>
                 <div>10学年</div>
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
        display:'inline-block'
    },
  menuButton: {
    height: '26px',
    cursor: 'pointer',
    border: '1px solid #aaa',
    borderRadius: '5px',
    padding:'5px 10px',
    color:'#aaa'
  },
  lastMenuContent: {
    padding: '3px 5px',
  },
}
 
export default onClickOutside(DDMsettingGrade)
