/* eslint-disable @typescript-eslint/no-shadow */
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
} from 'firebase/firestore';
import {db} from '../_utils/firebase';
import {User, UserToEdit} from '../utils/utility';

export async function dbGetAllUsers() {
  try {
    const allUsersReference = collection(db, 'users');
    const allUsersQuery = query(allUsersReference);
    const querySnapshot = await getDocs(allUsersQuery);
    const UserList: User[] = [];
    querySnapshot.forEach((doc: any) => {
      const User = {
        id: doc.id,
        ...doc.data(),
      };
      UserList.push(User);
    });
    return UserList;
  } catch (error) {
    return console.log(error);
  }
}

export async function dbAddUser(userObj: UserToEdit) {
  try {
    const newUserReference = collection(db, 'users');
    await addDoc(newUserReference, userObj);
  } catch (error) {
    return console.log(error);
  }
}

export async function dbGetUser(userId: string) {
  try {
    const userReference = doc(db, 'users', userId);

    const documentSnapshot = await getDoc(userReference);

    if (!documentSnapshot.exists()) {
      console.log('This user does not exist in the database');
      return null;
    }

    console.log('User successfully retrieved');

    return documentSnapshot.data();
  } catch (error) {
    return console.log(`Error retrieving user: ${error}`);
  }
}

export async function dbUpdateUser(
  userId: string,
  updatedUserObject: {[key: string]: any},
) {
  try {
    const userReference = doc(db, 'users', userId);

    await updateDoc(userReference, updatedUserObject);

    console.log('User successfully updated');
  } catch (error) {
    return console.log(`Error updating user: ${error}`);
  }
}
