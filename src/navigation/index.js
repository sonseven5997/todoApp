import React from 'react';
import {AuthProvider} from './authProvider';
import Routes from './routes';

const Providers = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default Providers;
