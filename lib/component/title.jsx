'use strict'

import React from 'react';

export default class title extends React.Component {
  render() {
    let data = this.props.data;

    if(data == undefined) {
      return null;
    }
    else {
      return (
        <h3 style={data.style}>{data.label}</h3>
      );
    }
  }
};
