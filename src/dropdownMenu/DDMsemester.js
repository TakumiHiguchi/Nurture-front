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

class DDMsemester extends Component{
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
           <div onClick={this.toggleList.bind(this)} style={styles.menuButton} className="flex-jus-center">
               {this.props.element}<FontAwesomeIcon style={pmArrow} icon={faCaretDown}/>
           </div>
           {listOpen && (
             <div className="dropMenuGrade">
               <div className="dropMenuElement" onClick={this.handleClickMenu.bind(this, "前学期")}>
                 <div>前学期</div>
               </div>
               <div className="dropMenuElement" onClick={this.handleClickMenu.bind(this, "後学期")}>
                 <div>後学期</div>
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
        display:'inline-block',
        margin:'0 0 0 10px',
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
 
export default onClickOutside(DDMsemester)
