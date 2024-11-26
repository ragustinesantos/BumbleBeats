import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import PlaylistCard from '../components/PlaylistCard';
import {defaultPlaylist, PlaylistObject} from '../utils/utility';

export default function PlaylistList({
  navigation,
}: {
  navigation: any;
}): React.JSX.Element {

  const [playlistList, setPlaylistList] = useState<PlaylistObject[]>([
    {...defaultPlaylist},
  ]);

  const mappedPlaylists = playlistList.map((playlist, index) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => navigation.navigate('PLAYLIST', playlist)}>
        <PlaylistCard
          playlistName={playlist.playlistName}
          numOfSongs={playlist.numOfSongs}
          artwork={playlist.tracks[0].artwork}
        />
      </TouchableOpacity>
    );
  });

  return <View>{mappedPlaylists}</View>;
}
