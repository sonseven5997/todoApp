import React, {useContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {AuthContext} from './authProvider';
import {NavigationContainer} from '@react-navigation/native';
import {AppStack} from './appStack';
import {AuthStack} from './authStack';

const Routes = () => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = userLoggedIn => {
    setUser(userLoggedIn);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null;
  }
  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
