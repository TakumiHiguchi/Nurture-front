import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside'

import './ResultWindow.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //fontaweresomeのインポート
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const pmcr = {
    fontSize:"1.5em",
    color:"white",
    cursor: "pointer"
}

class ResultWindow extends Component {
    constructor(props){
        super(props);
    }
    //画面外をクリックした時の挙動
    handleClickOutside() {
        this.props.action(false,0,"");
    }
    
    render(){
        let cont = ""; //表示する文字列
        let val = this.props.value.type; //表示する種類
        let icon = []
        switch(val){
            case 0: 
            cont = "保存しています...";
            if(this.props.value.mes != "")cont = this.props.value.mes;
                        icon.push(<div class="sk-fading-circle" key={"top"}>
                                      <div class="sk-circle1 sk-circle"></div>
                                      <div class="sk-circle2 sk-circle"></div>
                                      <div class="sk-circle3 sk-circle"></div>
                                      <div class="sk-circle4 sk-circle"></div>
                                      <div class="sk-circle5 sk-circle"></div>
                                      <div class="sk-circle6 sk-circle"></div>
                                      <div class="sk-circle7 sk-circle"></div>
                                      <div class="sk-circle8 sk-circle"></div>
                                      <div class="sk-circle9 sk-circle"></div>
                                      <div class="sk-circle10 sk-circle"></div>
                                      <div class="sk-circle11 sk-circle"></div>
                                      <div class="sk-circle12 sk-circle"></div>
                                </div>
                              );
                        break;
            case 1: cont = this.props.value.mes;break;
            case 2: cont = this.props.value.mes;break;
        }
        if(this.props.value.isRWindow !== 0){
            return(
                   <div className={this.props.value.isRWindow ? 'rWindow rWinodow_effect no-select' : 'rWindow rWinodow_effect_de no-select'} >
                        <div className="flex-jus-between rwindowInner">
                            <div className="cont flex">
                                {icon}
                                {cont}
                            </div>
                            <div className="close" onClick={() => this.props.action(false,0,"")}>
                                <FontAwesomeIcon icon={faTimes} style={pmcr}/>
                            </div>
                        </div>
                   </div>
                   
                   );
        }else{
            return(
                   <div></div>
            );
        }
    }
    
}
export default onClickOutside(ResultWindow)
