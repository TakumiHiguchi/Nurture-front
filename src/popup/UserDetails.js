import React, { Component } from 'react';
import { GoogleLogout } from 'react-google-login'; //googleログインのログアウト

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //fontaweresomeのインポート
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faExternalLinkAlt,faInfoCircle,faBook,faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";//カレンダー

import '../animation.scss';

const exLink = {
    fontSize:"1em",
    color:"#494949",
    cursor: "pointer"
}
const exLogout = {
    fontSize:"1.2em",
    color:"#494949",
    cursor: "pointer"
}

const githubIcon = {
    fontSize:"1.3em",
    color:"#24292e",
    cursor: "pointer"
}
const info = {
    fontSize:"1.3em",
    color:"#00aced",
    cursor: "pointer"
}

export default class UserDetail extends Component {
    constructor(props){
        super(props)
        this.state={
            drop:{github:false}
        }
    }
    render(){
        return(
            <>
                {this.props.user.session.length > 0 &&
               <div className={this.props.isPopup ? 'popup popup_toggle_effect' : 'popup popup_toggle_effect_de'} >
                    <div className="popup_wrap" onClick={() => this.props.action(1) }></div>
                    <div className="userDetailwhir flex">
                        <div class="userDetailBox">
                            <div className="iconBox flex-jus-center">
                                <div className="userIcon"><img src={this.props.user.imageURL} /></div>
                            </div>
                            <div className="userName flex-jus-center">{this.props.user.name}</div>
                            <div className="flex-jus-center"><div className="userKey flex">{this.props.user.key}</div></div>
                            <div className="flex-jus-center nsB"><div className="nurtureSettingB flex-jus-center">Nurtureの設定</div></div>
                            <div className="menuBox">
                                <a href="https://portal.upex.ce.nihon-u.ac.jp/up/faces/login/Com00501A.jsp" className="menu flex">
                                    <div className="flex-jus-center sPmenuIcon"><FontAwesomeIcon style={exLink} icon={faExternalLinkAlt} /></div>
                                    日本大学工学部ポータルサイト
                                </a>
                                <a href="https://classroom.google.com/u/0/h" className="menu flex">
                                    <div className="flex-jus-center sPmenuIcon"><FontAwesomeIcon style={githubIcon} icon={faUsers} /></div>
                                    GoogleClassroom
                                </a>
                                <a href="https://calendar.google.com/calendar/" className="menu flex">
                                    <div className="flex-jus-center sPmenuIcon"><FontAwesomeIcon style={githubIcon} icon={faCalendarAlt} /></div>
                                        Googleカレンダー
                                </a>
                                <div className="menu flex" onClick={() => this.setState({drop:{github:!this.state.drop.github}})}>
                                    <div className="flex-jus-center sPmenuIcon"><FontAwesomeIcon style={githubIcon} icon={faGithub} /></div>
                                    N:urture Githubレポジトリ
                                </div>
                                <div className={this.state.drop.github ? 'toggle_effect' : 'toggle_effect_de'} >
                                    <div className="sContentBox">
                                        <p>N:urtureは、フロントエンド、バックエンドの全てのソースコードを公開しています。</p>
                                        <p>N:urture（web版)の主な使用言語はフロントエンド: React、JSX バックエンド: Java、Ruby(API)です。</p>
                                        <a href="https://github.com/TakumiHiguchi/Nurture-front" className="nurtureGithubB flex-jus-center">N:urture-front-end Repository</a>
                                        <a href="https://github.com/TakumiHiguchi/Nurture-backendAPI" className="nurtureGithubB flex-jus-center">N:urture-API Repository</a>
                                    </div>
                                </div>
                                <div className="menu flex">
                                    <div className="flex-jus-center sPmenuIcon"><FontAwesomeIcon style={info} icon={faInfoCircle} /></div>
                                    N:urtureについて
                                </div>
                                <div className="menu flex">
                                    <div className="flex-jus-center sPmenuIcon"><FontAwesomeIcon style={info} icon={faBook} /></div>
                                    API
                                </div>
                                <GoogleLogout
                                  clientId="653992313170-okt2tfmukp5eg4s4g8fiaf6u3261a0ov.apps.googleusercontent.com"
                                  render={renderProps => (
                                    <div className="menu flex" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                        <div className="flex-jus-center sPmenuIcon"><FontAwesomeIcon style={exLogout} icon={faSignOutAlt} /></div>
                                        ログアウト
                                    </div>
                                  )}
                                  buttonText="Logout"
                                        onLogoutSuccess={() => this.props.logout()}
                                />
                                
                                
                            </div>
                        </div>
                       <div class="newsBox">
                           <h2 className="flex-jus-center">{this.props.user.mes}</h2>
                           <div className="newsContainer">
                               <div className="newsContainer_head flex">
                                   <div>日本大学</div>
                                   <div>N:urture</div>
                               </div>
                               <div className="newsContainer_body scroll-y">
                                   {this.props.news.map((data) =>
                                    <a href={data.link} className="newsIneer flex">
                                            <div className="dateCircle flex-jus-center">
                                                <div className="dateCircleInner">
                                                    <div>{data.date}</div>
                                                </div>
                                            </div>
                                            <div className="newsTitle">
                                                <h3>{data.title}</h3>
                                                <a href={data.base_link}>{data.base_title}</a>
                                            </div>
                                    </a>
                                   )}
                               </div>
                           </div>
                       </div>
                    </div>
                </div>
                }
            </>
        )
    }
    
}