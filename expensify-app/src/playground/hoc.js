import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
  <div>
    The info is: {props.info}
  </div>
);

// higher order component
const withAdminWarning = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAdmin && <p>This is private info. Please don't share</p>}
      <WrappedComponent {...props} />
    </div>
  );
};

const requireAuthentication = (WrappedComponent) => {
  return (props) => (
    <div>
      {
        props.isAuthenticate ? (
          <WrappedComponent {...props} />
        ) : (
          <p>Unauthorized!</p>
        )
      }
    </div>
  );
}

const AdminInfo = withAdminWarning(Info);
const Authenticate = requireAuthentication(Info);

// ReactDOM.render(<AdminInfo isAdmin={true} info="Info here!" />, document.getElementById('app'));
ReactDOM.render(<Authenticate isAuthenticate={false} info="Info here!" />, document.getElementById('app'));
