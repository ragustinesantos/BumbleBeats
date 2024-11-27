import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import SearchResult from "../components/SearchResult";
import { useEffect, useState } from "react";
import { defaultTrack, TrackObject } from "../utils/utility";
import TrackPlayer from "react-native-track-player";


export default function GenreSearch({
    route,
    navigation
}: {
    route: any,
    navigation: any
}
) {
    const { searchVal } = route.params;

    const [searchResults, setSearchResults] = useState<TrackObject[]>([
        {
            ...defaultTrack,
        },
    ]);

    // Add a list of songs to the queue
    const enqueue = async (tracks: Array<TrackObject>) => {
        // Clear the queue before updating the queue
        await TrackPlayer.reset();

        // Add passed value to the queue
        await TrackPlayer.add(tracks);

        // Log queue
        console.log(await TrackPlayer.getQueue());
    };

    useEffect(() => {
        const search = async () => {
            try {
                const response = await fetch(
                    `https://api.deezer.com/search?q=${searchVal}`,
                );

                const data = await response.json();

                let resultData: TrackObject[] = [];
                for (let i = 0; i < data.data.length; i++) {
                    const newTrackObject: TrackObject = {
                        id: data.data[i].id,
                        title: data.data[i].title,
                        url: data.data[i].preview,
                        artist: data.data[i].artist.name,
                        album: data.data[i].album.title,
                        artwork: data.data[i].album.cover_xl,
                    };
                    resultData.push(newTrackObject);
                }

                setSearchResults(resultData);
            } catch (error) { }
        };

        search();

    }, []);

    const mappedSearchResults = (
        <FlatList
            data={searchResults}
            keyExtractor={track => track.id.toString()}
            renderItem={({ item }) => {
                return (
                    <TouchableOpacity
                        style={styles.searchResult}
                        onPress={async () => {
                            await enqueue([item]);
                            navigation.pop();
                            navigation.navigate('Playing', { item });
                        }}>
                        <SearchResult track={item} />
                    </TouchableOpacity>
                );
            }}
        />
    );

    return (
        <View>
            <Text
                style={styles.label}
            >
                {searchVal.toUpperCase()} SONGS
            </Text>
            {searchResults && (
                <View style={styles.searchResultView}>
                    {mappedSearchResults}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        paddingTop: 20,
        paddingRight: 20,
        paddingLeft: 20,
        paddingBottom: 90,
    },

    label: {
        fontSize: 24,
        textAlign: 'center',
        margin: 10,
        color: '#222A2C',
        fontWeight: '900',
    },

    searchResultView: {
        width: '100%',
        backgroundColor: '#F2F2F2',
        opacity: 0.95,
        borderRadius: 8,
        zIndex: 10,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowColor: '#000',
        shadowRadius: 10,
        elevation: 5,
    },

    searchResult: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 350,
        height: 80,
        padding: 10,
    },

});