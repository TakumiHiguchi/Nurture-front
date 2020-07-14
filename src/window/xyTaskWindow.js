import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //fontaweresomeのインポート
import { faTimes,faPlus,faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faLine,faTwitter } from "@fortawesome/free-brands-svg-icons";

import './xyWindow.scss'
class xyTaskWindow extends Component{
    constructor(props){
        super(props);
        this.state={
            page:-1,
            size:{
                width: 0,
                height: 0
            }
        }
    }
    //画面外をクリックした時の挙動
    handleClickOutside() {
        this.props.action(false,0,0,0,0,0,0,{},0);
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
        const bl2 = this.props.value.x + 450 > this.state.size.width;
        let xyWindowMain = {};
        if(bl1 && bl2){
            xyWindowMain = {
                top:this.props.value.y - 300 + "px",
                left:this.props.value.x - 450 + "px"
            }
        }else if(bl1 && !bl2){
            xyWindowMain = {
                top:this.props.value.y - 300 + "px",
                left:this.props.value.x + 40 + "px"
            }
        }else if(!bl1 && bl2){
            xyWindowMain = {
                top:this.props.value.y + "px",
                left:this.props.value.x - 450 + "px"
            }
        }else{
            xyWindowMain = {
                top:this.props.value.y + "px",
                left:this.props.value.x + 40 + "px"
            }
        }
        
        
        //positionを生成
        let date = new Date(value.year,value.month - 1,value.date).getDay();
        if(date === 0)date = 7;
        date -= 1
        
    

        
        
        return(
               <div className="no-select">
                   <div style={xyWindowMain} className={this.props.value.window ? "xyw-inner xyWindowWrap" : "xyw_de-inner xyWindowWrap"}>
                        <div className="flex-jus-between xywindowTitleBox">
                            <div className="windowDate">{value.year}年{value.month}月{value.date}日{value.position + 1}時限</div>
                            <div className="windowIcons flex">
                                <div className="brandIcons flex">
                                    <div className="line flex-jus-center"><FontAwesomeIcon icon={faLine} style={lineIcon}/></div>
                                    <div className="twitter flex-jus-center"><FontAwesomeIcon icon={faTwitter} style={twitterIcon}/></div>
                                    <div className="twitter flex-jus-center"><FontAwesomeIcon icon={faTrashAlt} style={pmcl}/></div>
                                </div>
                                <div className="plus flex-jus-center"><FontAwesomeIcon icon={faPlus} style={pmcr}/></div>
                            </div>
                        </div>
                        {value.showData[value.dataPosition] != void 0 &&
                            <div className="flex windowTasktitle"><div className="labelBox" style={value.showData[value.dataPosition].label == "試験" ? labRed : labBlue}>{value.showData[value.dataPosition].label}</div><div className="title">{value.showData[value.dataPosition].title}</div></div>
                        }
                        <div className="xyWindowTaskInner">
                            {value.showData[value.dataPosition] != void 0 &&
                                <div className="mainCont" dangerouslySetInnerHTML={{
                                  __html: value.showData[value.dataPosition].content
                                }}></div>
                            }
                        </div>
                    </div>
                </div>
               );
        
    }
}

export default onClickOutside(xyTaskWindow)


const labRed = {
    background:'#EF454A'
}
const labBlue = {
    background:'#00aced'
}
const pmcr = {
    fontSize:"1.2em",
    color:"rgb(170, 170, 170)"
}
const pmcl = {
    fontSize:"1.1em",
    color:"rgb(170, 170, 170)"
}
const twitterIcon = {
    fontSize:"1.2em",
    color:"#00aced",
    cursor: "pointer"
}
const lineIcon = {
    fontSize:"1.2em",
    color:"#00B900",
    cursor: "pointer"
}
