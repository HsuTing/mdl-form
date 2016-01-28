'use strict'

import jQuery from 'jquery';
import React from 'react';

export default class file extends React.Component {
  render() {
    let data = this.props.data;
    this.props.getData(data.id, '');
    this.props.getComponents(data.id, this);

    let Input;
    if(data.isMultiple) {
      Input = <input id={data.id} type="file" style={{display: 'none'}} onChange={this._onChange.bind(this)} multiple />
    }
    else {
      Input = <input id={data.id} type="file" style={{display: 'none'}}  onChange={this._onChange.bind(this)} />
    }

    return (
      <div ref="component" className="file mdl-card mdl-shadow--2dp" style={data.style}>
        <div className="mdl-card__supporting-text" style={{
          height: "100%"
        }}>
          <label
            className="file-border"
            htmlFor={data.id}
            onDragOver={this._dropOver.bind(this)}
            onDrop={this._drop.bind(this)}
            style={{
              height: "calc(100% - 32px)",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              borderStyle: "dashed",
              cursor: "pointer"
          }}>
           <div
             className="files"
             style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}>
              {data.label}
            </div>
          </label>
          {Input}
        </div>
      </div>
    );
  }

  _dropOver(e) {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }

  _drop(e) {
    e.stopPropagation();
    e.preventDefault();
    this._getData(e.dataTransfer.files);
  }

  _onChange(e) {
    this._getData(e.target.files);
  }

  _getData(files) {
    let data = this.props.data;
    let output = [];
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      let reader = new FileReader();
      reader.readAsText(file, "utf8");
      reader.onload = ((theFile) => {
        return (e) => {
          let info = {
            file_name: file.name,
            file_type: file.type,
            file_lastModifiedDate: file.lastModifiedDate,
            file_data: e.target.result
          };
          if(data.change != undefined) {
            let temp = data.change(info);
            if(temp != undefined) {
              info = temp;
            }
          }
          output.push(info);
          if(files.length == 1) {
            jQuery(this.refs.component).find('.files').html(file.name);
          }
          else if(file.length != 0) {
            jQuery(this.refs.component).find('.files').html("已上傳" + files.length + "個檔案");
          }
        };
      })(file);
    }

    if(data.isNotRequire) {
      jQuery(this.refs.component).removeClass('is-invalid');
      this.props.getData(data.id, output);
      return;
    }

    if(files.length == 0) {
      jQuery(this.refs.component).addClass('is-invalid');
      jQuery(this.refs.component).find('.files').html(data.label);
      this.props.getData(data.id, '');
    }   
    else {
      jQuery(this.refs.component).removeClass('is-invalid');
      this.props.getData(data.id, output);
    }   
  }
};
