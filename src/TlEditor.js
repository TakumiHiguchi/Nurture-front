import React, {Component} from 'react';
import RichTextEditor from 'react-rte';

export default class TlEditor extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: RichTextEditor.createEmptyValue()
        }
    }

  onChange(value){
    this.setState({value});
    if (this.props.onChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real app it
      // would be better to avoid generating a string on each change.
      this.props.onChange(
        value.toString('html')
      );
    }
  };

  render () {
    return (
            <div className="task-textarea">
              <RichTextEditor
                value={this.state.value}
                onChange={value => this.onChange(value)}
                placeholder={this.props.placeholder}
              />
                <div className="tlEDeleteButton" onClick={() => this.setState({value: RichTextEditor.createEmptyValue()})}>文章を削除</div>
            </div>
    );
  }
}
