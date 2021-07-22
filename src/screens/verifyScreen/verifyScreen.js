import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {SCALE_HEIGHT} from '../../assets/const/scale';
import screens from '../../navigation/screen';
import {Icon, Button} from 'react-native-elements';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
const VerifyScreen = ({navigation}) => {
  return (
    <View>
      <Icon
        name="chevron-left"
        type="font-awesome-5"
        size={20}
        containerStyle={styles.buttonBackContainer}
        onPress={() => {
          navigation.navigate(screens.loginScreen);
        }}
      />
      <Image
        source={require('../../assets/images/email-verify.png')}
        style={styles.imageStyle}
      />
      <Text style={styles.verificationText}>Verification</Text>
      <View style={styles.mainContentWrapper}>
        <Text style={styles.pincodeText}>
          6 - Digit PIN has been sent to your email address, enter it below to
          continue
        </Text>
        <View style={styles.alignItemCenter}>
          <SmoothPinCodeInput
            codeLength={6}
            cellStyle={styles.pincodeCellStyle}
            containerStyle={styles.pincodeContainerStyle}
          />
        </View>
        <Button
          containerStyle={styles.buttonContinueContainerStyle}
          buttonStyle={styles.buttonContinueStyle}
          titleStyle={styles.buttonContinueTitle}
          title="CONTINUE"
          onPress={() => {
            navigation.navigate(screens.mainScreenTabs);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonBackContainer: {
    height: 86 * SCALE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginHorizontal: 16,
  },
  imageStyle: {height: 193 * SCALE_HEIGHT, width: '100%', resizeMode: 'cover'},
  verificationText: {
    fontFamily: 'FontsFree-Net-SFProDisplay-Bold',
    fontSize: Math.round(30 * SCALE_HEIGHT),
    textAlign: 'center',
    marginTop: 32.3 * SCALE_HEIGHT,
    marginBottom: 27 * SCALE_HEIGHT,
  },
  mainContentWrapper: {
    paddingTop: 53 * SCALE_HEIGHT,
    paddingBottom: 16 * SCALE_HEIGHT,
    marginHorizontal: 16,
    paddingHorizontal: 16,
  },
  pincodeText: {
    fontSize: Math.round(14 * SCALE_HEIGHT),
    fontFamily: 'FontsFree-Net-SFProDisplay-Regular',
    textAlign: 'center',
    color: 'rgb(146,146,146)',
    marginBottom: 57.1 * SCALE_HEIGHT,
  },
  alignItemCenter: {alignItems: 'center'},
  pincodeCellStyle: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'rgb(218,68,83)',
  },
  pincodeContainerStyle: {justifyContent: 'space-evenly'},
  buttonContinueContainerStyle: {marginTop: 18 * SCALE_HEIGHT},
  buttonContinueStyle: {
    height: 50 * SCALE_HEIGHT,
    backgroundColor: 'rgb(218,68,83)',
  },
  buttonContinueTitle: {
    fontFamily: 'FontsFree-Net-SFProText-Regular',
    fontSize: Math.round(14 * SCALE_HEIGHT),
  },
});

export default VerifyScreen;
