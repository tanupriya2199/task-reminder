import {db} from '../firebaseconfig';

export const sendMessage = async (currentUserId, guestUserId, message) => {
  try {
    await db
      .ref('/messages/' + currentUserId)
      .child(guestUserId)
      .push({
        currentUserId,
        guestUserId,
        message,
      });
  } catch (err) {
    return err;
  }
};

export const receiveMessage = async (currentUserId, guestUserId, message) => {
  try {
    await db
      .ref('/messages/' + guestUserId)
      .child(currentUserId)
      .push({
        currentUserId,
        guestUserId,
        message,
      });
  } catch (err) {
    return err;
  }
};
