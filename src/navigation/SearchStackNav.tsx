import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Search from '../screens/Search';
import Playing from '../screens/Playing';
import GenreSearch from '../screens/GenreSearch';

const SearchStack = createNativeStackNavigator();

export default function SearchStackNav(): React.JSX.Element {
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: '#F2F2F2',
        headerStyle: { backgroundColor: '#222A2C' },
      }}
      initialRouteName="SEARCH">
      <SearchStack.Screen name="SEARCH" component={Search} />
      <SearchStack.Screen name="PLAYING" component={Playing} />
      <SearchStack.Screen name="GENRE" component={GenreSearch} />
    </SearchStack.Navigator>
  );
}
