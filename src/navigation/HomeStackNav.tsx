/* eslint-disable react/no-unstable-nested-components */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Home from '../screens/Home';
import Playing from '../screens/Playing';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';

const HomeStack = createNativeStackNavigator();

type DrawerParamList = {
  Settings: undefined;
  Profile: undefined;
};

export default function HomeStackNav(): React.JSX.Element {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: '#F2F2F2',
        headerStyle: {backgroundColor: '#222A2C'},
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image
              style={styles.hmbrgrIcon}
              source={require('../assets/nav-icons/list.png')}
            />
          </TouchableOpacity>
        ),
      }}>
      <HomeStack.Screen name="HOME" component={Home} />
      <HomeStack.Screen name="PLAYING" component={Playing} />
    </HomeStack.Navigator>
  );
}

const styles = StyleSheet.create({
  hmbrgrIcon: {
    width: 32,
    height: 32,
    tintColor: '#F2F2F2',
  },
});
