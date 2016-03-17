# Form for Material Design Lite

## Start

- [Node.js](https://nodejs.org/en/) must be installed.
- Install package:
```
  npm install mdl-form jquery react 
```

## Example

You can see [here](https://github.com/HsuTing/mdl-form-example/tree/gh-pages).

- [code](https://github.com/HsuTing/mdl-form-example/blob/gh-pages/src/index.jsx)
- [website](http://hsuting.github.io/mdl-form-example/)

## List

- [mdl-form-input](https://github.com/HsuTing/mdl-form-input)
- [mdl-form-radio](https://github.com/HsuTing/mdl-form-radio)
- [mdl-form-textarea](https://github.com/HsuTing/mdl-form-textarea)
- [mdl-form-file](https://github.com/HsuTing/mdl-form-file)

## Render

- Give a `json` to `data`. The parameter is at [here](https://github.com/HsuTing/mdl-form#parameter).
- Give an object of components to `tags`.
  * `key` is also used in `tags` of `form`.
  * `value` is component.
  * If you do not set a default component, `form` will set first component to default component.
- Other you can use:
  * noAnimation -> if you use `noAnimation={true}`, this component will not render with animation.

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
  * 1st argument -> get data from server.
- fail(function)
  * 1st argument -> data which you post to server.

### Form

- This is an object for your componets in `Form`.
- `id` is needed.
- isNotRequire -> if you use `isNotRequire: true`, this component can be empty to post to server. 

## How to write component

- You can see [list](https://github.com/HsuTing/mdl-form#list).
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
