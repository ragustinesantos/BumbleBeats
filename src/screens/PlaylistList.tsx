import React, {useState} from 'react';
import {View} from 'react-native';
import PlaylistCard from '../components/PlaylistCard';

export default function PlaylistList({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}): React.JSX.Element {
  // const {playlistList} = route.params;
  const [playlistList, setPlaylistList] = useState([]);

  const mappedPlaylists = playlistList.map(() => {
    return (
      <View>
        <PlaylistCard />
      </View>
    );
  });

  return <View>{mappedPlaylists}</View>;
}
