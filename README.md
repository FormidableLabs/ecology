[![Travis Status][trav_img]][trav_site]

Ecology
===========================

## Description

Ecology allows you to write markdown documentation for React components that includes interactive playground sections and auto-generated `propType` specifications.

See the [demo app](demo) for a complete example:

```
# Runs the demo component documentation dev-server
# and open it in your default browser.

$ npm run dev && npm run open-demo
```

## Component PropType Documentation

1. Your component should be created using `React.createClass()` or `class Foo extends React.Component`.
2. Your component should define `propTypes` [in the `createClass` object literal](https://github.com/reactjs/react-docgen#example) or as a static property of the class.
3. Your component may define default props as `getDefaultProps` method (`React.createClass()` syntax), or as a `defaultProps` static property of the class.
4. You should add a JSDoc-style comment block for each prop, with a description and optional `@examples`.

        // createClass() example
        const MyComponent = React.createClass({
          propTypes: {
            /**
             * A test prop
             * @examples "Test", "More Test", "Yep"
             */
            testProp: React.PropTypes.string
          },

          render() {
            return (<div>Sample</div>);
          }
        });

        // class declaration example
        // NOTE: Requires `babel-preset-stage-1`
        class MyComponent extends React.Component {
          static propTypes = {
            /**
             * A test prop
             * @examples "Test", "More Test", "Yep"
             */
            testProp: React.PropTypes.string
          };

          render() {
            return (<div>Sample</div>);
          }
        }

## Writing Your Component Documentation

Create these files according to the below examples:

- `docs/docs.jsx`
- `docs/ecology.md`
- `docs/index.html`
- `docs/webpack.config.js`

1. Create `docs/docs.jsx`

        // docs.jsx

        import React from "react";
        import ReactDOM from "react-dom";
        import Ecology from "ecology";
        import * as docgen from "react-docgen";

        import MyComponent from "../src/my-component";

        class Docs extends React.Component {
          render() {
            return (
              <div className="demo">
                <Ecology
                  // This loads up your markdown documentation.
                  overview={require("!!raw!./ecology.md")}

                  // This loads up your component source so Ecology can inject the `propType` table.
                  source={docgen.parse(require("!!raw!../src/my-component"))}

                  // The `scope` prop is used by Component Playground to render live code snippets.
                  // It needs React, ReactDOM, and your component.
                  // See https://github.com/FormidableLabs/component-playground#scope
                  scope={{React, ReactDOM, MyComponent}}
                  playgroundtheme="blackboard"/>
              </div>
            );
          }
        }

        ReactDOM.render(<Docs/>, document.getElementById("content"));

2. Create `docs/ecology.md`:

        // ecology.md

        Interactive Docs for My Component
        =================================

        PlayGround
        ----------

        A `playground` triple-backtick snippet will render your component for you. This is useful for quick interactive component demos without the need to add boilerplate.

        ```playground
        <MyComponent />
        ```

        NoRender Playground
        -------------------

        A `playground_norender` triple-backtick snippet will not do automatic rendering of your component; you have to manually call `ReactDom.render`. Useful for examples of using your component in context.

        ```playground_norender
        var App = React.createClass({
          render() {
              return (
              <MyComponent />
              );
            }
        })

        ReactDOM.render(<App/>, mountNode);
        ```

        ## Prop Types

        Ecology will inject a `propTypes` table at the bottom of your component docs. This is generated from the component `propTypes` definition, and takes into account JSDoc style comments for each `propType`

3. Create `docs/index.html`

        // index.html
        // Minimal example. See `demo/index.html` for an example with fallbacks for older browsers.

        <!doctype html>
        <html>
          <head>
            <title>Ecology Demo</title>
            <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/codemirror.min.css"/>
            <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/theme/blackboard.min.css"/>
          </head>
          <body>
            <div id="content"></div>
            <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/codemirror.min.js"></script>
            <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/mode/javascript/javascript.min.js"></script>
            <script type="text/javascript" src="main.js"></script>
          </body>
        </html>


4. Create `docs/webpack.config.js`

        // webpack.config.js
        module.exports = {
          devServer: {
            contentBase: __dirname,
            noInfo: false
          },
          output: {
            path: __dirname,
            filename: "main.js",
            publicPath: "/"
          },
          devtool: "source-map",
          entry: {
            app: ["./docs/docs.jsx"]
          },
          resolve: {
            extensions: ["", ".js", ".jsx"]
          },
          module: {
            loaders: [
              {
                test: /\.jsx?$/,
                loader: "babel-loader",
                query: {
                  presets: ["es2015", "react"]
                },
                exclude: /node_modules/
              }
            ]
          }
        };

5. Install dependencies and run `webpack-dev-server`

        $ npm install -S babel babel-core babel-preset-es2015 babel-preset-react babel-loader raw-loader ecology react react-dom react-docgen webpack webpack-dev-server
        $ node_modules/.bin/webpack-dev-server --port 3000 --config docs/webpack.config.js --watch --content-base docs

### Required Props

- __Overview__ - Markdown documentation file in raw/string format
- __Source__ - React class source file in parsed [`react-docgen`](https://github.com/reactjs/react-docgen) format
- __Scope__ - Scope for `component-playground` components. Used by Component Playground to render live code snippets. It needs React, ReactDOM, and your component.

## Deploying Your Docs

Help us write this documentation!
https://github.com/FormidableLabs/ecology/issues/20

## Development

Please see [DEVELOPMENT](DEVELOPMENT.md)

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md)

[trav_img]: https://api.travis-ci.org/FormidableLabs/ecology.svg
[trav_site]: https://travis-ci.org/FormidableLabs/ecology
