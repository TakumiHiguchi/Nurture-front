import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside'

class DropDownMenu extends React.Component {
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
    this.setState({
      listOpen: false,
    })
  }
 
  handleClickOutside() {
    this.setState({
      listOpen: false,
    })
  }
 
  render() {
    const { listOpen } = this.state
    return (
      <div style={styles.dropDown}>
        <div onClick={this.toggleList.bind(this)} style={styles.menuButton} className="flex-jus-center">
          日
        </div>
        {listOpen && (
          <div style={styles.menuBox}>
            <div style={styles.menuContent}>
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
    padding:'0 30px 0 10px',
    color:'#aaa'
  },
  menuBox: {
    position: 'absolute',
    top: '38px',
    left:'-40px',
    width: '200px',
    zIndex: 1,
    cursor: 'pointer',
    border: '1px solid #aaa',
    background:'white'
  },
  menuContent: {
    padding: '3px 5px',
    borderBottom: '1px solid #aaa',
  },
  lastMenuContent: {
    padding: '3px 5px',
  },
}
 
export default onClickOutside(DropDownMenu)
