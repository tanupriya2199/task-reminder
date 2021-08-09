import {db} from '../firebaseconfig';

const AddUser = async (name, email, image, uid) => {
  try {
    await db.ref('/users/' + uid).set({
      name,
      email,
      image,
      uid,
    });
  } catch (err) {
    return err;
  }
};

export default AddUser;
