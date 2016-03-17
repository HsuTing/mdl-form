'use strict';

import $ from 'jquery';
import React from 'react';

import Title from './component/title';
import Submit from './component/submit';

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
    $(this.refs.form)
      .off("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd")
      .on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(e) {
        if($(this).hasClass('form-hide-animation')) {
          $(this)
            .removeClass('form-hide-animation')
            .addClass('form-hide');

          self.setState({'data': self.props.data});
        }
        else if($(this).hasClass('form-show-animation')) {
          $(this)
            .removeClass('form-show-animation')
            .addClass('form-show');
        }
      });

    componentHandler.upgradeDom();
    this.setState({'data': this.props.data});
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.noAnimation != true) {
      $(this.refs.form)
        .removeClass('form-show')
        .addClass('form-hide-animation');
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.change != undefined) {
      prevProps.change();
    }

    if(this.props.noAnimation != true) {
      $(this.refs.form)
        .removeClass('form-hide')
        .addClass('form-show-animation');
    }
    componentHandler.upgradeDom();
  }

  render() {
    if(this.state.data == undefined) {
      return null;
    }

    let tags = this.props.tags;
    if(tags == undefined) {
      throw new Error("You need to give an object of 'Tag'.");
    }

    let form = this.state.data.form == undefined ? [] : this.state.data.form;
    let defaultTag = tags["default"] == undefined ? tags[Object.keys(tags)[0]] : tags["default"];

    return (
      <div ref="form">
        <Title data={this.state.data.title} />

        <div className="form-body">
        {form.map((d, i) => {
          let Component = d.tag == undefined ? defaultTag : tags[d.tag];

          if(d.id == undefined) {
            d.id = 'input' + i;
            let text = "If you need to use some elements in 'Form', you need to give it a 'id'. Error at item " + (i * 1 + 1) + ".";
            console.error(text);
          }

          return (
            <div key={i}>
              <Component
                data={d}
                keyDown={this._keyDown.bind(this)}
                getData={this._getData.bind(this)}
                getComponents={this._getComponents.bind(this)}
              />
            </div>
          );
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

    $(this.state.data.form).each((i, d) => {
      if(!d.isNotRequire) {
        if(output[d.id] == undefined || output[d.id] == '') {
          $(components[d.id].refs.component).addClass('is-invalid');
          checkInvalid = true;
        }
      }
    });

    if(checkInvalid) {
      return;
    }

    let submit = this.props.data.submit;
    $.post(
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
