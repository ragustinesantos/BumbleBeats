import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {StyleSheet, Text} from 'react-native';

export default function CustomDrawerContent(props: any): React.JSX.Element {
  return (
    <DrawerContentScrollView>
      <Text style={styles.usernameTxt}>Hi, {props.username}!</Text>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  usernameTxt: {
    fontWeight: '600',
    fontSize: 32,
    color: '#F2F2F2',
    padding: 10,
  },
});
