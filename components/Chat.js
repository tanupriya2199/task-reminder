import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Alert,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {sendMessage, receiveMessage} from '../Firebase/Messages/Message';
import colors from '../assets/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {db} from '../Firebase/firebaseconfig';

const Chat = ({navigation, route}) => {
  const [message, setmessage] = useState('');
  const [currentUserId, setcurrentUserId] = useState('');
  const [guestUserId, setguestUserId] = useState('');
  const [allMessages, setAllMessages] = useState([]);

  const user = route.params.name;

  useEffect(async () => {
    const guestUserId = route.params.userId;
    const currentUserId = await AsyncStorage.getItem('UID');
    setcurrentUserId(currentUserId);
    setguestUserId(guestUserId);

    try {
      db.ref('messages')
        .child(currentUserId)
        .child(guestUserId)
        .on('value', dataSnapshot => {
          let messages = [];
          dataSnapshot.forEach(item => {
            messages.push({
              sendBy: item.val().currentUserId,
              receiveBy: item.val().guestUserId,
              msg: item.val().message,
            });
            setAllMessages(messages);
          });
        });
    } catch (err) {
      Alert.alert('Error!!!', err);
    }
  }, []);

  const onSendMessage = async () => {
    if (message) {
      sendMessage(currentUserId, guestUserId, message)
        .then(res => {
          setmessage('');
        })
        .catch(err => {
          Alert.alert('Error!!', 'Message sent failed');
        });

      receiveMessage(currentUserId, guestUserId, message)
        .then(res => {
          setmessage('');
        })
        .catch(err => {
          Alert.alert('Error!!', 'Message sent failed');
        });
    }
  };

  return (
    <View style={styles.container}>
      {/* header section */}
      <SafeAreaView style={styles.headerWrapper}>
        <Text style={styles.headerTitle}>{user}</Text>
      </SafeAreaView>

      <View style={styles.messagesContainer}>
        <FlatList
          data={allMessages}
          keyExtractor={(item, index) => index}
          renderItem={data => {
            return (
              <View
                style={{
                  maxWidth: Dimensions.get('window').width / 2 + 10,

                  alignSelf:
                    currentUserId === data.item.sendBy
                      ? `flex-end`
                      : `flex-start`,
                }}>
                <View
                  style={{
                    borderRadius: 20,
                    backgroundColor:
                      currentUserId === data.item.sendBy
                        ? colors.lightGrey
                        : colors.lightGreen,
                  }}>
                  <Text style={{padding: 10, fontWeight: 'bold', fontSize: 16}}>
                    {data.item.msg}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </View>

      {/* Input box */}
      <View style={styles.formControlWrapper}>
        <TextInput
          style={styles.formControlInput}
          onChangeText={text => setmessage(text)}
          value={message}
          placeholder="Write your message..."
        />
        <TouchableOpacity style={styles.iconWrapper}>
          <Ionicons
            style={styles.sendIconStyle}
            name="send"
            color={colors.white}
            size={35}
            onPress={() => {
              onSendMessage();
            }}
          />
        </TouchableOpacity>
      </View>
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
  formControlWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    position: 'absolute',
    bottom: 0,
    left: 20,
  },
  formControlInput: {
    borderColor: colors.lightBlack,
    borderWidth: 1,
    borderRadius: 25,
    width: '85%',
    fontSize: 18,
    padding: 10,
  },
  iconWrapper: {
    backgroundColor: colors.purple,
    padding: 10,
    borderRadius: 50,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messagesContainer: {flex: 5},
});

export default Chat;
