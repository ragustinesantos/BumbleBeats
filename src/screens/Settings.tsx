import React from 'react';
import { StyleSheet, View } from 'react-native';
import SettingItem from '../components/SettingItem';

export default function Settings(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <SettingItem title='Account' image='account' />
      <SettingItem title='Appearance' image='appearance' />
      <SettingItem title='Privacy and Security' image='privacy' />
      <SettingItem title='Notifications' image='notifications' />
      <SettingItem title='Support' image='support' />
      <SettingItem title='About' image='about' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
