class IndecisionApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = { options: [] };
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
  }

  componentDidMount() {
    try {
      let options = localStorage.getItem('options');
      options = JSON.parse(options);

      if (options) {
        this.setState(() => ({ options }));
      }
    } catch(e) {
      // Do nothing
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const options = JSON.stringify(this.state.options);
      localStorage.setItem('options', options);
    }
  }

  handleDeleteOptions() {
    this.setState(() => ({ options: [] }));
  }

  handleDeleteOption(optionToRemove) {
    this.setState((prevState) => ({
      options: prevState.options.filter((option) => option !== optionToRemove)
    }));
  }

  handlePick() {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const selected = this.state.options[randomNum];
    alert(selected);
  }

  handleAddOption(option) {
    if (!option) {
      return 'Enter valid value to add item';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'This option is already exist.'
    }

    this.setState(() => ({ options: [...this.state.options, option] }))
  }

  render() {
    const title = 'Indecision';
    const subtitle = 'Put your life in the hands of a computer';

    return (
      <div>
        <Header subtitle={subtitle} />
        <Action
          handlePick={this.handlePick}
          hasOptions={this.state.options.length > 0}
        />
        <Options
          handleDeleteOptions={this.handleDeleteOptions}
          handleDeleteOption={this.handleDeleteOption}
          options={this.state.options}
        />
        <AddOption handleAddOption={this.handleAddOption} />
      </div>
    );
  }
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.subtitle && <h2>{props.subtitle}</h2>}
    </div>
  );
}

Header.defaultProps = {
  title: 'Indecision App'
};

const Action = (props) => {
  return (
    <button disabled={!props.hasOptions} onClick={props.handlePick}>
      What should I do?
    </button>
  );
}

const Options = (props) => {
  const options = props.options.map((option) => (
    <Option
      handleDeleteOption={props.handleDeleteOption}
      option={option}
      key={option}
    />
  ));

  return (
    <div>
      {props.options.length === 0 && <p>Please add an option to get started!</p>}
      <button onClick={props.handleDeleteOptions}>Remove All</button>
      {options}
    </div>
  );
}

const Option = (props) => {
  return (
    <div>
      {props.option}
      <button onClick={(e) => (props.handleDeleteOption(props.option))}>remove</button>
    </div>
  );
}

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: undefined };
    this.handleAddOption = this.handleAddOption.bind(this);
  }

  handleAddOption(e) {
    e.preventDefault();

    const option = e.target.elements.option.value;
    const error = this.props.handleAddOption(option)

    this.setState(() => ({ error }))

    if (!error) {
      e.target.elements.option.value = '';
    }
  }

  render() {
    return (
      <form onSubmit={this.handleAddOption}>
        {
          this.state.error && <p>{this.state.error}</p>
        }
        <input type="text" name="option" />
        <button>Submit</button>
      </form>
    );
  }
}


ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
