import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Dimensions,
} from 'react-native';

import Colors from '../constants/color';

const GameOverScreen = (props) => (
  <View style={styles.screen}>
    <Text>Game over</Text>
    <View style={styles.imageContainer}>
      <Image
        style={styles.image}
        resizeMode='cover'
        // source={require('../assets/success.png')}
        source={{
          uri:
            'https://images.unsplash.com/photo-1534841515798-3d43f5434123?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        }}
      />
    </View>
    <Text>
      Your phone needed{' '}
      <Text style={styles.highlight}>{props.roundsNumber}</Text>
      to guess the number
      <Text style={styles.highlight}>{props.userNumber}</Text>
    </Text>
    <Button title='NEW GAME' onPress={() => props.onConfigureNewGame()} />
  </View>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    borderRadius: 150,
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'black',
    marginVertical: Dimensions.get('window').height / 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  highlight: {
    color: Colors.accent,
    fontFamily: 'lora',
  },
});

export default GameOverScreen;
