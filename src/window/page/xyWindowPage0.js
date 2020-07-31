import React, { Component } from 'react';

export default class p1 extends Component{
    constructor(props){
        super(props);
        this.state={
            examOpenFlag:-1
        }
    }
    handleExam(index){
        if(this.state.examOpenFlag !== index){
            this.setState({examOpenFlag:index});
        }else{
            this.setState({examOpenFlag:-1});
        }
    }
    
    examAPIfunction_update(exam){
        const disString = ["完了済み","未完了"]
        let value = this.props.value;
        let d_id = 0;
        let dataHash = {};
        let cont = ""
        if(exam != void 0){
            d_id = exam.id;
            dataHash = exam;
            dataHash.complete = !dataHash.complete;
        }
        if(dataHash.complete){
            cont = disString[0];
        }else{
            cont = disString[1];
        }
        this.props.apiFunction.exam_update(d_id, dataHash ,"試験を" + cont + "にしました");
    }

    render(){
        return(
            <div className="taskListWrap">
                {this.props.exams.map((data,index)=>
                    <div className="taskList" key={"examWindow" + data.id}>
                        <div className="elp" onClick={() => this.handleExam(index)} key={"examTitle" + index}>
                        {data.complete ?
                            <><s>{data.title}</s>（完了済み）</>
                        :
                            <>{data.title}</>
                        }
                    </div>
                    <div className={this.state.examOpenFlag === index ? "xyTaskEf xyTaskContant" : "xyTaskEf_de xyTaskContant"}>
                        <div className="mainCont" dangerouslySetInnerHTML={{
                            __html: data.content
                            }}></div>
                            {data.calUser === data.calOwner &&
                                <div className="completeBtn" onClick={() => this.examAPIfunction_update(data)}>
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
    