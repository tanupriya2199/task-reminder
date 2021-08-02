import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import colors from '../assets/colors';

const Chats = () => {
  return (
    <View style={styles.container}>
      <Text>Chats</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 20,
  },
});

export default Chats;
