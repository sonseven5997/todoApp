import React, {useState, useContext} from 'react';
import {StyleSheet} from 'react-native';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import {SCALE_HEIGHT} from '../../assets/const/scale';
import {AuthContext} from '../../navigation/authProvider';
import InputForm from '../inputForm/inputForm';

const SignUpForm = props => {
  const {register} = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.signUpText}>Sign Up</Text>
      <InputForm title="Name" secure={false} onChange={text => setName(text)} />
      <InputForm
        title="Email"
        secure={false}
        onChange={text => setEmail(text)}
      />
      <InputForm
        title="Password"
        secure={true}
        onChange={text => setPassword(text)}
      />
      <Button
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
        titleStyle={styles.buttonTitle}
        title="SIGN UP"
        onPress={async () => {
          email !== '' && password !== '' && name !== ''
            ? await register(email, password, name)
            : // eslint-disable-next-line no-alert
              alert('Please enter email, password and name');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(255,255,255)',
    marginHorizontal: 16,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingTop: 20 * SCALE_HEIGHT,
    paddingBottom: 16 * SCALE_HEIGHT,
    marginTop: 25 * SCALE_HEIGHT,
  },
  signUpText: {
    fontFamily: 'FontsFree-Net-SFProDisplay-Bold',
    fontSize: Math.round(30 * SCALE_HEIGHT),
    marginBottom: 52 * SCALE_HEIGHT,
  },
  buttonContainer: {marginTop: 18 * SCALE_HEIGHT},
  button: {
    height: 50 * SCALE_HEIGHT,
    backgroundColor: 'rgb(218,68,83)',
  },
  buttonTitle: {
    fontFamily: 'FontsFree-Net-SFProText-Regular',
    fontSize: Math.round(14 * SCALE_HEIGHT),
  },
});

export default SignUpForm;
