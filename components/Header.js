import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

import Colors from '../constants/color';

const Header = (props) => {
  return (
    <View
      style={{
        ...styles.headerBase,
        ...Platform.select({
          ios: styles.headerIOS,
          android: styles.headerAndroid,
        }),
      }}
    >
      <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBase: {
    width: '100%',
    height: 90,
    paddingTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerAndroid: {
    backgroundColor: Colors.primary,
    borderBottomColor: 'transparent',
    borderBottomWidth: 0,
  },
  headerIOS: {
    backgroundColor: '#fff',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  headerTitle: {
    color: Platform.OS === 'ios' ? Colors.primary : '#fff',
    fontSize: 18,
    fontFamily: 'lora',
  },
});

export default Header;
