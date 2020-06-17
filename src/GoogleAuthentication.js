import React, { Component } from 'react';
import ReactDOM from 'react-dom';


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
        var profile = googleUser.getBasicProfile();
        console.log("ID: " + profile.getId()); // Don't send this directly to your server!
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log("Image URL: " + profile.getImageUrl());
        console.log("Email: " + profile.getEmail());

        // The ID token you need to pass to your backend:
        var id_token = googleUser.getAuthResponse().id_token;
        console.log("ID Token: " + id_token);
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
    
    render() {
        return (
                <div>
                    <div className="g-signin2 googleAuth" id='google-signin-button'></div>
                </div>
       )
    }
}
