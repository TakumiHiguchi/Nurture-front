import React, { Component } from 'react';

export default function Confirmation(props){
    return (
      <div className={props.isPopup ? 'popup popup_effect' : 'popup popup_effect_de'} style={{zIndex:"999999"}}>
        <div className="popup_wrap" onClick={() => props.action.cancel() }></div>
        <div className="confirmationWhir">
          <div>{props.label.main}</div>
          <div className="confirmation-button flex-jus-center">
            <div onClick={() => props.action.cancel() } className="btn-submit-sub flex-jus-center">{props.label.cancel}</div>
            <div onClick={() => props.action.submit() } className="btn-submit flex-jus-center">{props.label.submit}</div>
          </div>
        </div>
      </div>
    )
  }
  