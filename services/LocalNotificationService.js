import PushNotification from 'react-native-push-notification';

// export const scheduledNotification = (task, date) => {
//   PushNotification.localNotificationSchedule({
//     channelId: 'task-reminder-channel-id',
//     message: `Complete ${task}`,
//     date: date,
//     allowWhileIdle: true,
//   });
// };

export const localNotificationSchedule = (task, date) => {
  PushNotification.localNotification({
    channelId: 'task-reminder-channel-id',
    message: `Complete ${task}`,
  });
};
