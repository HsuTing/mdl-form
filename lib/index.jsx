'use strict';

import jQuery from 'jquery';
import React from 'react';

import AnimationShow from './animation/show';
import AnimationHide from './animation/hide';

import Title from './component/title';
import Submit from './component/submit';

import Input from './component/input';
import Radio from './component/radio';
import Textarea from './component/textarea';
import File from './component/file';

export default class form extends React.Component {
  constructor() {
    super();
    this.state = { 
      'data': {
        'form': []
      },
      'output': {},
      'components': {}
    };  
  }

  componentDidMount() {
    let self = this;
    jQuery(this.refs.form)
      .off("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd")
      .on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(e) {
        if(jQuery(this).hasClass('form-hide-animation')) {
          jQuery(this)
            .removeClass('form-hide-animation')
            .addClass('form-hide');

          self.setState({'data': self.props.data});
        }
        else if(jQuery(this).hasClass('form-show-animation')) {
          jQuery(this)
            .removeClass('form-show-animation')
            .addClass('form-show');
        }
      });

    componentHandler.upgradeDom();
    this.setState({'data': this.props.data});
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.noAnimation != true) {
      jQuery(this.refs.form)
        .removeClass('form-show')
        .addClass('form-hide-animation');
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.change != undefined) {
      prevProps.change();
    }

    if(this.props.noAnimation != true) {
      jQuery(this.refs.form)
        .removeClass('form-hide')
        .addClass('form-show-animation');
    }
    componentHandler.upgradeDom();
  }

  render() {
    if(this.state.data == undefined) {
      return null;
    }

    return (
      <div ref="form">
        <Title data={this.state.data.title} />

        <div className="form-body">
        {this.state.data.form.map((d, i) => {
          this._checkFormData(d, i);

          switch(d.tag) {
            case "input":
              return (
                <div key={i}>
                  <Input data={d} keyDown={this._keyDown.bind(this)} getData={this._getData.bind(this)} getComponents={this._getComponents.bind(this)}/>
                </div>
              );
            case "radio":
              return (
                <div key={i}>
                  <Radio data={d} getData={this._getData.bind(this)} getComponents={this._getComponents.bind(this)} />
                </div>
              );
            case "textarea":
              return (
                <div key={i}>
                  <Textarea data={d} getData={this._getData.bind(this)} getComponents={this._getComponents.bind(this)} />
                </div>
              );
            case "file":
              return (
                <div key={i}>
                  <File data={d} getData={this._getData.bind(this)} getComponents={this._getComponents.bind(this)} />
                </div>
              );
            default:
              return null;
          }
        }, this)}
        </div>

        <Submit data={this.state.data.submit} submit={this._submit.bind(this)}/>
      </div>
    );
  }

  _keyDown(e) {
    if(e.which == 13) {
      this._submit();
    }   
  }

  _checkFormData(data, i) {
    if(data.tag == undefined) {
      data.tag = 'input';
    }
    if(data.type == undefined) {
      data.type = 'text';
    }
    if(data.id == undefined) {
      data.id = 'input' + i;
      console.log("'id' is need at line " + (i * 1 + 1));
    }
  }

  _getData(id, data, e) {
    this.state.output[id] = data;
  }

  _getComponents(id, component, e) {
    this.state.components[id] = component;
  }

  _submit(e) {
    let output = this.state.output;
    let components = this.state.components;
    let checkInvalid = false;

    jQuery(this.state.data.form).each((i, d) => {
      if(!d.isNotRequire) {
        if(output[d.id] == undefined || output[d.id] == '') {
          jQuery(components[d.id].refs.component).addClass('is-invalid');
          checkInvalid = true;
        }
      }
    });

    if(checkInvalid) {
      return;
    }

    let submit = this.props.data.submit;
    jQuery.post(
      submit.url,
      output,
      (data, status) => {
        let success = submit.success;
        if(success != undefined) {
          success(data, status);
        }
      }
    ).fail(() => {
      let fail = submit.fail;
      if(fail != undefined) {
        fail(output);
      }
    });
  }
};
