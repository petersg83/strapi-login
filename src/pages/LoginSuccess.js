import React, { useEffect, useState } from 'react';
import qs from 'qs';
import constants from '../constants';

const LoginSuccess = (props) => {
  const [text, setText] = useState('Loading...');

  useEffect(() => {
    const params = qs.parse(props.location.search, { ignoreQueryPrefix: true });
    if (params.access_token) {
      // Succefully logged with github, now loging with strapi
      fetch(`${constants.BACKEND_URL}/auth/github/callback?access_token=${params.access_token}`)
        .then(res => res.json())
        .then(res => {
          // Successfully logged with Strapi
          // Now saving the jwt to use it for future authenticated requests to Strapi
          localStorage.setItem('jwt', res.jwt);
          localStorage.setItem('username', res.user.username);
          setText('You have been successfully logged in. You will be redirected in a few seconds...');
          setTimeout(() => window.location.replace("/"), 3000); // Redirect to homepage after 3 sec
        })
        .catch(err => {
          console.log('err', err);
          setText('An error occured, please see the developper console.')
        });
    }
  }, [props.location.search]);

  return <p>{text}</p>
};

export default LoginSuccess;
