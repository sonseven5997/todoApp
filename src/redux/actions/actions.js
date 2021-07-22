import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const getDataFromDb = () => async dispatch => {
  const data = [];
  await firestore()
    .collection('reminders')
    .where('creator', '==', auth().currentUser.uid)
    .get()
    .then(querrySnapshot => {
      querrySnapshot.forEach(doc => {
        data.push({...doc.data(), id: doc.id});
      });
    });
  dispatch(addToList(data));
};

export const addToList = reminder => {
  return {
    type: 'ADD_TO_LIST',
    payload: reminder,
  };
};
