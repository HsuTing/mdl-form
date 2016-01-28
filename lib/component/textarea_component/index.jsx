'use strict'

import jQuery from 'jquery';
import React from 'react';

export default class textarea extends React.Component {
  render() {
    let data = this.props.data;
    this.props.getData(data.id, '');
    this.props.getComponents(data.id, this);

    return (
      <div ref="component" className="mdl-textfield mdl-js-textfield" style={data.style}>
        <textarea className="mdl-textfield__input" type="text" rows={data.rows} id={data.id} onChange={this._onChange.bind(this)}></textarea>
        <label className="mdl-textfield__label" htmlFor={data.id}>{data.label}</label>
      </div>
    );
  }

  _onChange(e) {
    let data = this.props.data;
    let val = jQuery(e.target).val();
    if(data.change != undefined) {
      let temp = data.change(val);
      if(temp != undefined) {
        val = temp;
      }
    }   

    if(data.isNotRequire) {
      this.props.getData(data.id, val);
      return;
    }   

    if(jQuery(e.target).val == '') {
      jQuery(this.refs.component).addClass('is-invalid');
      this.props.getData(data.id, '');
    }   
    else {
      this.props.getData(data.id, val);
    }   
  }
};
