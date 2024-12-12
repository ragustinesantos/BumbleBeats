import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Pressable,
} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../_utils/firebase';

interface CreateAccountProps {
  onClose: () => void;
}

const CreateAccount = ({ onClose }: CreateAccountProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleCreateAccount = async () => {
    if (!username || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, username, password);
      
      Alert.alert('Success', 'Account created successfully!', [
        {
          text: 'OK',
          onPress: onClose,
        },
      ]);
    } catch (error: any) {
      let errorMessage = 'An error occurred during registration';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email is already registered';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your internet connection';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak';
          break;
      }
      
      Alert.alert('Error', errorMessage);
      console.log(error.code);
    }
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Create Account</Text>
            <Pressable onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeBtnTxt}>✕</Text>
            </Pressable>
          </View>

          <Text style={styles.subtitle}>Enter your credentials.</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#B3B3B3"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#B3B3B3"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#B3B3B3"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity 
            style={styles.createBtn}
            onPress={handleCreateAccount}
          >
            <Text style={styles.btnTxt}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    backgroundColor: '#1E1E1E',
    width: '90%',
    borderRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },

  container: {
    width: '100%',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  closeBtn: {
    padding: 8,
  },

  closeBtnTxt: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },

  title: {
    fontSize: 32,
    fontWeight: '600',
    color: 'white',
  },

  subtitle: {
    fontSize: 16,
    color: 'white',
    marginBottom: 40,
  },

  inputContainer: {
    gap: 16,
    marginBottom: 24,
  },
  
  input: {
    height: 50,
    backgroundColor: '#2C2C2C',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: 'white',
    borderWidth: 1,
    borderColor: '#3C3C3C',
  },

  createBtn: {
    height: 50,
    backgroundColor: '#E9A941',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },

  btnTxt: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CreateAccount;