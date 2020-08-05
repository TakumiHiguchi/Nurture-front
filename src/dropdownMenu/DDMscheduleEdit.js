import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //fontaweresomeのインポート
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import './dropdown.scss'

const pmcl = {
  fontSize:"1.1em",
  color:"rgb(170, 170, 170)"
}

class DDMcalendar extends Component{
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
    const { listOpen } = this.state;

       return (
         <div style={styles.dropDown}>
           
           <div onClick={this.toggleList.bind(this)}>
           <FontAwesomeIcon icon={faPlus} style={pmcl}/>
           </div>
           {listOpen && (
             <div className="dropScheduleEdit">
               <div className="dropMenuElement" onClick={() => this.handleClickMenu(0)} key={"授業を休講にする"}>授業を休講にする</div>
               <div className="dropMenuElement" onClick={() => this.handleClickMenu(1)} key={"2020/7/31の授業を振替する"}>{this.props.date}の授業を振替する</div>
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
        zIndex:'999'
    },
    lastMenuContent: {
      padding: '3px 5px',
    },
}
 
export default onClickOutside(DDMcalendar)
