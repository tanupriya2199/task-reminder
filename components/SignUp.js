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

import CreateUser from '../Firebase/Auth/CreateUser';
import AddUser from '../Firebase/Database/AddUser';
import colors from '../assets/colors';

const SignUp = ({navigation}) => {
  const [name, setName] = useState('');
  const [password, setpassword] = useState('');
  const [email, setEmail] = useState('');

  const signUp = () => {
    CreateUser(email, password)
      .then(res => {
        const userId = firebase.auth().currentUser.uid;
        AddUser(name, email, '', userId).then(() => {
          Alert.alert('Success!!!', 'User has been successfully added');
        });
        navigation.navigate('SignIn');
        setInitialValues();
      })
      .catch(err => {
        Alert.alert('Warning!', 'Unable to create account');
      });
  };

  const setInitialValues = () => {
    setpassword('');
    setEmail('');
    setName('');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.headerWrapper}>
        <Text style={styles.headerTitle}>Sign Up</Text>
      </SafeAreaView>

      <TextInput
        style={styles.input}
        onChangeText={e => setName(e)}
        placeholder="Enter your name"
        value={name}
      />
      <TextInput
        keyboardType="email-address"
        style={styles.input}
        onChangeText={e => setEmail(e)}
        placeholder="Enter email"
        value={email}
      />
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        placeholder="Enter password"
        onChangeText={e => setpassword(e)}
        value={password}
      />

      <View style={styles.addTaskWrapper}>
        <TouchableOpacity
          style={styles.addTaskButton}
          onPress={() => {
            signUp();
          }}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text style={{fontWeight: 'bold'}}>
          Already have an account? Go to Sign In
        </Text>
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

export default SignUp;
