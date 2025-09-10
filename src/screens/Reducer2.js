/* eslint-disable no-undef */
import React, { useReducer } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';

const reducer = (number, action) => {
  switch (action.type) {
    case 'plus':
      return number + 1;
    case 'minus':
      return number - 1;
    default:
      return number;
  }
};

const Reducer2 = () => {
  const [number, dispatch] = useReducer(reducer, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{number}</Text>
      <View style={styles.buttonWrap}>
        <Pressable
          style={styles.button}
          onPress={() => {
            dispatch({ type: 'plus' });
          }}
        >
          <Text>+</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => {
            dispatch({ type: 'minus' });
          }}
        >
          <Text>-</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrap: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: 'gray',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default Reducer2;
