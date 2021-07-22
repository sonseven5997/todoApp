import React, {useContext, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  SCALE_HEIGHT,
  SCALE_WIDTH,
  SCREEN_WIDTH,
} from '../../assets/const/scale';
import {Icon} from 'react-native-elements';
import {AuthContext} from '../../navigation/authProvider';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import {getDataFromDb} from '../../redux/actions/actions';
import screens from '../../navigation/screen';
import auth from '@react-native-firebase/auth';
import list from '../../assets/const/listMenu';
const TaskListScreen = ({navigation}) => {
  const [reminderVisible, setReminderVisible] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataFromDb());
  });
  const listReminder = useSelector(state => state.data);
  const getListToday = listToFilter => {
    let listToday;
    const today = moment(new Date()).format('DD-MM-YY');
    listToday = listToFilter.filter(
      e => moment(e.reminder.time).format('DD-MM-YY') === today,
    );
    listToday = listToday.sort(
      (a, b) => new Date(a.reminder.time) - new Date(b.reminder.time),
    );
    return listToday;
  };
  const listToday = getListToday(listReminder);
  const todayReminder = listToday.find(
    element => new Date(element.reminder.time) > new Date(),
  );

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          ...styles.menuContainer,
          marginRight: index % 2 === 0 ? 19.1 : 0,
        }}
        onPress={() => {
          navigation.navigate(screens.todayReminderScreen, {
            data: item.color,
          });
        }}>
        <Icon
          name={item.iconName}
          type="font-awesome-5"
          color={item.color}
          containerStyle={{
            ...styles.iconContainer,
            backgroundColor: item.backgroundColor,
          }}
        />
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemCountTasks}>
          {listReminder.filter(e => e.reminder.color === item.color).length}{' '}
          Tasks
        </Text>
      </TouchableOpacity>
    );
  };
  const {user} = useContext(AuthContext);
  return (
    <View style={styles.flex1}>
      <View>
        <LinearGradient
          colors={['rgb(129,199,245)', 'rgb(56,103,213)']}
          style={{
            height: reminderVisible
              ? 194 * SCALE_HEIGHT
              : (194 - 106 - 24) * SCALE_HEIGHT,
          }}>
          <SafeAreaView style={styles.safeAreaViewStyle}>
            <View style={styles.headerContainer}>
              <View>
                <Text style={styles.headerTextHello}>
                  Hello {user.displayName}!
                </Text>
                <Text style={styles.reminderCount}>
                  Today you have {listToday.length} tasks
                </Text>
              </View>
              <View>
                <Icon
                  name="logout"
                  type="material"
                  size={35}
                  color="#FFFFFF"
                  onPress={async () => {
                    await auth().signOut();
                  }}
                />
              </View>
            </View>
            {reminderVisible ? (
              <View style={styles.cancelButtonWrapper}>
                <Icon
                  name="times"
                  type="font-awesome-5"
                  size={15}
                  color="rgb(255,255,255)"
                  containerStyle={styles.cancelButtonContainer}
                  onPress={() => {
                    setReminderVisible(false);
                  }}
                />
                <View style={styles.reminderWrapper}>
                  <View>
                    <Text style={styles.todayReminderText}>Today Reminder</Text>
                    <Text style={styles.todayReminderAlert}>
                      {todayReminder !== undefined
                        ? todayReminder.reminder.title
                        : 'You have no reminders left'}
                    </Text>
                    <Text style={styles.todayReminderTimeAlert}>
                      {todayReminder !== undefined
                        ? moment(todayReminder.reminder.time).format('hh:mm A')
                        : ''}
                    </Text>
                  </View>
                  <Image
                    source={require('../../assets/images/bell.png')}
                    style={{
                      width: 73.3 * SCALE_WIDTH,
                      height: 81 * SCALE_HEIGHT,
                    }}
                    resizeMode="contain"
                  />
                </View>
              </View>
            ) : null}
          </SafeAreaView>
        </LinearGradient>
      </View>
      <View style={styles.mainContentWrapper}>
        <Text style={styles.mainContentText}>Projects</Text>
        <View style={styles.listWrapper}>
          <FlatList
            data={list}
            renderItem={renderItem}
            keyExtractor={item => list.indexOf(item).toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 180.5,
    borderColor: 'rgba(187,187,187,0.5)',
    borderWidth: 1,
    borderRadius: 5,
    width: (SCREEN_WIDTH - 18 * 2 - 19.1) / 2,

    marginBottom: 23.5 * SCALE_HEIGHT,
  },
  iconContainer: {
    width: 65.1,
    height: 65.1,

    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 65.1,
  },
  itemTitle: {
    fontFamily: 'Rubik-Regular',
    fontSize: 17,
    color: 'rgb(104,104,104)',
    marginVertical: 10,
  },
  itemCountTasks: {
    fontFamily: 'Rubik-Regular',
    fontSize: 8,
    color: 'rgb(161,161,161)',
  },
  flex1: {flex: 1},
  safeAreaViewStyle: {
    paddingHorizontal: 18,
    paddingVertical: 13 * SCALE_HEIGHT,
  },
  headerContainer: {flexDirection: 'row', justifyContent: 'space-between'},
  headerTextHello: {
    fontFamily: 'Rubik-Regular',
    fontSize: 17,
    color: 'rgb(255,255,255)',
  },
  reminderCount: {
    fontFamily: 'Rubik-Regular',
    fontSize: 10,
    color: 'rgb(255,255,255)',
  },
  cancelButtonWrapper: {
    marginTop: 24 * SCALE_HEIGHT,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.31)',
    height: 106 * SCALE_HEIGHT,
  },
  cancelButtonContainer: {
    position: 'absolute',
    top: 0,
    left: '95%',
    marginTop: 11 * SCALE_HEIGHT,
    marginRight: 11,
  },
  reminderWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 21.3,
    alignItems: 'center',
    flex: 1,
  },
  todayReminderText: {
    fontFamily: 'Rubik-Regular',
    fontSize: Math.round(20 * SCALE_HEIGHT),
    color: 'rgb(243,243,243)',
  },
  todayReminderAlert: {
    fontFamily: 'Rubik-Regular',
    fontSize: Math.round(11 * SCALE_HEIGHT),
    color: 'rgb(243,243,243)',
  },
  todayReminderTimeAlert: {
    fontFamily: 'Rubik-Regular',
    fontSize: Math.round(11 * SCALE_HEIGHT),
    color: 'rgb(243,243,243)',
  },
  mainContentWrapper: {
    paddingTop: 15 * SCALE_HEIGHT,
    flex: 1,
    backgroundColor: 'rgb(249,252,255)',
  },
  mainContentText: {
    fontFamily: 'Rubik-Medium',
    fontSize: 13,
    color: 'rgb(139,135,179)',
    marginBottom: 16,
    paddingLeft: 18,
  },
  listWrapper: {flex: 1, marginHorizontal: 18},
});

export default TaskListScreen;
