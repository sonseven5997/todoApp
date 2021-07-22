import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import SignUpForm from '../../components/signUpForm/signUpForm';
import {Icon} from 'react-native-elements';
import {SCALE_HEIGHT} from '../../assets/const/scale';
import screens from '../../navigation/screen';

const RegisterScreen = ({navigation}) => {
  return (
    <View style={styles.flex1}>
      <ImageBackground
        source={require('../../assets/images/background-pink.png')}
        style={styles.flex1}>
        <Icon
          name="chevron-left"
          type="font-awesome-5"
          size={20}
          containerStyle={styles.iconContainer}
          onPress={() => {
            navigation.navigate(screens.loginScreen);
          }}
        />
        <SignUpForm navigate={screen => navigation.navigate(screen)} />
        <TouchableOpacity
          style={{marginTop: 56 * SCALE_HEIGHT}}
          onPress={() => {
            navigation.navigate(screens.loginScreen);
          }}>
          <Text style={styles.textLogin}>You have an account? Login</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  flex1: {flex: 1},
  iconContainer: {
    height: 86 * SCALE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginHorizontal: 16,
  },
  textLogin: {
    fontFamily: 'FontsFree-Net-Segoe-UI',
    fontSize: Math.round(20 * SCALE_HEIGHT),
    color: 'rgb(255,255,255)',
    textAlign: 'center',
  },
});

export default RegisterScreen;
