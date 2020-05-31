import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNumber = Math.floor(Math.random() * (max - min) + min);
  if (randomNumber === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return randomNumber;
  }
};

const renderListItem = (value, numOfRound) => (
  <View key={value} style={styles.listItem}>
    <Text>#{numOfRound}</Text>
    <Text>{value}</Text>
  </View>
);

const GameScreen = (props) => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  console.log('initial guess', initialGuess);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuess, setPassGuest] = useState([initialGuess]);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    if (currentGuess === props.userChoice) {
      props.onGameOver(pastGuess.length);
    }
  }, [currentGuess]);

  const nextGuestHandler = (direction) => {
    if (
      (direction === 'lower' && currentGuess < props.userChoice) ||
      (direction === 'greater' && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong', [
        { text: 'Sorry!', style: 'cancel' },
      ]);
      return;
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    // setRounds((currentRound) => currentRound + 1);
    setPassGuest((currPasGuesses) => [...currPasGuesses, nextNumber]);
  };
  return (
    <View style={styles.screen}>
      <Text>Opponent's guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={() => nextGuestHandler('lower')}>
          <Ionicons name='md-remove' size={24} color='white' />
        </MainButton>
        <MainButton onPress={() => nextGuestHandler('greater')}>
          <Ionicons name='md-add' size={24} color='white' />
        </MainButton>
      </Card>
      <View style={styles.list}>
        <ScrollView>
          {pastGuess.map((guess, index) => renderListItem(guess, index + 1))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
    width: 300,
    maxWidth: '80%',
  },
  list: {
    width: '80%',
    flex: 1,
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default GameScreen;
