console.log('App.js is running!')

const app = {
  title: 'Indecision App',
  subtitle: 'Put your life in the hands of a computer',
  options: []
};

const onSubmitForm = (e) => {
  e.preventDefault()

  const option = e.target.elements.option.value;

  if (option) {
    app.options.push(option);
    e.target.elements.option.value = '';
    render();
  }
}

const onMakeDecision = () => {
  const randomNum = Math.floor(Math.random() * app.options.length)
  const selected = app.options[randomNum];
  alert(selected);
}

const appRoot = document.getElementById('app');

const render = () => {
  const template = (
    <div>
      <h1>{app.title}</h1>
      <p>{app.subtitle}</p>
      <p>{app.options.length > 0 && 'Here are your options: '}</p>
      <button disabled={app.options.length == 0} onClick={onMakeDecision}>Make Decision</button>
      <ul>
        {
          app.options.map((option) => <li key={option}>{option}</li>)
        }
      </ul>
      <form onSubmit={onSubmitForm}>
        <input type="text" name="option" />
        <button>submit</button>
      </form>
    </div>
  );

  ReactDOM.render(template, appRoot);
};

render();
