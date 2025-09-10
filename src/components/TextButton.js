/* eslint-disable react/react-in-jsx-scope */
import { Pressable, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import { PRIMARY } from '../colors';

const TextButton = ({ styles, title, onPress, hitslop }) => {
  return (
    <Pressable
      style={styles?.button}
      hitSlop={hitslop ? hitslop : 10}
      onPress={onPress}
    >
      <Text style={[defaultStyles.title, styles?.title]}>{title}</Text>
    </Pressable>
  );
};

TextButton.propTypes = {
  styles: PropTypes.object,
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  hitslop: PropTypes.number,
};

const defaultStyles = StyleSheet.create({
  title: {
    color: PRIMARY.DEFAULT,
    fontWeight: '700',
    fontSize: 16,
  },
});

export default TextButton;
