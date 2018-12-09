class InvisibilityToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visibility: false };
    this.handleToggleVisibility = this.handleToggleVisibility.bind(this);
  }

  handleToggleVisibility() {
    this.setState(() => ({ visibility: !this.state.visibility }));
  }

  render() {
    return (
      <div>
        <h1>Visibility Toggle</h1>
        <button onClick={this.handleToggleVisibility}>
          {
            this.state.visibility ? 'Hide Details' : 'Show Details'
          }
        </button>
        {
          this.state.visibility && (
            <p>Hey. These are some details you can see now!</p>
          )
        }
      </div>
    );
  }
}

ReactDOM.render(<InvisibilityToggle />, document.getElementById('app'));
