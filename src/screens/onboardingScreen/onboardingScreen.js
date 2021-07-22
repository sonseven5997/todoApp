import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {SCALE_HEIGHT, SCALE_WIDTH} from '../../assets/const/scale';
import screens from '../../navigation/screen';
import LinearGradient from 'react-native-linear-gradient';

const OnBoardingScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          style={styles.imageStyle}
          source={require('../../assets/images/onboarding.png')}
        />
      </View>
      <View style={styles.contentWrapper}>
        <View>
          <Text style={styles.contentTitle}>Reminders made simple</Text>
          <Text style={styles.contentText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            pellentesque erat in blandit luctus.
          </Text>
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['rgb(93,230,26)', 'rgb(57,168,1)']}
          style={styles.buttonLinear}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              navigation.navigate(screens.loginScreen);
            }}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'rgb(249,252,255)'},
  imageWrapper: {flex: 3, alignItems: 'center', justifyContent: 'center'},
  imageStyle: {width: 186.2 * SCALE_WIDTH, height: 201 * SCALE_HEIGHT},
  contentWrapper: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 45 * SCALE_WIDTH,
  },
  contentTitle: {
    fontFamily: 'Rubik-Regular',
    color: 'rgb(85,78,143)',
    fontSize: 22,
    marginBottom: 11 * SCALE_HEIGHT,
    textAlign: 'center',
  },
  contentText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 17,
    color: 'rgb(130,160,183)',
    textAlign: 'center',
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    marginHorizontal: 55 * SCALE_WIDTH,
  },
  buttonLinear: {
    height: 56.3 * SCALE_HEIGHT,
    textAlign: 'center',
    borderRadius: 10,
  },
  buttonStyle: {flex: 1, justifyContent: 'center'},
  buttonText: {
    fontFamily: 'OpenSans-Semibold',
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
  },
});

export default OnBoardingScreen;
