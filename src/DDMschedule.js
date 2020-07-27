import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //fontaweresomeのインポート
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";//下矢印
import './dropdownMenu/dropdown.scss'

const pmArrow = {
    fontSize:"1em",
    color:"#aaa",
    cursor: "pointer",
    margin:"0 0 0 10px"
}

class DDMschedule extends Component{
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
  handleClickMenu(val,id,index) {
    this.props.action(val,id,index);
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
    const dayString=["月","火","水","木","金","土","日"];
    const semesterString=["前学期","後学期"];
    let item = [];
    this.props.data.map((data,index) => {
      item.push(
        <div className="index" key={data.name + data.key + "DDMscheduleIndex"}>{data.name}</div>
      );
      data.schedules.map((d) => {
        d[this.props.user.grade - 1].map((dx) => {
          dx.map((dy) => {
            if(dy !== 0)item.push(<div className="element" key={data.name + dy.title + "DDMscheduleElement"} onClick={() => this.handleClickMenu(dy, data.id, index)}>{dy.title}</div>);
          });
        });
      });
    });
    return (
      <div style={styles.dropDown}>
        <div onClick={this.toggleList.bind(this)} className="flex-jus-center ddmButton">
          {this.props.label == "" || this.props.label == void 0 ? this.props.fLabel : this.props.label}<FontAwesomeIcon style={pmArrow} icon={faCaretDown}/>
        </div>
        {listOpen && (
          <div className="dropMenuSchedule scroll-y">
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
        zIndex:'1000'
    },
    lastMenuContent: {
      padding: '3px 5px',
    },
}
 
export default onClickOutside(DDMschedule)
