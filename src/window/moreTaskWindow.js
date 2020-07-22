import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //fontaweresomeのインポート
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import './xyWindow.scss'
class moreTaskWindow extends Component{
    constructor(props){
        super(props);
        this.state={
            size:{
                width: 0,
                height: 0
            }
        }
    }
    xyWindowClose(){
        this.props.action.showMoreTaskWindow(false,0,0,0,0,0,0,{});
    }
    //画面外をクリックした時の挙動
    handleClickOutside() {
        this.props.action.showMoreTaskWindow(false,0,0,0,0,0,0,{});
    }
    //画面の大きさを取得
    componentWillMount () {
        window.addEventListener('load', () =>{
            this.getWindowSize();
        });
        window.addEventListener('resize', () => {
            this.getWindowSize();
        });
    }
    getWindowSize(){
        let width = window.innerWidth
        let height = window.innerHeight;
        let wsize = {
            width: width,
            height: height
        }
        this.setState({size: wsize});
    }
    
    render(){
        let value = this.props.value;
        
        const bl1 = this.props.value.y + 300 > this.state.size.height;
        const bl2 = this.props.value.x + 250 > this.state.size.width;
        let xyWindowMain = {};
        if(bl1 && bl2){
            xyWindowMain = {
                top:this.props.value.y - 300 + "px",
                left:this.props.value.x - 250 + "px"
            }
        }else if(bl1 && !bl2){
            xyWindowMain = {
                top:this.props.value.y - 300 + "px",
                left:this.props.value.x + 40 + "px"
            }
        }else if(!bl1 && bl2){
            xyWindowMain = {
                top:this.props.value.y + "px",
                left:this.props.value.x - 250 + "px"
            }
        }else{
            xyWindowMain = {
                top:this.props.value.y + "px",
                left:this.props.value.x + 40 + "px"
            }
        }
        
        let taskBoards = [];
        if(value.showData.length > 0){
            taskBoards = value.showData.map((d,index) =>
                                            <div className="weekTaskBox"
                                            onClick={(e) => this.props.action.xyTaskWindow(true,this.props.value.x+680 < this.state.size.width ? 230 - (e.pageX - this.props.value.x) + e.pageX : (!bl2 ? this.props.value.x - 430 : this.props.value.x - 720 ),e.pageY,value.year,value.month,value.date,value.position,d)}>
                                                {d.complete ?
                                                    <><s>{d.title}</s>（完了済み)</>
                                                    :
                                                    <>{d.title}</>
                                                }
                                            </div>
                                            );
        }
        
        
        return(
               <div className="no-select">
                    <div className={this.props.value.window ? "xyw xyWindow" : "xyw_de xyWindow"} onClick={() => this.xyWindowClose()}>
                    </div>
                   <div style={xyWindowMain} className={this.props.value.window ? "xyw-inner TaskListWindowWrap" : "xyw_de-inner TaskListWindowWrap"}>
                        <div className="flex-jus-between xywindowTitleBox">
                            <div className="windowDate">{value.month}月{value.date}日{value.position + 1}時限</div>
                            <div className="windowIcons flex"><div className="plus flex-jus-center"><FontAwesomeIcon icon={faPlus} style={pmcr}/></div></div>
                        </div>
                        <div className="weekTaskBoxWrap scroll-y">
                            {taskBoards}
                        </div>
                    </div>
                </div>
               );
        
    }
}

export default moreTaskWindow

const pmcr = {
    fontSize:"1.2em",
    color:"rgb(170, 170, 170)"
}
