import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

import Card from '../components/Card';
import Colors from '../constants/color';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import MainButton from '../components/MainButton';

const StartGameScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(0);
  const [width, setWidth] = useState(Dimensions.get('window').width);

  Dimensions.addEventListener('change', () =>
    setWidth(Dimensions.get('window').width)
  );

  const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g), '');
  };

  const resetInputHandler = () => {
    setEnteredValue('');
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Invalid number!',
        'Number has to be a number between 1 and 99',
        [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
      );
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue('');
    Keyboard.dismiss();
  };

  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text>Chosen Number</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton onPress={() => props.onStartGame(selectedNumber)}>
          START GAME
        </MainButton>
      </Card>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.screen}>
            <Text style={styles.title}> Start a new game! </Text>
            <Card style={styles.inputContainer}>
              <Text>Select a number</Text>
              <Input
                style={styles.input}
                blurOnSubmit
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType='number-pad'
                maxLength={2}
                onChangeText={(text) => numberInputHandler(text)}
                value={enteredValue}
              />
              <View style={styles.buttonContainer}>
                <View style={styles.button}>
                  <Button
                    title='Confirm'
                    color={Colors.primary}
                    onPress={() => confirmInputHandler()}
                  />
                </View>
                <View style={styles.button}>
                  <Button
                    title='Reset'
                    color={Colors.accent}
                    onPress={() => resetInputHandler()}
                  />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  button: {
    width: Dimensions.get('window').width / 4,
  },
  input: {
    width: 50,
    textAlign: 'center',
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default StartGameScreen;
