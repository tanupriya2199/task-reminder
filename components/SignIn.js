import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import firebase from 'firebase';
import AuthenticateUser from '../Firebase/Auth/AuthenticateUser';
import colors from '../assets/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = ({navigation}) => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const signIn = () => {
    AuthenticateUser(email, password)
      .then(res => {
        let currentUserId = firebase.auth().currentUser.uid;
        console.log('currentUserId', currentUserId);
        AsyncStorage.setItem('UID', currentUserId);
        navigation.navigate('LandingPage');
        setInitialValues();
      })
      .catch(err => {
        console.log(err);
        Alert.alert('Error!!', 'User is not authenticated');
      });
  };

  const setInitialValues = () => {
    setpassword('');
    setemail('');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.headerWrapper}>
        <Text style={styles.headerTitle}>Sign In</Text>
      </SafeAreaView>

      <TextInput
        style={styles.input}
        onChangeText={e => {
          setemail(e);
        }}
        placeholder="Enter your email"
        value={email}
      />
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        onChangeText={e => setpassword(e)}
        placeholder="Enter password"
        value={password}
      />

      <View style={styles.addTaskWrapper}>
        <TouchableOpacity
          style={styles.addTaskButton}
          onPress={() => {
            signIn();
          }}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={{fontWeight: 'bold'}}>New User? Click Here</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',

    paddingHorizontal: 20,
  },
  headerWrapper: {
    // flex: 1,
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  input: {
    borderColor: colors.lightBlack,
    borderWidth: 1,
    borderRadius: 25,
    width: '100%',
    marginBottom: 15,
    paddingHorizontal: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addTaskWrapper: {
    width: '100%',
  },
  addTaskButton: {
    backgroundColor: colors.purple,
    width: '100%',
    paddingVertical: 20,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default SignIn;
