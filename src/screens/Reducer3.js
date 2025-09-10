import React, { useState } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';

const Reducer3 = () => {
  const [count, setCount] = useState(0);
  const onPlus = (num) => {
    setCount(count + num);
  };
  const onMinus = (num) => {
    setCount(count - num);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{count}</Text>
      <View style={styles.buttonWrap}>
        <Pressable style={styles.button} onPress={() => onPlus(3)}>
          <Text>+</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => onMinus(2)}>
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
    backgroundColor: 'pink',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default Reducer3;
