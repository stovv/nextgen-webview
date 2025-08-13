import React, { FC } from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

type TButtonProps = {
  title: string;
  onClick?: () => void;
}
export const Button: FC<TButtonProps> = ({ title, onClick }) => {

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onClick}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#212124',
    borderRadius:16,
    width: '100%',
  },
  text: {
    color: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 20,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 500
  }
})