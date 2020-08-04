import React, { Component } from 'react';
import ScheduleManual from './scheduleManual'
import ScheduleRegester from './ScheduleRegester'
import Login from './Login'
import UserDetail from './UserDetails'

export default function popup (props){
    return (
            <>
                <ScheduleManual 
                    isPopup={props.status.manual}
                    action={props.action}
                    apiFunction={props.apiFunction}
                />
                <ScheduleRegester
                    isPopup={props.status.regester}
                    calendar={props.calendar}
                    sceduleDatas = {props.sceduleDatas}
                    action={props.action}
                />
                <Login 
                    user={props.user} 
                    isPopup={props.status.login} 
                    action={{
                        userSignin: (user,sns) => props.action.userSignin(user,sns)
                    }} 
                />
                <UserDetail 
                    isPopup={props.status.login} 
                    action={() => props.action.PopupToggle("login")} 
                    user={props.user} 
                    logout={() => props.action.logout()} 
                    news={props.news}/>
            </>
            );
     
}
//<Popup1 type={3} user={this.state.user} action={{PopupToggle: (ce) => this.PopupToggle(ce),userSignin:(user,sns) => this.userSignin(user,sns), logout: () => this.logout()}} status={this.state.popup.login}
//news={this.state.news}
///>