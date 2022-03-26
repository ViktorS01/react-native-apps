import {ImageBackground, ScrollView, StyleSheet} from 'react-native';
import { Text, View } from '../components/Themed';
import React from "react";
import {RootTabScreenProps} from "../types";

const TabTreeScreen = ({ navigation }: RootTabScreenProps<'TabTree'>) => {
    const staticImage1 = require("../assets/images/news.png");

    return (
        <ScrollView>
            <View style={styles.block}>
                <ImageBackground source={staticImage1} style={styles.img} />
                <Text style={styles.text}>Мем (англ. meme [miːm]) — единица значимой для культуры информации. Мемом является любая идея, символ, манера или образ действия, осознанно или неосознанно передаваемые от человека к человеку посредством речи, письма, видео, ритуалов, жестов и т.</Text>
            </View>
            <View style={styles.block}>
                <ImageBackground source={staticImage1} style={styles.img} />
                <Text style={styles.text}>Мем (англ. meme [miːm]) — единица значимой для культуры информации. Мемом является любая идея, символ, манера или образ действия, осознанно или неосознанно передаваемые от человека к человеку посредством речи, письма, видео, ритуалов, жестов и т.</Text>
            </View>
            <View style={styles.block}>
                <ImageBackground source={staticImage1} style={styles.img} />
                <Text style={styles.text}>Мем (англ. meme [miːm]) — единица значимой для культуры информации. Мемом является любая идея, символ, манера или образ действия, осознанно или неосознанно передаваемые от человека к человеку посредством речи, письма, видео, ритуалов, жестов и т.</Text>
            </View>
            <View style={styles.block}>
                <ImageBackground source={staticImage1} style={styles.img} />
                <Text style={styles.text}>Мем (англ. meme [miːm]) — единица значимой для культуры информации. Мемом является любая идея, символ, манера или образ действия, осознанно или неосознанно передаваемые от человека к человеку посредством речи, письма, видео, ритуалов, жестов и т.</Text>
            </View>
            <View style={styles.block}>
                <ImageBackground source={staticImage1} style={styles.img} />
                <Text style={styles.text}>Мем (англ. meme [miːm]) — единица значимой для культуры информации. Мемом является любая идея, символ, манера или образ действия, осознанно или неосознанно передаваемые от человека к человеку посредством речи, письма, видео, ритуалов, жестов и т.</Text>
            </View>
            <View style={styles.block}>
                <ImageBackground source={staticImage1} style={styles.img} />
                <Text style={styles.text}>Мем (англ. meme [miːm]) — единица значимой для культуры информации. Мемом является любая идея, символ, манера или образ действия, осознанно или неосознанно передаваемые от человека к человеку посредством речи, письма, видео, ритуалов, жестов и т.</Text>
            </View>
            <View style={styles.block}>
                <ImageBackground source={staticImage1} style={styles.img} />
                <Text style={styles.text}>Мем (англ. meme [miːm]) — единица значимой для культуры информации. Мемом является любая идея, символ, манера или образ действия, осознанно или неосознанно передаваемые от человека к человеку посредством речи, письма, видео, ритуалов, жестов и т.</Text>
            </View>
            <View style={styles.block}>
                <ImageBackground source={staticImage1} style={styles.img} />
                <Text style={styles.text}>Мем (англ. meme [miːm]) — единица значимой для культуры информации. Мемом является любая идея, символ, манера или образ действия, осознанно или неосознанно передаваемые от человека к человеку посредством речи, письма, видео, ритуалов, жестов и т.</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    block: {
        marginVertical: 15,
        marginRight: 15,
        marginLeft: 15,
        borderRadius: 10,
        borderStyle: 'solid',
        borderColor: 'purple',
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    img: {
        width: 90,
        height: 90,
        borderRadius: 40,
    },
    text: {
        fontWeight: 'bold',
        width: '70%',
    },
});

export default TabTreeScreen