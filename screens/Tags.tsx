import React, {useEffect, useState} from "react";
import {View} from "../components/Themed";
import {StyleSheet} from "react-native";
import {Button} from "react-native-paper";
import {MonoText} from "../components/StyledText";
import {RootTabScreenProps} from "../types";
import axios from "axios";
import {ITag} from "../models";

export default function Tags({ navigation }: RootTabScreenProps<'Tags'>) {
    const [tags, setTags] = useState<ITag[]>([])

    useEffect(() => {
        axios.get('http://192.168.84.178:8000/api/tags')
            .then((res) => setTags(res.data.data))
            .catch((err) => console.log(err.data))
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <MonoText>Теги:</MonoText>
            </View>
            <View style={styles.tags}>
                {tags.map((item, index) => {
                    return <View style={styles.tag} key={index}>
                        <MonoText>{item.text}</MonoText>
                    </View>
                })}
            </View>
            <Button
                mode="contained"
                onPress={() => navigation.navigate('AddTag')}
                style={{marginTop: 20}}
                color={'purple'}>
                Добавить тег
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    tags: {
        display: "flex",
        alignItems: "center",
        flexDirection: 'row',
        flexWrap: "wrap",
        gap: 10,
    },
    tag: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'purple',
        borderRadius: 5,
    },
    top: {
        marginBottom: 20,
    },
});