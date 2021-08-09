import {firebaseAuth} from '../firebaseconfig';

const CreateUser = async (email, password) => {
  try {
    await firebaseAuth.createUserWithEmailAndPassword(email, password);
  } catch (err) {
    return err;
  }
};

export default CreateUser;
