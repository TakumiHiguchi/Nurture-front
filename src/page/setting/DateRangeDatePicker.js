import React, { Component } from 'react';
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker"
import moment from 'moment'

export default function DateRangeDatePicker(props){
    const handleChangeStart = (selectedDate) => {
        props.action(parseAsMoment(selectedDate).format('YYYY/MM/DD'),props.start);
    }
    const handleChangeEnd = (selectedDate) => {
        props.action(parseAsMoment(selectedDate).format('YYYY/MM/DD'),props.start + 1);
    }
    const parseAsMoment = (dateTimeStr) => {
        //dateオブジェクトから変換
        return moment.utc(dateTimeStr, 'YYYY-MM-DDTHH:mm:00Z', 'ja').utcOffset(9)
      }
    return (
      <div className="flex">
          <div className="calpoint">
              <DatePicker
                  selected={props.date.start}
                  selectsStart
                  startDate={props.date.start}
                  endDate={props.date.end}
                  onChange={handleChangeStart}
                  customInput={
                      <div>
                          {parseAsMoment(props.date.start).format('YYYY年 MM月 DD日')}
                      </div>
                  }
              />
          </div>
          <div className="flex-jus-center"> 〜 </div>
          <div className="calpoint">
            <DatePicker
              selected={props.date.end}
              selectsEnd
              startDate={props.date.start}
              endDate={props.date.end}
              onChange={handleChangeEnd}
              customInput={
                <div>
                  {parseAsMoment(props.date.end).format('YYYY年 MM月 DD日')}
                </div>
              }
            />
          </div>
      </div>
    )
  }
  