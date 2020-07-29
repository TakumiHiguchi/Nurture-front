import React, { Component } from 'react';

import { GoogleLogout,GoogleLogin } from 'react-google-login'; //googleログインのログアウト
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //fontaweresomeのインポート
import { faClock,faClipboard } from '@fortawesome/free-regular-svg-icons';


const FASiconsstyle = {
    arrowLeft:{
        fontSize:"1em"
    },
    clock :{
        fontSize:"1.1em",
        margin:"0 5 0 0"
    },
    clock_lp :{
        fontSize:"1.1em",
        margin:"0 15 0 0"
    }
}

export default class p2 extends Component{
    
    constructor(props){
        super(props);
        this.state={
            name:-1,
        }
    }
    inputNameStart(val){
        this.setState({name:val});
        setTimeout(() => {
            let user = this.props.element.user;
            user.name = this.state.name;
            this.props.apiFunction.user_update(user);
        }, 2000)
    }
    render(){
        let user = this.props.element.user;
        
        return(
            <main key={"settingP2"} className={this.props.element.page === 2 ? 'settingBodyWrap popup_toggle_effect' : 'settingBodyWrap popup_toggle_effect_de'}>
                <section className="settingBody">
                    <h2 className="menuH2 flex-algin-center alp">アカウント情報</h2>
                    <div className="formInputWrap" style={{marginBottom:"10px"}}>
                        <div>名前</div>
                        <input type="text" placeholder="カレンダーの名前を入力（必須）" className="removeCss" value={this.state.name == -1 ? user.name : this.state.name} onChange={(e) => this.inputNameStart(e.target.value)}/>
                    </div>
                </section>
                <section className="settingBody">
                    <h2 className="menu flex-algin-center alp">アカウント登録日</h2>
                    <div>
                        <FontAwesomeIcon icon={faClock} style={FASiconsstyle.clock_lp} />
                        {user.created_at}
                    </div>
                </section>
                <section className="settingBody">
                    <h2 className="menu flex-algin-center alp">UserKey</h2>
                    <div className="sec-main">
                        <FontAwesomeIcon icon={faClipboard} style={FASiconsstyle.clock_lp} />
                        {user.key}
                    </div>
                    <p className="secline">ユーザーごとの固有のキーです。各種お問い合わせ時などに使用することがあります。</p>
                    <p className="secline">このキーは4.3*10^-60の確率で衝突する場合があります。詳しくは<a>ヘルプ: UserKeyについて</a>をご覧ください。</p>
                </section>
            </main>
        )
    }
}

//userプレート
/*
<section className="settingBody">
<h2 className="menu flex-algin-center alp">アカウント</h2>
                <div className="userAccountBox">
                    <div className="iconBox flex-jus-center">
                        {user.imageURL=="" ?
                            <div className="icon" >
                            </div>
                        :
                            <div className="icon flex-jus-center">
                                <img src={user.imageURL}/>
                            </div>
                        }
                    </div>
                     <div className="userProfBox">
                        <p className="name">{user.name}</p>
                        <p className="university">Nihon University</p>
                        <div className="flex-jus-center drw-menu-rap">
                            <div className="drw-menu drw-line">
                                <p className="drw-he">Completed tasks</p>
                                <p className="drw-ens">3,980,011</p>
                                <p className="drw-he">tasks</p>
                            </div>
                            <div className="drw-menu drw-line">
                                <p className="drw-he">Schedule</p>
                                <p className="drw-ens">11</p>
                                <p className="drw-he">schedules</p>
                            </div>
                            <div className="drw-menu">
                                <p className="drw-he">Grade</p>
                                <p className="drw-ens">3</p>
                                <p className="drw-he">p</p>
                            </div>
                        </div>
                    </div>
                    <div className="logoutB flex-jus-center" >
                        {user.session == "" ?
                            <GoogleLogin className="googleAuth"
                                clientId="653992313170-okt2tfmukp5eg4s4g8fiaf6u3261a0ov.apps.googleusercontent.com"
                                render={renderProps => (
                                    <div onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                        Sign in
                                    </div>
                                )}
                                buttonText="ログイン"
                                isSignedIn={true}
                            />
                        :
                            <GoogleLogout
                                clientId="653992313170-okt2tfmukp5eg4s4g8fiaf6u3261a0ov.apps.googleusercontent.com"
                                render={renderProps => (
                                    <div onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                        Sign out
                                    </div>
                                )}
                                buttonText="Logout"
                                onLogoutSuccess={() => props.action.logout()}
                            />
                        }
                    </div>
                </div>
            </section>
            */