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
import {User, UserToEdit, TrackObject} from '../utils/utility';

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

    const retrievedUserObject = {
      id: documentSnapshot.id,
      email: documentSnapshot.data().email,
      password: documentSnapshot.data().password,
      playlists: documentSnapshot.data().playlists,
      recentlyPlayed: documentSnapshot.data().recentlyPlayed,
      likedTracks: documentSnapshot.data().likedTracks || [],
    };

    return retrievedUserObject;
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

export async function dbToggleLikedTrack(userId: string, track: TrackObject) {
  try {
    const userReference = doc(db, 'users', userId);
    const userDoc = await getDoc(userReference);

    if (!userDoc.exists()) {
      console.log('User not found');
      return null;
    }

    const userData = userDoc.data() as User;
    const likedTracks = userData.likedTracks || [];

    const isLiked = likedTracks.some(likedTrack => likedTrack.id === track.id);
    
    let updatedLikedTracks;
    if (isLiked) {
      updatedLikedTracks = likedTracks.filter(likedTrack => likedTrack.id !== track.id);
    } else {
      updatedLikedTracks = [...likedTracks, track];
    }

    await updateDoc(userReference, {
      likedTracks: updatedLikedTracks
    });

    return {
      isLiked: !isLiked,
      likedTracks: updatedLikedTracks
    };
  } catch (error) {
    console.error('Error when liking track:', error);
    return null;
  }
}

export async function dbGetLikedTracks(userId: string): Promise<TrackObject[]> {
  try {
    const userReference = doc(db, 'users', userId);
    const userDoc = await getDoc(userReference);

    if (!userDoc.exists()) {
      console.log('User not found');
      return [];
    }

    const userData = userDoc.data() as User;
    return userData.likedTracks || [];
  } catch (error) {
    console.error('Error fetching liked tracks:', error);
    return [];
  }
}
