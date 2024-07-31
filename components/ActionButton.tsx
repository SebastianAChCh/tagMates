import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const ActionButtons = ({ onZap, onNext }) => {
  return (
    <View style={styles.buttonContainer}>
      <Button title="Zap!" onPress={onZap} />
      <Button title="Next" onPress={onNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default ActionButtons;
