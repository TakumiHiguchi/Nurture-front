import React, { Component } from 'react';

export default class p1 extends Component{
    constructor(props){
        super(props);
        this.state={
            taskOpenFlag:-1
        }
    }
    handleTask(index){
        if(this.state.taskOpenFlag !== index){
            this.setState({taskOpenFlag:index});
        }else{
            this.setState({taskOpenFlag:-1});
        }
    }
    taskAPIfunction_update(task){
        const disString = ["完了済み","未完了"]
        let value = this.props.value;
        let d_id = 0;
        let dataHash = {};
        let cont = ""
        if(task != void 0){
            d_id = task.id;
            dataHash = task;
            dataHash.complete = !dataHash.complete;
        }
        if(dataHash.complete){
            cont = disString[0];
        }else{
            cont = disString[1];
        }
        this.props.apiFunction.task_update(d_id, dataHash ,"タスクを" + cont + "にしました");
    }

    render(){
        return(
            <div className="taskListWrap">
                {this.props.tasks.map((data,index)=>
                    <div className="taskList" key={"taskWindow" + data.id}>
                        <div className="tlp" onClick={() => this.handleTask(index)} key={"taskTitle" + index}>
                        {data.complete ?
                            <><s>{data.title}</s>（完了済み）</>
                        :
                            <>{data.title}</>
                        }
                    </div>
                    <div className={this.state.taskOpenFlag === index ? "xyTaskEf xyTaskContant" : "xyTaskEf_de xyTaskContant"}>
                        <div className="mainCont" dangerouslySetInnerHTML={{
                            __html: data.content
                            }}></div>
                            {data.calUser === data.calOwner &&
                                <div className="completeBtn" onClick={() => this.taskAPIfunction_update(data)}>
                                    {data.complete ?
                                        <>未完了にする</>
                                    :
                                        <>完了にする</>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                )}
            </div>

        );
    }
}
    