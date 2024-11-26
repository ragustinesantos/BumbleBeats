/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

type TabIconParams = {
  route: string;
  focused: boolean;
  color: string;
  size: number;
};

export default function TabIcon(params: TabIconParams): React.JSX.Element {
  const routeName = params.route;
  const isFocused = params.focused;
  const iconSize = 32;

  const getIcon = () => {
    switch (routeName) {
      case 'Home':
        return require('../assets/nav-icons/house.png');
      case 'Playlists':
        return require('../assets/nav-icons/queue.png');
      case 'Playing':
        return require('../assets/nav-icons/play-circle.png');
      case 'Search':
        return require('../assets/nav-icons/magnifying-glass.png');
    }
  };

  return (
    <View style={style.iconView}>
      <Image
        style={[
          style.iconImg,
          {
            height: iconSize,
            width: iconSize,
            tintColor: isFocused ? '#E9A941' : '#F2F2F2',
          },
        ]}
        source={getIcon()}
        alt="Tab Icon"
      />
    </View>
  );
}

const style = StyleSheet.create({
  iconView: {
    borderRadius: 10,
    padding: 5,
    margin: 15,
  },
  iconImg: {
    resizeMode: 'contain',
  },
});
