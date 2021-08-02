import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../assets/colors';

const Comments = () => {
  return (
    <View style={styles.container}>
      <Text>Comments</Text>
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

export default Comments;
