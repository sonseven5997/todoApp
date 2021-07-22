import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TaskListScreen from '../taskListScreen/taskListScreen';
import {SCALE_HEIGHT, SCREEN_HEIGHT} from '../../assets/const/scale';
import {Icon} from 'react-native-elements';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';
import HomeScreen from '../homeScreen/homeScreen';
import ModalContent from '../../components/modalAddTask/modalAddTask';

const windowWidth = Dimensions.get('window').width;
const Tab = createBottomTabNavigator();

const CustomTabBar = ({state, descriptors, navigation}) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <View style={styles.flexColumn}>
      <View style={{height: 60 * SCALE_HEIGHT}}>
        <View style={styles.flexRow}>
          {state.routes.map((route, index) => {
            const {options} = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;
            const isFocused = state.index === index;
            let iconName;
            switch (route.name) {
              case 'Home':
                iconName = 'home';
                break;
              case 'Task':
                iconName = 'apps';
                break;
              default:
                break;
            }
            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };
            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                style={styles.tabWrapper}>
                <Icon
                  name={iconName}
                  size={Math.round(24 * SCALE_HEIGHT)}
                  color={isFocused ? 'rgb(95,135,231)' : 'rgb(190,190,190)'}
                  type="material"
                />
                <Text style={styles.label}>{label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <TouchableOpacity
        style={styles.buttonPosition}
        onPress={() => {
          setIsVisible(true);
        }}>
        <Image source={require('../../assets/images/Button.png')} />
      </TouchableOpacity>
      <Modal
        style={styles.margin0}
        deviceHeight={SCREEN_HEIGHT}
        avoidKeyboard={false}
        isVisible={isVisible}
        onBackButtonPress={() => {
          setIsVisible(false);
        }}
        onBackdropPress={() => {
          setIsVisible(false);
        }}>
        <View style={styles.flex1}>
          <ModalContent
            onPress={() => {
              setIsVisible(false);
            }}
            hideModal={() => {
              setIsVisible(false);
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

const MainScreenTabs = ({navigation}) => {
  return (
    <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Task" component={TaskListScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  flexColumn: {flexDirection: 'column'},
  flexRow: {flexDirection: 'row'},
  tabWrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-evenly',
    height: 60 * SCALE_HEIGHT,
  },
  label: {
    fontSize: 10,
    fontFamily: 'Rubik-Medium',
    textAlign: 'center',
    lineHeight: 12,
  },
  buttonPosition: {
    padding: 0,
    position: 'absolute',
    top: Math.round(24 * SCALE_HEIGHT) * 2 - 76.1 * SCALE_HEIGHT,
    left: -Math.round(24 * SCALE_HEIGHT) * 2 + windowWidth / 2,
  },
  margin0: {margin: 0},
  flex1: {flex: 1},
});

export default MainScreenTabs;
