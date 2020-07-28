import React, { Component } from 'react';

export default class p4 extends Component{
    constructor(props){
        super(props);
        this.state={
            name:"",
            description:"",
            share:false,
            clone:false
        }
    }
    inputNameStart(val){
        this.setState({name:val});
    }
    inputDescriptionStart(val){
        this.setState({description:val});
    }
    inputShareStart(){
        this.setState({share:!this.state.share});
        if(!this.state.share){
            this.setState({clone:false});
        }
    }
    inputCloneStart(){
        this.setState({clone:!this.state.clone});
    }
    calendarCreate(){
        let ins ={
            name: this.state.name,
            description: this.state.description,
            color: this.state.color,
            shareBool: this.state.share,
            cloneBool: this.state.clone
        }
        this.props.apiFunction.calendar_create(ins)
    }

    render(){
        return(
            <main key={"settingP4"} className={this.props.element.page === 4 ? 'settingBodyWrap popup_toggle_effect' : 'settingBodyWrap popup_toggle_effect_de'}>
                <section className="settingBody">
                    <h2 className="menuH2 flex-algin-center">カレンダーの作成</h2>
                    <div className="formInputWrap" style={{marginBottom:"10px"}}>
                        <div>カレンダーの名前</div>
                        <input type="text" placeholder="カレンダーの名前を入力（必須）" className="removeCss" value={this.state.name} onChange={(e) => this.inputNameStart(e.target.value)}/>
                    </div>
                    <div className="formTextareaWrap" style={{marginBottom:"10px"}}> 
                        <div>カレンダーの説明</div>
                        <textarea placeholder="カレンダーの説明を入力" className="removeTACss" rows="10" value={this.state.description} onChange={(e) => this.inputDescriptionStart(e.target.value)}></textarea>
                    </div>
                </section>
                <section className="settingBody">
                    <h2 className="menuH2 flex-algin-center">公開設定</h2>
                    <div className="setting_CalCheckBox flex-align-center" style={{cursor:"pointer"}} onClick={() => this.inputShareStart()}>
                        <div className="point flex-jus-center" style={{border:"2px solid #00aced"}} >
                            {this.state.share&&
                                <div style={{background:"#00aced"}}></div>
                            }
                        </div>
                        <div className="label scroll-x">カレンダーを公開して他の人と共有する</div>
                    </div>
                    <div className="setting_CalCheckBox flex-align-center" style={this.state.share ? {cursor:"pointer"} : null} onClick={() => this.inputCloneStart()}>
                        <div className="point flex-jus-center" style={this.state.share ? {border:"2px solid #00aced",cursor:"pointer"} : {border:"2px solid #aaa"}}>
                            {this.state.share && this.state.clone &&
                                <div style={{background:"#00aced"}}></div>
                            }
                        </div>
                        <div className="label scroll-x" style={this.state.share ? null : {color:"#aaa"}}>カレンダーのコピーを許可する</div>
                    </div>
                    <p className="secline">「カレンダーを公開して他の人と共有する」を選択すると、誰でもあなたの予定を見れるようになります。</p>
                    <p className="secline">詳しいカレンダーの公開設定の説明については<a>ヘルプ: カレンダーの公開設定について</a>をご覧ください。</p>
                    {this.state.name != "" ?
                        <>
                            <div className="btn-submit settingDeleteBtn" style={{marginTop:"50px"}} onClick={() => this.calendarCreate()}>カレンダーを作成</div>
                            <p className="secline">カレンダーを作成して追加します。</p>
                            <p className="secline">カレンダーライブラリーから他の人が作成したカレンダーを追加することもできます。</p>
                        </>
                    :
                        <>
                            <div className="btn-submit-sub settingDeleteBtn" style={{marginTop:"50px"}}>カレンダーを作成</div>
                            <p className="secline" style={{color:"red"}}>カレンダーの名前を入力してください</p>
                        </>
                    }
                </section>
            </main>
        )
    }
}