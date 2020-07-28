import React, { Component } from 'react';



import DDMsettingGrade from '../../dropdownMenu/DDMsettingGrade'


import P1 from './Body/p1'
import P2 from './Body/p2'
import P3 from './Body/p3'
import P4 from './Body/p4'
import P5 from './Body/p5'

import './setting.scss';



export default class Body extends Component{
    
    
    
    

    

    render(){
        switch(this.props.element.page){
            case 1: return <P1 element={this.props.element} action={this.props.action}/> ;break;
            case 2: return <P2 element={this.props.element} action={this.props.action}/> ;break;
            case 3: return <P3 calendar={this.props.calendar} element={this.props.element} action={this.props.action} 
                                regesSemesterDate = {(cal,date,position) => this.props.regesSemesterDate(cal,date,position)}
                                page={this.props.page}
                                apiFunction={this.props.apiFunction}
                                changePage={this.props.changePage}
                            /> ;
                            break;
            case 4: return <P4 element={this.props.element} action={this.props.action} apiFunction={this.props.apiFunction}/> ;break;
            case 5: return <P5 element={this.props.element} 
                                action={this.props.action} 
                                apiFunction={this.props.apiFunction}
                                calendarSearchResult={this.props.calendarSearchResult}
                            /> ;
                            break;
        }
    }
    
}
//style
const calnedar={
}