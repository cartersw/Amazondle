import React from 'react';

import HomepageTitle from '../components/HomepageTitle';
import Info from '../components/Info';
import Login from '../components/Login';

const LoginPage = () =>
{

    return(
      <div>
        <HomepageTitle />
        <Info />
        <Login />
      </div>
    );
};

export default LoginPage;