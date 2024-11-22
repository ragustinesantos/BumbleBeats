import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

export default function Login({
  handleLogin,
}: {
  handleLogin: (user: string) => void;
}): React.JSX.Element {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsername = (text: string) => setUsername(text);
  const handlePassword = (text: string) => setPassword(text);

  const handleCreateAccount = () => {
    console.log('Create Account');
  };

  return (
    <View style={styles.loginView}>
      <View style={styles.mainSectionView}>
        <View style={styles.brandView}>
          <Image
            style={styles.imgStyle}
            source={require('../assets/logo/bumblebeats_logo.png')}
          />
          <Text style={styles.brandTxt}>BUMBLEBEATS</Text>
        </View>
        <View style={styles.txtView}>
          <View>
            <Text style={styles.inputLabel}>Username</Text>
            <TextInput
              style={styles.txtInput}
              placeholder="Enter Username..."
              value={username}
              onChangeText={handleUsername}
            />
          </View>
          <View>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              style={styles.txtInput}
              placeholder="Enter Password..."
              value={password}
              onChangeText={handlePassword}
              secureTextEntry={true}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.btnStyle}
          onPress={() => handleLogin(username)}>
          <Text style={styles.btnTxt}>Login</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.bottomTxt}>
        New User?{' '}
        <Text
          style={styles.bottomTxtLink}
          onPress={() => handleCreateAccount()}>
          Create an account
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loginView: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  mainSectionView: {justifyContent: 'center', alignItems: 'center'},
  brandView: {
    height: 210,
    width: 277,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  imgStyle: {
    height: 150,
    width: 150,
    marginBottom: 12,
  },
  brandTxt: {
    fontWeight: '600',
    fontSize: 38,
    color: '#222A2C',
  },
  inputLabel: {
    fontWeight: '600',
    fontSize: 16,
    color: '#222A2C',
  },
  txtView: {
    marginBottom: 30,
  },
  txtInput: {
    width: 336,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  btnStyle: {
    backgroundColor: '#E9A941',
    width: 336,
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
  },
  btnTxt: {
    fontWeight: '500',
    fontSize: 16,
    color: '#F2F2F2',
    textAlign: 'center',
  },
  bottomTxt: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222A2C',
  },
  bottomTxtLink: {
    fontSize: 16,
    fontWeight: '500',
    textDecorationLine: 'underline',
    color: '#E9A941',
  },
});
