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
    let item = [];
    this.props.data.map((data) => {
      item.push(
        <div className="dropMenuElement" onClick={() => this.handleClickMenu(data)} key={data.name + data.key}>{data.name}</div>
      )
    });

       return (
         <div style={styles.dropDown}>
           <div onClick={this.toggleList.bind(this)} className="flex-jus-center ddmButton">
               {this.props.element}<FontAwesomeIcon style={pmArrow} icon={faCaretDown}/>
           </div>
           {listOpen && (
             <div className="dropMenuGrade">
               {item}
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
        zIndex:'999'
    },
    lastMenuContent: {
      padding: '3px 5px',
    },
}
 
export default onClickOutside(DDMcalendar)
