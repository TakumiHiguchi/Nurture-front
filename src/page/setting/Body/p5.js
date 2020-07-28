import React, { Component } from 'react';

export default function p5(props){
    return(
        <main key={"settingP5"} className={props.element.page === 5 ? 'settingBodyWrap popup_toggle_effect' : 'settingBodyWrap popup_toggle_effect_de'}>
            <section className="settingBody">
                <h2 className="menu flex-algin-center">カレンダーライブラリー</h2>
            </section>
        </main>
    )
}