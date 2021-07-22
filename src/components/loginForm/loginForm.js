import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import {TextInput} from 'react-native-gesture-handler';
import {SCALE_HEIGHT, SCALE_WIDTH} from '../../assets/const/scale';
import screens from '../../navigation/screen';
import {StyleSheet} from 'react-native';

const LoginForm = props => {
  return (
    <View style={styles.container}>
      <View style={styles.containerChildren}>
        <View>
          <Text style={styles.textTitle}>Welcome</Text>
          <Text style={styles.textTitleChildren}>Sign in to Continue</Text>
        </View>
        <TouchableOpacity
          style={styles.signUpBtnContainer}
          onPress={() => {
            props.navigate(screens.registerScreen);
          }}>
          <Text style={styles.signUpBtn}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.emailText}>Email</Text>
        <TextInput
          style={styles.emailTextInput}
          onChangeText={props.onChangeEmail}
        />
      </View>
      <View>
        <Text style={styles.passwordText}>Password</Text>
        <TextInput
          style={styles.passwordTextInput}
          onChangeText={props.onChangePassword}
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity style={styles.forgotPasswordContainer}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
      <View>
        <Button
          title="SIGN IN"
          buttonStyle={styles.signInBtn}
          titleStyle={styles.signInBtnTitle}
          onPress={props.onPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 16 * SCALE_HEIGHT,
    paddingTop: 14 * SCALE_HEIGHT,
    marginHorizontal: 16 * SCALE_WIDTH,
    backgroundColor: 'rgb(255,255,255)',
    borderRadius: 4,
    marginTop: 70 * SCALE_HEIGHT,
    height: 427 * SCALE_HEIGHT,
  },
  containerChildren: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 52 * SCALE_HEIGHT,
  },
  textTitle: {
    fontFamily: 'FontsFree-Net-SFProDisplay-Bold',
    fontSize: Math.round(30 * SCALE_HEIGHT),
    marginBottom: 10 * SCALE_HEIGHT,
  },
  textTitleChildren: {
    fontFamily: 'FontsFree-Net-SFProDisplay-Regular',
    fontSize: Math.round(14 * SCALE_HEIGHT),
    color: 'rgb(146,146,146)',
  },
  signUpBtnContainer: {justifyContent: 'center'},
  signUpBtn: {
    fontFamily: 'FontsFree-Net-SFProDisplay-Regular',
    fontSize: Math.round(18 * SCALE_HEIGHT),
    color: 'rgb(218,68,83)',
  },
  formContainer: {marginBottom: 42 * SCALE_HEIGHT, padding: 0},
  emailText: {
    fontFamily: 'FontsFree-Net-SFProDisplay-Regular',
    fontSize: Math.round(14 * SCALE_HEIGHT),
    color: 'rgb(0,0,0)',
    marginBottom: 0,
  },
  emailTextInput: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(218,68,83)',
    fontFamily: 'FontsFree-Net-SFProDisplay-Regular',
    fontSize: Math.round(18 * SCALE_HEIGHT),
    paddingBottom: 10 * SCALE_HEIGHT,
    height: 44 * SCALE_HEIGHT,
  },
  passwordText: {
    fontFamily: 'FontsFree-Net-SFProDisplay-Regular',
    fontSize: Math.round(14 * SCALE_HEIGHT),
    color: 'rgb(0,0,0)',
    marginBottom: 0,
  },
  passwordTextInput: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(218,68,83)',
    fontFamily: 'FontsFree-Net-SFProDisplay-Regular',
    fontSize: Math.round(18 * SCALE_HEIGHT),
    paddingBottom: 10 * SCALE_HEIGHT,
    height: 44 * SCALE_HEIGHT,
  },
  forgotPasswordContainer: {
    marginVertical: 20 * SCALE_HEIGHT,
    alignItems: 'flex-end',
  },
  forgotPasswordText: {
    fontFamily: 'FontsFree-Net-SFProDisplay-Regular',
    fontSize: Math.round(14 * SCALE_HEIGHT),
  },
  signInBtn: {
    height: 50 * SCALE_HEIGHT,
    textAlign: 'center',
    borderRadius: 4,
    backgroundColor: 'rgb(218,68,83)',
    marginBottom: 16 * SCALE_HEIGHT,
  },
  signInBtnTitle: {
    fontFamily: 'FontsFree-Net-SFProText-Regular',
    fontSize: Math.round(15 * SCALE_HEIGHT),
  },
});

export default LoginForm;
