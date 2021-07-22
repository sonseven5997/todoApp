import React, {useEffect} from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import {CheckBox, Icon} from 'react-native-elements';
import {SCREEN_WIDTH} from '../../assets/const/scale';
import {useSelector, useDispatch} from 'react-redux';
import {getDataFromDb} from '../../redux/actions/actions';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import PushNotification from 'react-native-push-notification';
import Swipeable from 'react-native-swipeable';
import screens from '../../navigation/screen';

const TodayReminderScreen = ({route, navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataFromDb());
  });
  const listReminder = useSelector(state => state.data).filter(
    e => e.reminder.color === route.params.data,
  );
  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          width: SCREEN_WIDTH - 18 * 2,
        }}>
        <Swipeable
          rightButtons={[
            <View style={styles.itemRightButtonContainer}>
              <Icon
                name="trash-alt"
                size={15}
                type="font-awesome-5"
                color="rgb(251,54,54)"
                containerStyle={styles.itemIconContainer}
                onPress={() => {
                  firestore()
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
            style={{
              ...styles.itemMainContentWrapper,
              borderLeftColor: item.reminder.color,
            }}>
            <CheckBox
              containerStyle={styles.padding0}
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
            <Text style={styles.itemTime}>
              {moment(item.reminder.time).format('hh:mm A')}
            </Text>
            <Text style={styles.itemTitle}>{item.reminder.title}</Text>
            <Icon
              name="notifications"
              type="material"
              color={
                item.reminder.isNotified ? 'rgb(255,220,0)' : 'rgb(217,217,217)'
              }
              containerStyle={styles.itemNotifyContainer}
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
    <View style={styles.mainWrapper}>
      <Icon
        name="arrow-left"
        type="font-awesome-5"
        containerStyle={styles.iconBackContainer}
        onPress={() => {
          navigation.navigate(screens.mainScreenTabs);
        }}
      />
      <FlatList
        data={listReminder}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemRightButtonContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  itemIconContainer: {
    backgroundColor: 'rgb(255,207,207)',
    marginLeft: 13,
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    width: 35,
    borderRadius: 35,
  },
  itemMainContentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    borderLeftWidth: 4,
    marginBottom: 13.8,
    backgroundColor: '#FFFFFF',
    height: 55.2,
  },
  padding0: {padding: 0},
  itemTime: {
    fontSize: 11,
    fontFamily: 'Rubik-Regular',
    color: 'rgb(198,198,200)',
    marginHorizontal: 12,
  },
  itemTitle: {
    fontSize: 14,
    fontFamily: 'Rubik-Regular',
    color: 'rgb(85,78,143)',
  },
  itemNotifyContainer: {position: 'absolute', right: 0},
  mainWrapper: {flex: 1, marginHorizontal: 18},
  iconBackContainer: {
    marginVertical: 15,
    alignItems: 'flex-start',
  },
});

export default TodayReminderScreen;
