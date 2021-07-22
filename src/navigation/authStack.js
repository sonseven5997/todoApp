import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import screens from './screen';
import LoginScreen from '../screens/loginScreen/loginScreen';
import OnBoardingScreen from '../screens/onboardingScreen/onboardingScreen';
import RegisterScreen from '../screens/registerScreen/registerScreen';
import VerifyScreen from '../screens/verifyScreen/verifyScreen';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Stack = createStackNavigator();

export const AuthStack = () => {
  const [isFirstRun, setIsFirstRun] = useState(null);
  let routeName;
  useEffect(() => {
    AsyncStorage.getItem('alreadyRun').then(value => {
      if (value == null) {
        AsyncStorage.setItem('alreadyRun', 'true');
        setIsFirstRun(true);
      } else {
        setIsFirstRun(false);
      }
    });
    GoogleSignin.configure({
      webClientId:
        '563040470738-95ca0slu5qe5pa0qj5c2n3l7p822el0v.apps.googleusercontent.com',
    });
  }, [isFirstRun]);
  if (isFirstRun === null) {
    return null;
  } else if (isFirstRun === true) {
    routeName = screens.onboardingScreen;
  } else if (isFirstRun === false) {
    routeName = screens.loginScreen;
  }
  return (
    <Stack.Navigator
      initialRouteName={routeName}
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={screens.onboardingScreen}
        component={OnBoardingScreen}
      />
      <Stack.Screen name={screens.loginScreen} component={LoginScreen} />
      <Stack.Screen name={screens.registerScreen} component={RegisterScreen} />
      <Stack.Screen name={screens.verifyScreen} component={VerifyScreen} />
    </Stack.Navigator>
  );
};
