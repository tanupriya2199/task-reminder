import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import PushNotification from 'react-native-push-notification';

import Home from './components/Home';
import CreateTask from './components/CreateTask';
import EditTask from './components/EditTask';

const Stack = createStackNavigator();

function App() {
  useEffect(() => {
    createChannels();
  }, []);

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
