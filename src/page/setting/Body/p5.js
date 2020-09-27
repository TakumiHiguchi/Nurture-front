import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //fontaweresomeのインポート
import { faClone } from "@fortawesome/free-regular-svg-icons";//カレンダー
import { faUserTag } from "@fortawesome/free-solid-svg-icons";

 var nTimer;
export default class p5 extends Component{
    constructor(props){
        super(props);
        this.state={
            search:""
        }
        
    }
    inputSearchStart(val){
        this.setState({search:val});
        if(nTimer){clearTimeout(nTimer);}
        nTimer = setTimeout(() => {
            this.props.apiFunction.calendar_share("search",0,"search",this.state.search);
            console.log(this.state.search)
        }, 100)
    }
    render(){
        return(
            <main key={"settingP5"} className={this.props.element.page === 5 ? 'settingBodyWrap popup_toggle_effect' : 'settingBodyWrap popup_toggle_effect_de'}>
                <section className="settingBody">
                    <h2>カレンダーライブラリー</h2>
                    <div className="libraryMenu flex-jus-between">
                        <div className="tags flex">
                            <div className="flex-jus-center active">検索結果</div>
                            <div className="flex-jus-center">人気</div>
                            <div className="flex-jus-center">最新</div>
                        </div>
                        <div className="search">
                            <input type="text" placeholder="カレンダー名やKey、キーワードで検索" className="removeCss" value={this.state.search} onChange={(e) => this.inputSearchStart(e.target.value)}/>
                        </div>
                    </div>
                    <div className="flex calendarSearchResult">
                        {this.props.calendarSearchResult.map((data) =>
                            <div className="CalendarCard flex" key={data.key + "calendarSearch" + this.state.search}>
                                <div className="flex" style={{width:"100%"}}>
                                    <div className="imageContainer" style={{color:data.color}}>{data.name.slice(0,1)}</div>
                                    <div className="dataContainer">
                                        <div className="nameBox flex-jus-between scroll-x">{data.name}</div>
                                        <div className="authorBox flex-jus-between scroll-x">作成者: {data.author_name}</div>
                                        <div className="descriptionBox flex-jus-between scroll-y">{data.description}</div>
                                        <div className="buBo flex">
                                            {data.cloneBool &&
                                                <div onClick={() => this.props.action.ConfirmationPopup("コピーする","キャンセル","「" + data.name + "」カレンダーをコピーしようとしています。本当にコピーしますか？コピーされたカレンダーは自動的に追加されます。",data.id,"clone")}><FontAwesomeIcon icon={faClone} style={{paddingRight:"5px"}}/>コピーする</div>
                                            }
                                            <div onClick={() => this.props.action.ConfirmationPopup("フォローする","キャンセル","「" + data.name + "」カレンダーをフォローしようとしています。本当にフォローしますか？フォローされたカレンダーは自動的に追加されます。",data.id,"follow")}><FontAwesomeIcon icon={faUserTag} style={{paddingRight:"5px"}}/>フォローする</div>
                                        </div>
                                        <div className="data flex">
                                            <div>授業: {data.scheduleCount}件</div>
                                            <div>タスク: {data.taskCount}件</div>
                                            <div>試験: {data.examCount}件</div>
                                            <div>授業変更: {data.change_schedulesCount}件</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {this.props.calendarSearchResult.length < 1 &&
                            <div>検索結果に合致するカレンダーがありません。キーワードを変えて再度検索ください。</div>
                        }
                    </div>
                </section>
                
            </main>
        )
    }
}