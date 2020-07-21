import React, { useEffect, useState } from 'react';
import constants from '../constants';

const LoginSuccess = (props) => {
  const [text, setText] = useState('Loading...');

  useEffect(() => {
    // Successfully logged with the provider
    // Now logging with strapi by using the access_token in props.location.search
    fetch(`${constants.BACKEND_URL}/auth/${props.match.params.providerName}/callback${props.location.search}`)
      .then(res => res.json())
      .then(res => {
        if (res.status !== 200) {
          throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
        }
        // Successfully logged with Strapi
        // Now saving the jwt to use it for future authenticated requests to Strapi
        localStorage.setItem('jwt', res.jwt);
        localStorage.setItem('username', res.user.username);
        setText('You have been successfully logged in. You will be redirected in a few seconds...');
        setTimeout(() => window.location.replace("/"), 3000); // Redirect to homepage after 3 sec
      })
      .catch(err => {
        console.log(err);
        setText('An error occured, please see the developper console.')
      });
  }, [props.location.search, props.match.params.providerName]);

  return <p>{text}</p>
};

export default LoginSuccess;
