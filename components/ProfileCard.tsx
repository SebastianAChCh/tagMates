import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProfileCard = ({ image , description }) => {
  return (
    <View style={styles.card}>
      <Image source={ image } style={styles.image} />
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '90%',
    height: 400,
    borderRadius: 10
  },
  description: {
    padding: 10,
    backgroundColor: 'white',
    color: 'white',
    zIndex: 2
  },
});

export default ProfileCard;
