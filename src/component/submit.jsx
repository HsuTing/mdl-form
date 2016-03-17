'use strict';

import React from 'react';

export default class submit extends React.Component {
  render() {
    let data = this.props.data;

    if(data == undefined) {
      return null;
    }
    else {
      return (
        <a className={data.className === undefined ? "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" : data.className}
          style={data.style}
          onClick={this._click.bind(this, data)}
        >{data.label}</a>
      );
    }
  }

  _click(data, e) {
    this.props.submit();
    if(data.click != undefined) {
      data.click();
    }
  }
};
