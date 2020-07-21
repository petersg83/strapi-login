import React, { useState } from 'react';
import constants from '../constants';

const LoginButton = () => <a href={`${constants.BACKEND_URL}/connect/github`}>
    <button>Connect to github</button>
  </a>;

const LogoutButton = (props) => <button onClick={props.onClick}>Logout</button>;

const Home = (props) => {
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem('jwt'));

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    setIsLogged(false)
  };

  let button = <LoginButton />
  if (isLogged) {
    button = <LogoutButton onClick={logout} />;
  }

  let text = 'You are not connected. Please log in.';
  if (isLogged) {
    text = `Welcome ${localStorage.getItem('username')}, you are connected!`;
  }

  return <div>
    <p>{text}</p>
    {button}
  </div>;
}

export default Home;
