import React, {Component} from 'react';
import RichTextEditor from 'react-rte';

export default class TlEditor extends React.Component {
    constructor(props){
        super(props);
        this.state={
            value:null
        }
    }

  onChange(value){
      this.setState({value});
    if (this.props.onChange) {
      this.props.onChange(
        value.toString('html')
      );
    }
  };

  render () {
    return (
              <RichTextEditor
                value={this.props.bl ? this.state.value : RichTextEditor.createValueFromString(this.props.value, 'html')}
                onChange={value => this.onChange(value)}
                placeholder={this.props.placeholder}
              />
    );
  }
}
