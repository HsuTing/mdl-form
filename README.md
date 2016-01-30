# Form for Material Design Lite

## Start

- [Node.js](https://nodejs.org/en/) must be installed.
- This proeject use `ECMAScript (ES6)` and `react`.
  Therefore, [babel-loader](https://github.com/babel/babel-loader), [webpack](https://github.com/webpack/webpack) is recommended. 
- Recommend:
```
  npm install babel-core babel-loader babel-preset-es2015 babel-preset-react css-loader style-loader webpack
```

## Example

```
'use strict';

import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';

import Form from 'mdl-form';
import Input from 'mdl-form-input';

let Data = {
  'title': {
    'label': 'Title'
  },  
  'submit': {
    'label': 'Submit'
    'url': '/api/',
    'success': () => {
      alert('Success');
    },  
    'fail': (output) => {
      alert('Fail');
    }   
  },  
  'form': [
    {   
      'id': 'component_id',
      'label': 'Component'
    }
  ]
};

(() => {
  let Tags = [ Input ];
  ReactDOM.render(<Form data={Data} tags={Tags}/>, document.getElementById('form'));
})();
```

## Render

- Give a `json` to `data`. The parameter which you can use in `json` at [here](https://github.com/HsuTing/mdl-form#form-for-material-design-lite#Parameter).
- Give an array of components to `tags`.
- Other you can use:
  * noAnimation -> if you use `noAnimation={true}`, This component will not render with animation.

## Parameter

### Title

- label
- style

### Submit

- label
- style
- url
- click(function)
- success(function)
  * 1st argument -> get from `url`.
- fail(function)
  * 1st argument -> data which you post.

### Form

- This is an array for your componets in `Form`.
- id(needed)
- isNotRequire
  * This component can be empty.

## How to write component

- You can see [mdl-form-input](https://github.com/HsuTing/mdl-form-input/blob/master/index.jsx).
- Props have three function and one data
  * keyDown(function) -> this will call a click on `submit`.
  * getData(function) -> give data to `form`.
    + 1st argument -> `id` of this component, use `this.props.data.id`, normal.
    + 2nd argument -> give this component data to `form`.
    + You should call it in render function and set data to empty.
    + Example: this.props.getData(this.props.data.id, '')
  * getComponents(function) -> give this component to `form`.
    + 1st argument -> id` of this component, use `this.props.data.id`, normal.
    + 2nd argument -> this component.
    + You should call it in render function.
    + Example: this.props.getComponent(this.props.data.id, this).
  * data -> all information about component is in `this.props.data`.
