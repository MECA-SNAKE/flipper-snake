
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from '@react-native-community/slider'
import { Text, TouchableOpacity, View, Alert, ScrollView, Image } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import AxisPad from './joystick';
import styles from './styles';

interface Props { }

const App: React.FC<Props> = () => {

  const [showGame, setShowGame] = useState(false)

  const [run, setRun] = useState(false)
  const [WLsliderValue, setWLSliderValue] = useState(1)
  const [AmplsliderValue, setAmplSliderValue] = useState(40)
  const [FreqsliderValue, setFreqSliderValue] = useState(2)
  const [SpeedSliderValue, setSpeedSliderValue] = useState(1)
  const [isConcertinaPressed, setIsConcertinaPressed] = useState(false)
  const [isUndulatedPressed, setIsUndulatedPressed] = useState(false)
  const [isBackwardsPressed, setIsBackwards] = useState(false)
  const [isForwardPressed, setIsForward] = useState(false)
  const [isInchwormPressed, setIsInchworm] = useState(false)

  const [angle, setAngle] = useState(90)
  const [moveJoy, setMoveJoy] = useState(false)

  function sendOffset() {
    if (run && moveJoy) {
      sendRequests("off", angle.toString(), "params")
    }
  }

  useEffect(() => {
    sendOffset()
  }, [angle, moveJoy, run]);

  function findNearestMultipleOf10(input: number): number {
    const remainder = input % 10;

    if (remainder <= 5) {
      return input - remainder;
    }

    return input + (10 - remainder);
  }

  function sendRequests(key: string, val: string, root: string) {

    axios.post('http://192.168.236.121/' + root, {
      [key]: val
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });

  }

  const handleButtonStartPress = () => {
    if (((isUndulatedPressed)
      && (isBackwardsPressed || isForwardPressed)) || isConcertinaPressed || isInchwormPressed) {
      setRun(true)
      sendRequests("value", "1", "mode")
      console.log('START')
      setShowGame(true)
    }
    else createButtonAlert("Please select a motion and a direction before starting!")
  }


  const handleButtonStopStartPress = () => {
    if (run) {
      sendRequests("value", "0", "mode")
      setRun(false)
      console.log("STOP")
    }
    else {
      sendRequests("value", "1", "mode")
      setRun(true)
      console.log('START')
    }
  }

  const handleButtonConcertina = () => {
    if (isConcertinaPressed) return
    else {
      setIsConcertinaPressed(!isConcertinaPressed);
      setIsUndulatedPressed(false)
      setIsInchworm(false)
      console.log('CONCERTINA BUTTON ENABLED')
      sendRequests("value", "0", "motion")
    }
  }

  const handleButtonUndulated = () => {
    if (isUndulatedPressed) return
    else {
      setIsUndulatedPressed(!isUndulatedPressed);
      setIsConcertinaPressed(false)
      setIsInchworm(false)
      console.log('UNDULATED BUTTON ENABLED')
      sendRequests("value", "1", "motion")
    }
  }

  const handleButtonInchworm = () => {
    if (isInchwormPressed) return
    else {
      setIsInchworm(!isInchwormPressed)
      setIsConcertinaPressed(false)
      setWLSliderValue(1)
      setFreqSliderValue(2)
      setAmplSliderValue(40)
      setIsUndulatedPressed(false)
      console.log('INCHWORM BUTTON ENABLED')
      sendRequests("value", "2", "motion")
    }
  }

  const handleWLChange = (value: number) => {
    if (isUndulatedPressed) {
      console.log('new WL value updated')
      setWLSliderValue(value / 10);
      sendRequests("wl", String(value / 10), "params")
    }
  }

  const handleFreqChange = (value: number) => {
    if (isUndulatedPressed) {
      console.log('new Freq value updated')
      setFreqSliderValue(value / 10);
      sendRequests("freq", String(value / 10), "params")
    }
  }

  const handleAmplChange = (value: number) => {
    if (isUndulatedPressed) {
      console.log('new Ampl value updated')
      setAmplSliderValue(value);
      sendRequests("amp", String(value), "params")
    }
  }

  const handleSpeedInchwormChange = (value: number) => {
    if (isInchwormPressed) {
      console.log('new Speed value updated')
      setSpeedSliderValue(value / 10);
      sendRequests("speed", String(value / 10), "params")
    }
  }

  const handleButtonReset = () => {
    sendRequests("value", "0", "reset")
    setRun(false)
    setIsForward(false)
    setIsBackwards(false)
    setIsConcertinaPressed(false)
    setIsUndulatedPressed(false)
    setIsInchworm(false)
    setAmplSliderValue(40)
    setFreqSliderValue(2)
    setWLSliderValue(1)
    setSpeedSliderValue(1)
    setAngle(90)
    setMoveJoy(false)
    console.log("RESET")
    if (showGame) {
      setShowGame(false)
    }
  }

  const handleBackwards = () => {
    console.log("BACKWARDS")
    setIsBackwards(true)
    setIsForward(false)
    sendRequests("value", "0", "direction")
  }

  const handleForward = () => {
    console.log("FORWARDS")
    setIsBackwards(false)
    setIsForward(true)
    sendRequests("value", "1", "direction")
  }

  const createButtonAlert = (message: string) => {
    Alert.alert("ERROR", message, [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
  }

  if (showGame) {
    if (isUndulatedPressed) {
      return (
        <View style={[styles.container1, { marginTop: 80, marginBottom: 80, marginLeft: 30, marginRight: 30 }]}>

          <View style={styles.containerButtons}>
            <TouchableOpacity style={[styles.button, isBackwardsPressed && styles.pressedButton,
            moveJoy ? styles.disabledButton : styles.shit]}
              onPress={handleBackwards}
              disabled={isConcertinaPressed}>
              <Text style={styles.buttonMotion}>Backwards</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, isForwardPressed && styles.pressedButton
              , moveJoy ? styles.disabledButton : styles.shit]}
              onPress={handleForward}
              disabled={isConcertinaPressed}>
              <Text style={styles.buttonMotion}>Forward</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.containerButtons, { marginBottom: 30 }]}>
            <TouchableOpacity style={[styles.button, moveJoy ? styles.disabledButton : styles.shit]} onPress={handleButtonReset}>
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, moveJoy ? styles.disabledButton : styles.shit]} onPress={handleButtonStopStartPress}>
              <Text style={styles.buttonText}>{run ? 'STOP' : 'START'}</Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.subTitle, moveJoy ? styles.disabledButton : styles.shit]}>Set WaveLength</Text>
          <Slider
            style={[{ width: 200, height: 40 }, moveJoy ? styles.disabledButton : styles.shit]}
            minimumValue={10}
            maximumValue={30}
            step={5}
            value={WLsliderValue}
            onValueChange={(value) => setWLSliderValue(value / 10)}
            onSlidingComplete={(value) => handleWLChange(value)}
          />

          <Text style={[moveJoy ? styles.disabledButton : styles.shit]}>Value: {WLsliderValue}</Text>
          <Text style={[styles.subTitle, moveJoy ? styles.disabledButton : styles.shit]}>Set Amplitude</Text>
          <Slider
            style={[{ width: 200, height: 40 }, moveJoy ? styles.disabledButton : styles.shit]}
            minimumValue={20}
            maximumValue={70}
            step={1}
            value={AmplsliderValue}
            onSlidingComplete={(value) => handleAmplChange(value)}
            onValueChange={(value) => setAmplSliderValue(value)}
          />
          <Text style={[moveJoy ? styles.disabledButton : styles.shit]}>Value: {AmplsliderValue}</Text>

          {!moveJoy ? <Text style={styles.subTitle}>Set Frequency</Text> : null}
          <Slider
            value={FreqsliderValue}
            onValueChange={(value) => setFreqSliderValue(value / 10)}
            onSlidingComplete={(value) => handleFreqChange(value)}
            minimumValue={5}
            maximumValue={100}
            step={1}
            style={[{ width: 200, height: 40 }, moveJoy ? styles.disabledButton : styles.shit]}
          />
          <Text style={[moveJoy ? styles.disabledButton : styles.shit]}>Value: {FreqsliderValue}</Text>

          <GestureHandlerRootView style={{ marginTop: 80 }}>
            <View style={(isConcertinaPressed || isInchwormPressed) && styles.disabledButton}>
              <AxisPad color="#06b6d4" radius={75} onMove={data => {
                setAngle(findNearestMultipleOf10(data.angle.degree))
              }}
                onStop={(data) => {
                  setMoveJoy(false)
                }}
                onStart={(data) => {
                  setMoveJoy(true)
                }} />
            </View>
          </GestureHandlerRootView>

        </View>
      )
    } else {
      return (
        <View style={styles.container1}>
          <TouchableOpacity style={styles.button} onPress={handleButtonReset}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>

          <View style={styles.arrowButtonContainer}>

            <TouchableOpacity style={[styles.button, { marginTop: 50 }]} onPress={handleButtonStopStartPress}>
              <Text style={styles.buttonText}>{run ? 'STOP' : 'START'}</Text>
            </TouchableOpacity>

          </View>

          {isInchwormPressed ? <Text style={styles.subTitle}>Set Speed Inchworm</Text> : null}

          {isInchwormPressed ? <Slider
            value={SpeedSliderValue}
            onValueChange={(value) => setSpeedSliderValue(value / 10)}
            onSlidingComplete={(value) => handleSpeedInchwormChange(value)}
            minimumValue={2}
            maximumValue={40}
            step={1}
            style={{ width: 200, height: 40 }}
            disabled={isUndulatedPressed || isConcertinaPressed ||
              (!isConcertinaPressed && !isUndulatedPressed && !isInchwormPressed)}
          /> : null}

          {isInchwormPressed ? <Text>Value: {SpeedSliderValue}</Text> : null}
        </View>
      )
    }
  }

  return (
    <ScrollView>

      <View style={[styles.container1, { marginTop: 80, marginBottom: 80, marginLeft: 30, marginRight: 30 }]}>

        <Image source={require('./head.jpeg')} style={[{ marginBottom: 30 }]} />

        <TouchableOpacity style={styles.button} onPress={handleButtonReset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>

        <Text style={styles.titleMode}>MODE</Text>

        <View style={styles.containerButtons}>
          <TouchableOpacity style={[styles.button, run && styles.pressedButton]} onPress={handleButtonStartPress}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.titleMode}>MOTION</Text>

        <View style={styles.containerButtons}>
          <TouchableOpacity style={[styles.button, isConcertinaPressed && styles.pressedButton]} onPress={handleButtonConcertina}>
            <Text style={styles.buttonMotion}>Concertina</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, isUndulatedPressed && styles.pressedButton]} onPress={handleButtonUndulated}>
            <Text style={styles.buttonMotion}>Undulated</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, isInchwormPressed && styles.pressedButton]} onPress={handleButtonInchworm}>
            <Text style={styles.buttonMotion}>Inchworm</Text>
          </TouchableOpacity>

        </View>

        <Text style={styles.titleMode}>DIRECTION</Text>
        <View style={styles.containerButtons}>
          <TouchableOpacity style={[styles.button, isBackwardsPressed && styles.pressedButton, (isConcertinaPressed || isInchwormPressed) && styles.disabledButton]}
            onPress={handleBackwards}
            disabled={isConcertinaPressed}>
            <Text style={styles.buttonMotion}>Backwards</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, isForwardPressed && styles.pressedButton, (isConcertinaPressed || isInchwormPressed) && styles.disabledButton]}
            onPress={handleForward}
            disabled={isConcertinaPressed}>
            <Text style={styles.buttonMotion}>Forward</Text>
          </TouchableOpacity>

        </View>

        <Text style={styles.titleMode}>PARAMETERS</Text>

        <Text style={styles.subTitle}>Set WaveLength</Text>

        <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={10}
          maximumValue={30}
          step={5}
          value={WLsliderValue}
          disabled={isInchwormPressed || isConcertinaPressed ||
            (!isConcertinaPressed && !isUndulatedPressed && !isInchwormPressed)}
          onValueChange={(value) => setWLSliderValue(value / 10)}
          onSlidingComplete={(value) => handleWLChange(value)}
        />
        <Text>Value: {WLsliderValue}</Text>


        <Text style={styles.subTitle}>Set Amplitude</Text>

        <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={20}
          maximumValue={70}
          step={1}
          disabled={isInchwormPressed || isConcertinaPressed ||
            (!isConcertinaPressed && !isUndulatedPressed && !isInchwormPressed)}
          value={AmplsliderValue}
          onSlidingComplete={(value) => handleAmplChange(value)}
          onValueChange={(value) => setAmplSliderValue(value)}
        />
        <Text>Value: {AmplsliderValue}</Text>

        <Text style={styles.subTitle}>Set Frequency</Text>

        <Slider
          value={FreqsliderValue}
          onValueChange={(value) => setFreqSliderValue(value / 10)}
          onSlidingComplete={(value) => handleFreqChange(value)}
          minimumValue={5}
          maximumValue={100}
          step={1}
          style={{ width: 200, height: 40 }}
          disabled={isInchwormPressed || isConcertinaPressed ||
            (!isConcertinaPressed && !isUndulatedPressed && !isInchwormPressed)}
        />
        <Text>Value: {FreqsliderValue}</Text>

        <Text style={styles.subTitle}>Set Speed Inchworm</Text>

        <Slider
          value={SpeedSliderValue}
          onValueChange={(value) => setSpeedSliderValue(value / 10)}
          onSlidingComplete={(value) => handleSpeedInchwormChange(value)}
          minimumValue={2}
          maximumValue={40}
          step={1}
          style={{ width: 200, height: 40 }}
          disabled={isUndulatedPressed || isConcertinaPressed ||
            (!isConcertinaPressed && !isUndulatedPressed && !isInchwormPressed)}
        />
        <Text>Value: {SpeedSliderValue}</Text>

      </View>
    </ScrollView>
  );
}

export default App;