'use strict'

import jQuery from 'jquery';
import React from 'react';

export default class radio extends React.Component {
  render() {
    let data = this.props.data;
    this.props.getData(data.id, '');
    this.props.getComponents(data.id, this);

    if(data == undefined) {
      return null;
    }
    else {
      return (
        <div ref="component" id={data.id} style={data.style}>
          {data.item.map((d, i) => {
            return (
              <label key={i} className="mdl-radio mdl-js-radio mdl-js-ripple-effect" htmlFor={data.id + "-" + i} style={d.style}>
                <input type="radio"
                  id={data.id + "-" + i}
                  className="mdl-radio__button"
                  name={data.id}
                  value={d.value}
                  onClick={this._click.bind(this)}
                />
                <span className="mdl-radio__label">{d.label}</span>
              </label>
            );
          }, this)}
        </div>
      );
    }
  }

  _click(e) {
    let data = this.props.data;
    jQuery(this.refs.component).removeClass('is-invalid');

    let val = jQuery(this.refs.component).find('input[type="radio"]:checked').val();
    if(data.change != undefined) {
      let temp = data.change(val);
      if(temp != undefined) {
        val = temp;
      }
    }
    this.props.getData(data.id, val);
  }
};
