import PushNotification from 'react-native-push-notification';

export const scheduledNotification = (task, date) => {
  PushNotification.localNotificationSchedule({
    channelId: 'task-reminder-channel-id',
    message: `Complete ${task}`,
    date: new Date(date),
  });
};
