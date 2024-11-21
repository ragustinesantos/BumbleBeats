import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function CustomDrawerContent(props: any): React.JSX.Element {
  const {navigation, username, logout} = props;

  return (
    <DrawerContentScrollView>
      <View style={styles.drawerView}>
        <View>
          <Text style={styles.usernameTxt}>Hi, {username}!</Text>
          <TouchableOpacity onPress={() => navigation.navigate('PROFILE')}>
            <Text style={styles.profileTxt}>View Profile</Text>
          </TouchableOpacity>
          <View style={styles.horizontalDivider} />
          <DrawerItemList {...props} />
        </View>
        <TouchableOpacity onPress={() => logout()}>
          <Text style={styles.logoutText}>LOGOUT</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerView: {
    flex: 1,
    height: 790,
    justifyContent: 'space-between',
  },
  usernameTxt: {
    fontWeight: '600',
    fontSize: 32,
    color: '#F2F2F2',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  profileTxt: {
    fontWeight: '400',
    fontSize: 14,
    color: '#F2F2F2',
    paddingHorizontal: 15,
  },
  logoutText: {
    fontWeight: '600',
    fontSize: 16,
    color: '#F2F2F2',
    paddingHorizontal: 15,
  },
  horizontalDivider: {
    width: '100%',
    height: 1,
    backgroundColor: '#F2F2F2',
    marginVertical: 10,
  },
});
