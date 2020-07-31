import React, { Component } from 'react';

export default class p2 extends Component{
    constructor(props){
        super(props);
        this.state={
            examOpenFlag:-1
        }
    }


    render(){
        return(
            <div className="taskListWrap">
                {this.props.schedules.map((data,index) =>
                <>
                    {this.props.before[index] !== 0 ?
                        <div className="scheduleList">
                            <div className="sbu-window-c flex"><s>{index+1}講時</s><div className="changeScheduleMark">{this.props.before[index].afterDate} {this.props.before[index].after_position + 1}限目へ授業変更</div></div>
                            <div className=""><s>{data.title}</s></div>
                        </div>
                    :
                        <>
                            {this.props.after[index] !== 0 ?
                                <div className="scheduleList">
                                    <div className="sbu-window-c flex">{index+1}講時<div className="changeScheduleMark">補講</div></div>
                                    <div className="">{this.props.after[index].title}</div>
                                </div>
                            :
                                <>
                                    {data !== 0 ?
                                        <div className="scheduleList">
                                            <div className="sbu-window">{index+1}講時</div>
                                            <div className="">{data.title}</div>
                                        </div>
                                        :
                                        null
                                    }
                                </>
                            }
                        </>
                    }
                </>
                )}
                
            </div>

        );
    }
}
    