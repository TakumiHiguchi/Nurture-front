import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { GoogleLogin } from 'react-google-login';

export default class GoogleAuthentication extends Component {
    initSignInButton = (gapi) => {
        gapi.load('auth2', () => {
            gapi.auth2.init({client_id:'653992313170-okt2tfmukp5eg4s4g8fiaf6u3261a0ov.apps.googleusercontent.com'})
            .then(
                (result) => {
                    gapi.signin2.render('google-signin-button', {
                    'onsuccess': this.onSignIn,
                    'onfailure': (err) => console.error(err)
                    })
                },
               (err) => console.error(err)
            );
        })
    }
    onSignIn = (googleUser) => {
        
        //親コンポーネントのログイン処理を叩く
        this.props.action(googleUser,"Google");
        
    }
    componentDidMount() {
        this.downloadGoogleScript(this.initSignInButton)
    }
    downloadGoogleScript = (callback) => {
        const element = document.getElementsByTagName('script')[0];
        const js = document.createElement('script');
        js.id = 'google-platform';
        js.src = '//apis.google.com/js/platform.js';
        js.async = true;
        js.defer = true;
        element.parentNode.insertBefore(js, element);
        js.onload = () => callback(window.gapi);
    }
    
    responseGoogle = (response) => {
      //親コンポーネントのログイン処理を叩く
      this.props.action(response,"Google");
    }
    
    render() {
        return (
                <GoogleLogin className="googleAuth"
                    clientId="653992313170-okt2tfmukp5eg4s4g8fiaf6u3261a0ov.apps.googleusercontent.com"
                    buttonText="ログイン"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                />
       )
    }
}
