import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

import {scheduledNotification} from '../services/LocalNotificationService';
import colors from '../assets/colors';

const EditTask = ({navigation, route}) => {
  const [date, setDate] = useState(new Date());
  const [task, setTask] = useState('');

  const {item} = route.params;

  useEffect(() => {
    setTask(item.todo);
    setDate(new Date(item.reminderdate));
  }, [item]);

  const editData = async () => {
    try {
      const prevTodo = await AsyncStorage.getItem('todos');
      const values = JSON.parse(prevTodo);
      const filteredtask = values.find(task => task.index === item.index);
      console.log('filteredtask', filteredtask);

      filteredtask.todo = task;
      filteredtask.reminderdate = date;

      scheduledNotification(task, date);
      await AsyncStorage.setItem('todos', JSON.stringify(values));
      setDate(new Date());
      setTask('');
      navigation.navigate('Home');
    } catch (e) {
      console.log('err==', e);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.headerWrapper}>
          <Text style={styles.headerTitle}>Edit Task</Text>
        </View>
        <View style={styles.formWrapper}>
          <View style={styles.formControlWrapper}>
            <Text style={styles.formControlTitle}>Title</Text>
            <TextInput
              style={styles.formControlInput}
              onChangeText={text => setTask(text)}
              value={task}
            />
          </View>

          <View style={styles.formControlWrapper}>
            <Text style={styles.formControlTitle}>Reminder Date</Text>
            <DatePicker date={date} onDateChange={e => setDate(e)} />
          </View>
        </View>
      </View>
      <View style={styles.addTaskWrapper}>
        <TouchableOpacity
          style={styles.addTaskButton}
          onPress={() => {
            editData();
          }}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 20,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  headerWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  formControlInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.lightBlack,
    padding: 10,
  },
  addTaskWrapper: {},
  addTaskButton: {
    backgroundColor: colors.purple,
    width: '100%',
    paddingVertical: 20,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 20,
  },
  formControlWrapper: {},
  formControlTitle: {
    paddingVertical: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default EditTask;
