import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import firebase from 'firebase';

import colors from '../assets/colors';
import {db, firebaseAuth} from '../Firebase/firebaseconfig';
import {bold} from 'chalk';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chats = ({navigation}) => {
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    db.ref('/users').on('value', querySnapShot => {
      let data = querySnapShot.val() ? querySnapShot.val() : {};
      let currentUserId = firebase.auth().currentUser.uid;
      let users = [...Object.values(data)];
      let otherUsers = users.filter(data => data.uid !== currentUserId);
      setUsersList(otherUsers);
    });
  }, []);

  const onLogout = async () => {
    firebaseAuth
      .signOut()
      .then(async res => {
        console.log('res==', res);
        await AsyncStorage.removeItem('UID');
        navigation.navigate('SignIn');
      })
      .catch(err => {
        console.log('err==', err);
      });
  };

  const renderItem = user => {
    // console.log('user==', user);
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Chat', {
            name: user.item.name,
            userId: user.item.uid,
          })
        }
        style={styles.userWrapper}>
        <Image
          style={styles.avatarStyle}
          width={40}
          height={40}
          source={require('../assets/images/avatar.jpg')}
        />
        <Text style={styles.userNameText}>{user.item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* header section */}
      <SafeAreaView style={styles.headerWrapper}>
        <Text style={styles.headerTitle}>Messages</Text>
      </SafeAreaView>

      {/* usersList section */}
      <FlatList
        data={usersList}
        renderItem={renderItem}
        keyExtractor={data => data.uid}
      />

      <TouchableOpacity
        onPress={() => onLogout()}
        style={{marginBottom: 15, alignItems: 'center'}}>
        <Text style={{fontSize: 20}}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
  },
  headerWrapper: {
    // flex: 1,
    alignItems: 'center',
    marginVertical: 20,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  userWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
    paddingVertical: 15,
  },
  avatarStyle: {
    height: 30,
    width: 30,
    borderRadius: 25,
  },
  userNameText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Chats;
