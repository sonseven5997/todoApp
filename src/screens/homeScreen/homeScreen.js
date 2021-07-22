import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {CheckBox, Icon} from 'react-native-elements';
import {
  SCALE_HEIGHT,
  SCALE_WIDTH,
  SCREEN_WIDTH,
} from '../../assets/const/scale';
import {useSelector, useDispatch} from 'react-redux';
import {getDataFromDb} from '../../redux/actions/actions';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import PushNotification from 'react-native-push-notification';
import Swipeable from 'react-native-swipeable';

const HomeScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataFromDb());
  });
  const list = useSelector(state => state.data);
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
  const listToday = getListToday(list);
  const todayReminder = listToday.find(
    element => new Date(element.reminder.time) > new Date(),
  );
  const [reminderVisible, setReminderVisible] = useState(true);

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          width: SCREEN_WIDTH - 18 * 2,
        }}>
        <Swipeable
          rightButtons={[
            <View style={styles.rightButtonsWrapper}>
              <Icon
                name="trash-alt"
                size={15}
                type="font-awesome-5"
                color="rgb(251,54,54)"
                containerStyle={styles.rightButtonStyle}
                onPress={async () => {
                  await firestore()
                    .collection('reminders')
                    .doc(item.id)
                    .delete()
                    .then(() => {
                      console.log('deleted');
                    });
                  dispatch(getDataFromDb());
                }}
              />
            </View>,
          ]}>
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              ...styles.mainContentWrapper,
              marginTop: listToday.indexOf(item) == 0 ? 18 : 0,
              borderLeftColor: item.reminder.color,
            }}>
            <CheckBox
              containerStyle={styles.checkboxContainer}
              center
              checkedIcon="check-circle"
              uncheckedIcon="circle-o"
              checked={item.reminder.isChecked}
              checkedColor="rgb(145,220,90)"
              onPress={async () => {
                await firestore()
                  .collection('reminders')
                  .doc(item.id)
                  .update({'reminder.isChecked': !item.reminder.isChecked});
                dispatch(getDataFromDb());
                PushNotification.cancelLocalNotifications({
                  id: item.reminder.timeStamp,
                });
              }}
            />
            <Text style={styles.timeText}>
              {moment(item.reminder.time).format('hh:mm A')}
            </Text>
            <Text style={styles.titleText}>{item.reminder.title}</Text>
            <Icon
              name="notifications"
              type="material"
              color={
                item.reminder.isNotified ? 'rgb(255,220,0)' : 'rgb(217,217,217)'
              }
              containerStyle={styles.notifyIcon}
              onPress={async () => {
                await firestore()
                  .collection('reminders')
                  .doc(item.id)
                  .update({'reminder.isNotified': !item.reminder.isNotified});
                dispatch(getDataFromDb());
                item.reminder.isNotified
                  ? PushNotification.cancelLocalNotifications({
                      id: item.reminder.timeStamp,
                    })
                  : PushNotification.localNotificationSchedule({
                      id: item.reminder.timeStamp,
                      title: 'REMINDER',
                      message: item.reminder.title,
                      date: new Date(item.reminder.time),
                      allowWhileIdle: true,
                    });
                PushNotification.getScheduledLocalNotifications(e =>
                  console.log(e),
                );
              }}
            />
          </View>
        </Swipeable>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {listToday.length === 0 ? (
        <View style={styles.wrapperNoTask}>
          <Image
            source={require('../../assets/images/clipboard.png')}
            resizeMode="cover"
            style={styles.imageNoTask}
          />
          <Text style={styles.textNoTask}>No tasks</Text>
          <Text style={styles.smallTextNoTask}>You have no task to do</Text>
        </View>
      ) : (
        <View style={styles.wrapper}>
          <View>
            <LinearGradient
              colors={['rgb(129,199,245)', 'rgb(56,103,213)']}
              style={{
                height: reminderVisible
                  ? 194 * SCALE_HEIGHT
                  : (194 - 106 - 24) * SCALE_HEIGHT,
              }}>
              <SafeAreaView style={styles.headerWrapperSafeArea}>
                <View style={styles.headerWrapper}>
                  <View>
                    <Text style={styles.headerText}>
                      Hello {auth().currentUser.displayName}!
                    </Text>
                    <Text style={styles.taskCount}>
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
                  <View style={styles.todayReminderWrapper}>
                    <Icon
                      name="times"
                      type="font-awesome-5"
                      size={15}
                      color="rgb(255,255,255)"
                      containerStyle={styles.todayReminderCancel}
                      onPress={() => {
                        setReminderVisible(false);
                      }}
                    />
                    <View style={styles.todayReminderContentWrapper}>
                      <View>
                        <Text style={styles.todayReminderTitle}>
                          Today Reminder
                        </Text>
                        <Text style={styles.todayReminderText}>
                          {todayReminder !== undefined
                            ? todayReminder.reminder.title
                            : 'You have no reminders left'}
                        </Text>
                        <Text style={styles.todayReminderTime}>
                          {todayReminder !== undefined
                            ? moment(todayReminder.reminder.time).format(
                                'hh:mm A',
                              )
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
          <View style={styles.taskListWrapper}>
            <FlatList
              data={listToday}
              renderItem={renderItem}
              keyExtractor={item => list.indexOf(item).toString()}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rightButtonsWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  rightButtonStyle: {
    backgroundColor: 'rgb(255,207,207)',
    marginLeft: 13,
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    width: 35,
    borderRadius: 35,
  },
  mainContentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    borderLeftWidth: 4,
    marginBottom: 13.8,
    backgroundColor: '#FFFFFF',
    height: 55.2,
  },
  checkboxContainer: {padding: 0},
  timeText: {
    fontSize: 11,
    fontFamily: 'Rubik-Regular',
    color: 'rgb(198,198,200)',
    marginHorizontal: 12,
  },
  titleText: {
    fontSize: 14,
    fontFamily: 'Rubik-Regular',
    color: 'rgb(85,78,143)',
  },
  notifyIcon: {position: 'absolute', right: 0},
  container: {flex: 1, backgroundColor: '#FFFFFF'},
  wrapperNoTask: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  imageNoTask: {width: 120, height: 142.4, backgroundColor: 'white'},
  textNoTask: {
    marginTop: 74.3,
    marginBottom: 12,
    color: 'rgb(85,78,143)',
    fontFamily: 'Rubik-Regular',
    fontSize: 22,
  },
  smallTextNoTask: {
    color: 'rgb(130,163,183)',
    fontSize: 17,
    fontFamily: 'OpenSans-Regular',
  },
  wrapper: {flex: 1},
  headerWrapperSafeArea: {
    paddingHorizontal: 18,
    paddingVertical: 13 * SCALE_HEIGHT,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontFamily: 'Rubik-Regular',
    fontSize: 17,
    color: 'rgb(255,255,255)',
  },
  taskCount: {
    fontFamily: 'Rubik-Regular',
    fontSize: 10,
    color: 'rgb(255,255,255)',
  },
  todayReminderWrapper: {
    marginTop: 24 * SCALE_HEIGHT,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.31)',
    height: 106 * SCALE_HEIGHT,
  },
  todayReminderCancel: {
    position: 'absolute',
    top: 0,
    left: '95%',
    marginTop: 11 * SCALE_HEIGHT,
    marginRight: 11,
  },
  todayReminderContentWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 21.3,
    alignItems: 'center',
    flex: 1,
  },
  todayReminderTitle: {
    fontFamily: 'Rubik-Regular',
    fontSize: Math.round(20 * SCALE_HEIGHT),
    color: 'rgb(243,243,243)',
  },
  todayReminderText: {
    fontFamily: 'Rubik-Regular',
    fontSize: Math.round(11 * SCALE_HEIGHT),
    color: 'rgb(243,243,243)',
  },
  todayReminderTime: {
    fontFamily: 'Rubik-Regular',
    fontSize: Math.round(11 * SCALE_HEIGHT),
    color: 'rgb(243,243,243)',
  },
  taskListWrapper: {
    paddingHorizontal: 18,
    backgroundColor: 'rgb(249,252,255)',
    flex: 1,
  },
});

export default HomeScreen;
