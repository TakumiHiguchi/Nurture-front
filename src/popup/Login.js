import React, { Component } from 'react';
import GoogleAuthentication from '../GoogleAuthentication'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //fontaweresomeのインポート
import { faTwitter } from "@fortawesome/free-brands-svg-icons"; //twitterアイコン
import { faGithub } from "@fortawesome/free-brands-svg-icons"; //githubアイコン
import { faLine } from "@fortawesome/free-brands-svg-icons"; //lineアイコン


import '../animation.scss';

const twitterIcon = {
    fontSize:"1.5em",
    color:"white",
    cursor: "pointer"
}
const lineIcon = {
    fontSize:"1.5em",
    color:"#Line",
    cursor: "pointer"
}

let nTimer;
export default class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            isChange:false,
            isLoginfails:false
        }
    }

    login(user,sns){
        this.setState({isChange:true});
        setTimeout(() => {
            this.props.action.userSignin(user,sns);
        }, 1000)
        nTimer = setTimeout(() => {
            this.setState({isLoginfails:true});
        }, 20000)
        
    }

    render(){
        if(this.props.user.session.length > 0 && this.state.isChange){
            setTimeout(() => {
                this.setState({isChange:false});
                if(nTimer){clearTimeout(nTimer);}
            }, 1000)
        }
        if(this.props.user.session.length === 0){
        return(
            <div className={this.props.isPopup ? 'popup popup_effect' : 'popup popup_effect_de'} >
                 <div className="popup_wrap" ></div>
                 <div className="logwhir">
                     <div className="her-right">
                            {this.state.isChange ?
                                <div className="loadingContainer">
                                    {!this.state.isLoginfails ?
                                        <>
                                            <p>Google Accountでログイン中です...</p>
                                            <div class="loader">Loading...</div>
                                        </>
                                    :
                                        <div className="loginerrorContainer">
                                            <p style={{paddingBottom:"20px"}}>ログインに失敗しました。再度ログインをお試しください。</p>
                                            <GoogleAuthentication action={(user,sns) => this.login(user,sns)}/>
                                            <div className="loginerrorTips">
                                                <p style={{paddingTop:"20px"}}>続けて問題が発生する場合は、ブラウザを変えてアクセスしてみてください。</p>
                                                <p>それでも解決しない場合は、お手数ですが<a>お問い合わせ</a>よりご連絡ください。</p>
                                            </div>
                                            
                                        </div>
                                    }
                                </div>
                            :
                                <>
                                    <h2 className="flex-jus-center">N:urture</h2>
                                    <p className="clx">今すぐログインして、自分の予定を管理したり、タスクを追加してみたりしましょう。</p>
                                    <GoogleAuthentication action={(user,sns) => this.login(user,sns)}/>
                                    <p className="ghi hrm"><span>または</span></p>
                                    <a className="linkBox-twitter hrm" href=""><FontAwesomeIcon style={twitterIcon} icon={faTwitter} /> twitterでログイン</a>
                                    <a className="linkBox-line hrm" href=""><FontAwesomeIcon style={lineIcon} icon={faLine} /> Lineでログイン</a>
                                    <div className="new_user" >
                                        <p className="cls">ログインすることにより、N:urture利用規約、データーに関するポリシーに同意したものとみなされます。</p>
                                    </div>
                                </>
                            }
                     </div>
                 </div>
             </div>
        )
        }else{
            return(<></>)
        }
    }
}
