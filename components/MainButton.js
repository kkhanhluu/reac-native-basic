import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

import Colors from '../constants/color';

const MainButton = (props) => {
  return (
    <TouchableOpacity onPress={() => props.onPress()}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    padding: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'lora',
    fontSize: 18,
  },
});

export default MainButton;
