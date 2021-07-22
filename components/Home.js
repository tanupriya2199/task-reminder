import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../assets/colors';

const Home = ({navigation}) => {
  const [taskList, setTaskList] = useState([]);

  useFocusEffect(
    useCallback(() => {
      let tasks;
      const getTasks = async () => {
        try {
          tasks = await AsyncStorage.getItem('todos');
          setTaskList(JSON.parse(tasks));
        } catch {
          console.log('Error while fetching tasks');
        }
      };

      getTasks();

      return () => {};
    }, []),
  );

  const deleteTask = async index => {
    const tasks = await AsyncStorage.getItem('todos');
    const remianingTaskList = JSON.parse(tasks).filter(
      item => item.index !== index,
    );
    await AsyncStorage.setItem('todos', JSON.stringify(remianingTaskList));
    setTaskList(remianingTaskList);
  };

  const renderTaskItem = ({item}) => {
    return (
      <View style={styles.taskItemWrapper}>
        <Text style={styles.taskItemTitle}>{item.todo}</Text>
        <MaterialCommunityIcons
          onPress={() => {
            deleteTask(item.index);
          }}
          name="delete"
          size={20}
          color={colors.black}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.headerWrapper}>
          <Text style={styles.headerTitle}>My Tasks</Text>
        </View>
        <View style={styles.taskListWrapper}>
          {taskList && taskList.length > 0 ? (
            <FlatList
              renderItem={renderTaskItem}
              keyExtractor={item => item.index}
              data={taskList}
            />
          ) : (
            <View style={styles.noTaskWrapper}>
              <Text style={styles.noTaskText}>
                No tasks yet. Please add some
              </Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.addTaskWrapper}>
        <TouchableOpacity
          style={styles.addTaskButton}
          onPress={() => {
            navigation.navigate('CreateTask');
          }}>
          <Text style={styles.buttonText}>Create New Task</Text>
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
  noTaskWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  noTaskText: {
    fontSize: 18,
  },
  taskListWrapper: {},
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

  taskItemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.lightGreen,
    padding: 15,
    borderRadius: 25,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  taskItemTitle: {
    fontSize: 18,
    color: colors.lightBlack,
  },
});

export default Home;
