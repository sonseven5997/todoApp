import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {SCALE_HEIGHT} from '../../assets/const/scale';
import LoginForm from '../../components/loginForm/loginForm';
import {AuthContext} from '../../navigation/authProvider';

const LoginScreen = ({navigation}) => {
  const {login, googleSignIn, fbSignIn} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.flex1}>
      <ImageBackground
        source={require('../../assets/images/background-pink.png')}
        style={styles.flex1}>
        <LoginForm
          onChangeEmail={text => {
            setEmail(text);
          }}
          onChangePassword={text => {
            setPassword(text);
          }}
          onPress={() => {
            email !== '' && password !== ''
              ? login(email, password)
              : // eslint-disable-next-line no-alert
                alert('Please enter email and password');
          }}
          navigate={screen => {
            navigation.navigate(screen);
          }}
        />
        <Text style={styles.textOR}>-OR-</Text>
        <TouchableOpacity
          onPress={() => fbSignIn()}
          style={styles.buttonSignInFacebookWrapper}>
          <Icon
            name="facebook-square"
            type="font-awesome-5"
            color="rgb(71,89,147)"
            size={20}
            containerStyle={styles.iconSignInFacebook}
          />
          <Text style={styles.textSignInFacebook}>Sign In With Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => googleSignIn()}
          style={styles.buttonSignInGoogleWrapper}>
          <Icon
            name="google"
            type="font-awesome-5"
            color="rgb(255,61,0)"
            size={20}
            containerStyle={styles.iconSignInGoogle}
          />
          <Text style={styles.textSignInGoogle}>Sign In With Google</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  flex1: {flex: 1},
  textOR: {
    fontFamily: 'FontsFree-Net-SFProDisplay-Regular',
    fontSize: Math.round(18 * SCALE_HEIGHT),
    color: 'rgb(255,255,255)',
    textAlign: 'center',
    marginTop: 28 * SCALE_HEIGHT,
    marginBottom: 23 * SCALE_HEIGHT,
  },
  buttonSignInFacebookWrapper: {
    flexDirection: 'row',
    height: 50 * SCALE_HEIGHT,
    marginHorizontal: 16,
    backgroundColor: 'rgb(255,255,255)',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20 * SCALE_HEIGHT,
  },
  iconSignInFacebook: {position: 'absolute', left: 30},
  textSignInFacebook: {
    fontFamily: 'FontsFree-Net-SFProDisplay-Medium',
    fontSize: Math.round(14 * SCALE_HEIGHT),
    color: 'rgb(17,17,17)',
  },
  buttonSignInGoogleWrapper: {
    flexDirection: 'row',
    height: 50 * SCALE_HEIGHT,
    marginHorizontal: 16,
    backgroundColor: 'rgb(255,255,255)',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20 * SCALE_HEIGHT,
  },
  iconSignInGoogle: {position: 'absolute', left: 30},
  textSignInGoogle: {
    fontFamily: 'FontsFree-Net-SFProDisplay-Medium',
    fontSize: Math.round(14 * SCALE_HEIGHT),
    color: 'rgb(17,17,17)',
  },
});

export default LoginScreen;
