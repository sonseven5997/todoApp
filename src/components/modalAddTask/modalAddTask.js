import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';
import {Icon} from 'react-native-elements';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../assets/const/scale';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch} from 'react-redux';
import {getDataFromDb} from '../../redux/actions/actions';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import PushNotification from 'react-native-push-notification';
import list from '../../assets/const/list';
const uid = auth().currentUser.uid;
const windowWidth = Dimensions.get('window').width;

const ModalContent = props => {
  const dispatch = useDispatch();
  const [task, setTask] = useState('');
  const [type, setType] = useState(list[0].color);
  const [isShow, setIsShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          ...styles.container,
          marginLeft: index !== 0 ? 18 : 0,
          backgroundColor: item.color === type ? item.color : null,
        }}
        onPress={() => {
          setType(item.color);
        }}>
        <View
          style={{
            ...styles.titleWrapper,
            backgroundColor: item.color,
          }}
        />
        <Text
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            ...styles.title,
            color:
              item.color === type ? 'rgb(255,255,255)' : 'rgb(142,142,142)',
          }}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalCurve} />
      <View style={styles.modalContentWrapper}>
        <TouchableOpacity style={styles.modalButton} onPress={props.onPress}>
          <Image source={require('../../assets/images/Button.png')} />
        </TouchableOpacity>
        <View style={styles.textWrapper}>
          <View>
            <Text style={styles.text}>Add new task</Text>
            <TextInput
              onChangeText={text => {
                setTask(text);
              }}
              style={styles.textInput}
            />
            <View style={styles.optionsContainer}>
              <FlatList
                data={list}
                renderItem={renderItem}
                keyExtractor={item => list.indexOf(item).toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <TouchableOpacity
              style={styles.dateContainer}
              onPress={() => {
                setIsShow(true);
              }}>
              <Text style={styles.dateContent}>
                {moment(date).format('DD-MM-YY hh:mm A')}
              </Text>
              <Icon name="chevron-down" size={12} type="font-awesome-5" />
            </TouchableOpacity>
            <Modal
              isVisible={isShow}
              onBackButtonPress={() => {
                setIsShow(false);
              }}
              onBackdropPress={() => {
                setIsShow(false);
              }}>
              <View style={styles.datePickerBackground}>
                <DatePicker
                  date={date}
                  onDateChange={dateChosen => {
                    setDate(dateChosen);
                  }}
                  androidVariant="iosClone"
                />
              </View>
            </Modal>
          </View>
        </View>
      </View>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['rgb(126,182,255)', 'rgb(95,135,231)']}
        style={styles.buttonAddTaskContainer}>
        <TouchableOpacity
          onPress={async () => {
            const timeStamp = new Date().getTime().toString().slice(-6);
            let reminder = {
              title: task,
              time: date.toISOString(),
              color: type,
              isChecked: false,
              isNotified: true,
              timeStamp,
            };
            await firestore()
              .collection('reminders')
              .add({creator: uid, reminder: reminder});
            dispatch(getDataFromDb());
            props.hideModal();
            PushNotification.localNotificationSchedule({
              id: reminder.timeStamp,
              date: new Date(reminder.time),
              title: 'REMINDER',
              message: reminder.title,
              allowWhileIdle: true,
            });
            PushNotification.getScheduledLocalNotifications(e =>
              console.log(e),
            );
          }}>
          <Text style={styles.buttonAddTaskContent}>Add task</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 2,
  },
  titleWrapper: {width: 10, height: 10, borderRadius: 10},
  title: {fontSize: 15, marginLeft: 5, fontFamily: 'Rubik-Regular'},
  modalContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    display: 'flex',
    flex: 1,
  },
  modalCurve: {
    width: windowWidth / 4,
    height: windowWidth / 4,
    backgroundColor: 'white',
    borderTopLeftRadius: windowWidth,
    borderTopRightRadius: windowWidth,
    transform: [{scaleX: 4}],
  },
  modalContentWrapper: {
    height: '50%',
    width: windowWidth,
    backgroundColor: 'white',
  },
  modalButton: {
    position: 'absolute',
    top: -SCREEN_WIDTH / 4 - 35,
    left: -40 + SCREEN_WIDTH / 2,
    transform: [{rotate: '45deg'}],
  },
  textWrapper: {
    padding: 25,
    position: 'absolute',
    top: -SCREEN_WIDTH / 4 + 19.1,
  },
  text: {
    fontFamily: 'Rubik-Medium',
    fontSize: 13,
    color: 'rgb(64,64,64)',
    textAlign: 'center',
  },
  textInput: {fontSize: 32, marginTop: 9, marginBottom: 30.5},
  optionsContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgb(207,207,207)',
    paddingVertical: 24,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 45.5,
  },
  dateContent: {
    fontFamily: 'Rubik-Regular',
    fontSize: 13,
    color: 'rgb(64,64,64)',
    marginRight: 72,
  },
  datePickerBackground: {backgroundColor: '#FFFFFF'},
  buttonAddTaskContainer: {
    height: 53,
    borderRadius: 5,
    justifyContent: 'center',
    position: 'absolute',
    top: SCREEN_HEIGHT - 100,
    width: SCREEN_WIDTH - 50,
    marginHorizontal: 25,
  },
  buttonAddTaskContent: {
    fontFamily: 'Rubik-Regular',
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
});

export default ModalContent;
