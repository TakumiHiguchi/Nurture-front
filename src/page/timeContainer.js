import React, { Component } from 'react';


export default function timeContainer(props){
    return(
           <div className="fa-timeline">
                <div className="fa-class-time flex-jus-center">
                    <div className="fab-time-top">9:00</div>
                    <div className="fab-time-bottom">10:30</div>
                    <div className="scheduleHour">1</div>
                </div>
               <div className="fa-class-time flex-jus-center">
                   <div className="fab-time-top">10:40</div>
                   <div className="fab-time-bottom">12:10</div>
                   <div className="scheduleHour">2</div>
               </div>
               <div className="fa-class-time flex-jus-center">
                   <div className="fab-time-top">13:00</div>
                   <div className="fab-time-bottom">14:30</div>
                   <div className="scheduleHour">3</div>
               </div>
               <div className="fa-class-time flex-jus-center">
                   <div className="fab-time-top">14:40</div>
                   <div className="fab-time-bottom">16:10</div>
                   <div className="scheduleHour">4</div>
               </div>
               <div className="fa-class-time flex-jus-center">
                   <div className="fab-time-top">16:20</div>
                   <div className="fab-time-bottom">17:50</div>
                   <div className="scheduleHour">5</div>
               </div>
               <div className="fa-class-time flex-jus-center">
                   <div className="fab-time-top">18:00</div>
                   <div className="fab-time-bottom">19:30</div>
                   <div className="scheduleHour">6</div>
               </div>
           </div>
    )
}
