import React, { useEffect, useReducer, useContext, useMemo, useCallback } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import countReducer from './src/reducers/countReducer';
import colorReducer from './src/reducers/colorReducer';
import inititalState from './src/constants/InitialState';
import { COUNT_DECREMENT, COUNT_INCREMENT, SET_COLOR } from './src/constants/actionTypes';
import ColorContext from './src/contexts/ColorContext';

const App = () => {

  const [counterState, counterDispatch] = useReducer(countReducer, inititalState);
  const [colorState, colorDispatch] = useReducer(colorReducer, inititalState);

  const counterSquareRoot = useMemo(() => {
    console.log('calculate square root')
    return Math.sqrt(counterState.counter);
  }, [counterState.counter])

  const logCounterValue = useCallback(() => {
    console.log('log_counter_value => ', counterState.counter);
  }, [counterState.counter])

  return (
    <ColorContext.Provider value={{
      colorState: colorState,
      colorDispatch: colorDispatch,
    }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
        <StatusBar barStyle='light-content' />
        <View style={{ padding: 16, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Hello World</Text>

          <TouchableOpacity style={{ padding: 16, margin: 16 }} onPress={() => {
            counterDispatch({ type: COUNT_DECREMENT })
          }}>
            <Text>-</Text>
          </TouchableOpacity>

          <Text>{counterState.counter}</Text>

          <TouchableOpacity style={{ padding: 16, margin: 16 }} onPress={() => {
            counterDispatch({ type: COUNT_INCREMENT })
          }}>
            <Text>+</Text>
          </TouchableOpacity>

          <Text style={{ marginBottom: 16 }}>Square root is: {counterSquareRoot}</Text>

          <FirstChild />

          <TouchableOpacity style={{ padding: 16, margin: 16 }} onPress={() => {
            if (colorState.color == 'blue')
              colorDispatch({ type: SET_COLOR, color: 'red' })
            else
              colorDispatch({ type: SET_COLOR, color: 'blue' })
          }}>
            <Text>Change Color</Text>
          </TouchableOpacity>

          <PureComponentTest logCounterValue={logCounterValue} />
        </View>
      </SafeAreaView>
    </ColorContext.Provider>
  );
};

const FirstChild = () => {
  const { colorState } = useContext(ColorContext);

  return (
    <View>
      <Text style={{ color: colorState.color }}>Child</Text>
    </View>
  )
}

class PureComponentTest extends React.PureComponent {
  render() {
    this.props.logCounterValue();

    return (
      <View>
        <Text>Pure Component</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
