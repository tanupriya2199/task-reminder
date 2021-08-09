import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import PushNotification from 'react-native-push-notification';
import BackgroundFetch from 'react-native-background-fetch';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Home from './components/Home';
import CreateTask from './components/CreateTask';
import EditTask from './components/EditTask';
import {localNotificationSchedule} from './services/LocalNotificationService';
import LandingPage from './components/LandingPage';
import Chats from './components/Chats';
import Comments from './components/Comments';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Chat from './components/Chat';

const Stack = createStackNavigator();

function App() {
  useEffect(() => {
    createChannels();
    initBackgroundFetch();
  }, []);

  const initBackgroundFetch = async () => {
    const onEvent = async taskId => {
      // Do your background work...

      await performBackgroundTask(taskId);

      // IMPORTANT:  You must signal to the OS that your task is complete.
      BackgroundFetch.finish(taskId);
    };

    // Timeout callback is executed when your Task has exceeded its allowed running-time.
    // You must stop what you're doing immediately BackgroundFetch.finish(taskId)
    const onTimeout = async taskId => {
      console.warn('[BackgroundFetch] TIMEOUT task: ', taskId);
      BackgroundFetch.finish(taskId);
    };

    // Initialize BackgroundFetch only once when component mounts.
    let status = await BackgroundFetch.configure(
      {
        minimumFetchInterval: 15, // <-- minutes (15 is minimum allowed)
        // Android options
        forceAlarmManager: true, // <-- Set true to bypass JobScheduler.
        stopOnTerminate: false,
        startOnBoot: true,
        requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY, // Default
        requiresCharging: false, // Default
        requiresDeviceIdle: false, // Default
        requiresBatteryNotLow: false, // Default
        requiresStorageNotLow: false, // Default
      },
      onEvent,
      onTimeout,
    );

    BackgroundFetch.status(status => {
      switch (status) {
        case BackgroundFetch.STATUS_RESTRICTED:
          console.log('BackgroundFetch restricted');
          break;
        case BackgroundFetch.STATUS_DENIED:
          console.log('BackgroundFetch denied');
          break;
        case BackgroundFetch.STATUS_AVAILABLE:
          // performBackgroundTask();
          console.log('BackgroundFetch is enabled');
          break;
      }
    });
  };

  const performBackgroundTask = () => {
    return new Promise((resolve, reject) => {
      sendNotification()
        .then(resolve())
        .catch(err => {
          reject(err);
        });
    });
  };

  const sendNotification = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const storedTodos = await AsyncStorage.getItem('todos');
        const todos = JSON.parse(storedTodos);
        const filteredTodos = todos.filter(task => {
          if (
            new Date(task.reminderdate) < new Date() &&
            !task.isNotificationSent
          ) {
            return task;
          }
        });
        filteredTodos.map(async task => {
          localNotificationSchedule(task.todo);
          task.isNotificationSent = true;
          await AsyncStorage.setItem('todos', JSON.stringify(todos));
        });
        resolve();
      } catch (err) {
        console.log('fail to send notification', err);
        reject();
      }
    });
  };

  const createChannels = () => {
    PushNotification.createChannel({
      channelId: 'task-reminder-channel-id',
      channelName: 'Task Reminder Channel',
      soundName: 'default',
      vibrate: true,
    });
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="SignIn"
          component={SignIn}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="SignUp"
          component={SignUp}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="LandingPage"
          component={LandingPage}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="CreateTask"
          component={CreateTask}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="EditTask"
          component={EditTask}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Chats"
          component={Chats}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Comments"
          component={Comments}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Chat"
          component={Chat}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
