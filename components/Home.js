import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';

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
        <View>
          <Text style={styles.taskItemTitle}>{item.todo}</Text>
          <Text>{moment(item.reminderdate).format('ll')}</Text>
          <Text>{moment(new Date(item.reminderdate)).format('h:m A')}</Text>
        </View>
        <View style={styles.taskItemActionsWrapper}>
          <Entypo
            name="edit"
            style={styles.editIcon}
            size={20}
            color={colors.black}
            onPress={() => {
              navigation.navigate('EditTask', {item});
            }}
          />
          <MaterialCommunityIcons
            onPress={() => {
              deleteTask(item.index);
            }}
            name="delete"
            size={20}
            color={colors.black}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* header section */}
      <SafeAreaView style={styles.headerWrapper}>
        <Text style={styles.headerTitle}>My Tasks</Text>
      </SafeAreaView>

      {/* Task List section */}
      <ScrollView>
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
      </ScrollView>
      {/* Footer section */}
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
  noTaskWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  noTaskText: {
    fontSize: 18,
  },
  taskItemActionsWrapper: {
    flexDirection: 'row',
  },
  editIcon: {
    marginRight: 10,
  },
  taskListWrapper: {
    flex: 5,
  },
  addTaskWrapper: {},
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

  taskItemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
