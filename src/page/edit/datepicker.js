import React, {Component} from 'react';
import moment from 'moment'
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker"

export default class DatePickerComponent extends Component {
    constructor(props){
        super(props)
    }
    
    handleChange = date => {
        this.props.action(this.parseAsMoment(date).format('YYYY/MM/DD'));
    };
    
    parseAsMoment = (dateTimeStr) => {
        return moment.utc(dateTimeStr, 'YYYY-MM-DDTHH:mm:00Z', 'ja').utcOffset(9)
    }
 
  render() {
    return (
      <DatePicker
        selected={this.props.date}
        onChange={this.handleChange}
        locale="ja"
        customInput={
          <div className="datepicker">
            {this.parseAsMoment(this.props.date).format('YYYY年 MM月 DD日')}
          </div>
        }
      />
    );
  }
}
