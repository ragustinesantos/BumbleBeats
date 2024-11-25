import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

type settingItemParameters = {
    title: string,
    image: string,
}

const images = {
    account: require('./../assets/nav-icons/user.png'),
    appearance: require('./../assets/nav-icons/eye.png'),
    privacy: require('./../assets/nav-icons/lock-key.png'),
    notifications: require('./../assets/nav-icons/bell.png'),
    support: require('./../assets/nav-icons/headset.png'),
    about: require('./../assets/nav-icons/question.png'),
};

type ImageKeys = keyof typeof images;

export default function SettingItem(params: settingItemParameters): React.JSX.Element {

    return (
        <View style={styles.item}>
            <Image
                style={styles.icons}
                source={images[params.image as ImageKeys]}
            />
            <Text style={styles.text}>
                {params.title}
            </Text>
            <Image
                style={styles.icons}
                source={require('./../assets/nav-icons/caret-right.png')}
            />
        </View>
    )
}

const styles = StyleSheet.create({

    item: {
        width: '80%',
        height: 60,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: '#D3D3D3',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginVertical: 10,
    },

    icons: {
        height: 35,
        width: 35,
    },

    text: {
        color: '#000000',
        fontSize: 20,
        fontWeight: '500'
    }
});