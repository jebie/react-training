class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 }
    this.handleAddOne = this.handleAddOne.bind(this);
    this.handleMinusOne = this.handleMinusOne.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleAddOne() {
    // this kind of setState function call scenario is good
    // due to able to update an syncr, without unexpected behaviour
    this.setState(() => ({ counter: this.state.counter + 1}));
  }

  handleMinusOne() {
    // get previous data
    this.setState((prevState) => ({ counter: prevState.counter - 1 }));
  }

  handleReset() {
    // this might behave unexpected if setState use successively
    this.setState({ counter: 0 })
  }

  render() {
    return (
      <div>
        <div>Counter: {this.state.counter}</div>
        <button onClick={this.handleAddOne}>+1</button>
        <button onClick={this.handleMinusOne}>-1</button>
        <button onClick={this.handleReset}>reset</button>
      </div>
    );
  }
}

ReactDOM.render(<Counter />, document.getElementById('app'));
