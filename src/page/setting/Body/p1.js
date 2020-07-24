import React, { Component } from 'react';

import DDMsettingGrade from '../../../dropdownMenu/DDMsettingGrade'

export default function p1(props){
    return(
        <main key={"settingP1"} className={props.element.page === 1 ? 'bodyWrap popup_toggle_effect' : 'bodyWrap popup_toggle_effect_de'}>
            <section className="settingBody">
                <h2 className="menu flex-algin-center">現在の学年</h2>
                <DDMsettingGrade element={props.element.user.grade} action={(select) => props.action.setGrade(select)}/>
                <p className="secline">ここで選択された学年のスケジュールが、カレンダーに表示されます。</p>
            </section>
        </main>
    )
}