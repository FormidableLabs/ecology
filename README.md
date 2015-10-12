[![Travis Status][trav_img]][trav_site]

Ecology
===========================

## Usage

We recommend using Webpack's raw-loader to grab external source and markdown via Common JS.

### Props

- __Overview__ - Markdown documentation file in raw/string format
- __Source__ - React class source file in raw/string format
- __Scope__ - Scope for component-playground componenets

```
<Ecology
  overview={require('!!raw!./ecology.md')}
  source={require('!!raw!./sample')}
  scope={{React, SampleClass: require('./sample')}}/>
```

## Description
This is starter react component generated using [generator-formidable-react-component](https://github.com/FormidableLabs/generator-formidable-react-component)

## Development

Please see [DEVELOPMENT](DEVELOPMENT.md)

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md)

[trav_img]: https://api.travis-ci.org/FormidableLabs/ecology.svg
[trav_site]: https://travis-ci.org/FormidableLabs/ecology
