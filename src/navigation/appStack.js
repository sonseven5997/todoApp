import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import screens from './screen';
import TodayReminderScreen from '../screens/todayReminderScreen/todayReminderScreen';
import MainScreenTabs from '../screens/mainScreen/mainScreenTabs';

const Stack = createStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={screens.mainScreenTabs}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={screens.mainScreenTabs} component={MainScreenTabs} />
      <Stack.Screen
        name={screens.todayReminderScreen}
        component={TodayReminderScreen}
      />
    </Stack.Navigator>
  );
};
