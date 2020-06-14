import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //fontaweresomeのインポート
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";//下矢印

const pmArrow = {
    fontSize:"1em",
    color:"#aaa",
    cursor: "pointer",
    margin:"0 0 0 10px"
}

class DropDownMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listOpen: false,
      nLp:"週"
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
          <div style={styles.menuBox}>
            <div style={styles.menuContent} className="dropMenuElement">
              <div onClick={this.handleClickMenu.bind(this, 1)}>週表示</div>
            </div>
            <div style={styles.menuContent}>
              <div onClick={this.handleClickMenu.bind(this, 2)}>月表示</div>
            </div>
            <div style={styles.lastMenuContent}>
              <div onClick={this.handleClickMenu.bind(this, 3)}>学期表示</div>
            </div>
          </div>
        )}
      </div>
    )
  }
}
 
const styles = {
    dropDown:{
        position: 'relative',
        margin:'0px 10px'
    },
  menuButton: {
    height: '26px',
    cursor: 'pointer',
    border: '1px solid #aaa',
    borderRadius: '5px',
    padding:'0 10px 0 10px',
    color:'#aaa'
  },
  menuBox: {
    position: 'absolute',
    top: '38px',
    left:'-40px',
    width: '200px',
    zIndex: 1,
    cursor: 'pointer',
    background:'white',
    boxShadow: '1px 2px 4px rgba(0,0,0,0.3)'
  },
  menuContent: {
    padding: '3px 5px'
  },
  lastMenuContent: {
    padding: '3px 5px',
  },
}
 
export default onClickOutside(DropDownMenu)
