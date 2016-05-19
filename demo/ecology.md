SampleClass
===========================

```playground
<SampleClass name={option1}/>
```

```playground_norender_dropdown=[option4, option5, option6]
var App = React.createClass({
  render() {
      return (
      <SampleClass name={option4} />
      );
    }
})

ReactDOM.render(<App/>, mountNode);
```

```playground_dropdown=[option5, option6]
<SampleClass name={option5} />
```

```playground_norender
var App = React.createClass({
  render() {
      return (
      <SampleClass name={option5}/>
      );
    }
})

ReactDOM.render(<App/>, mountNode);
```

```playground_norender_dropdown=[option3, option2]
var App = React.createClass({
  render() {
      return (
      <SampleClass name={option3} />
      );
    }
})

ReactDOM.render(<App/>, mountNode);
```


## Automatic Prop Table
The Prop Table below is automatically generated from comments in the component, see `sample.jsx`.
