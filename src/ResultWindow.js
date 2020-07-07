import React, { Component } from 'react';

import './ResultWindow.scss';



export default class ResultWindow extends Component {
    constructor(props){
        super(props);
    }
    render(){
        let cont = ""; //表示する文字列
        let val = this.state.value; //表示する種類
        
        switch(val){
            case 1: cont = this.props.mes + "を保存中です。";break;
        }
        return(
               <div className={this.props.isRWindow ? 'popup_effect' : 'popup_effect_de'} >
               
               </div>
               
               ):
    }
    
}
