import React from 'react';
import {TextInput} from 'react-native';
import {View, Text, StyleSheet} from 'react-native';
import {SCALE_HEIGHT} from '../../assets/const/scale';

const InputForm = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <TextInput
        secureTextEntry={props.secure}
        style={styles.input}
        onChangeText={props.onChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {marginBottom: 42 * SCALE_HEIGHT},
  title: {
    fontSize: Math.round(14 * SCALE_HEIGHT),
    fontFamily: 'FontsFree-Net-SFProDisplay-Regular',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(218,68,83)',
    height: 51 * SCALE_HEIGHT,
  },
});

export default InputForm;
