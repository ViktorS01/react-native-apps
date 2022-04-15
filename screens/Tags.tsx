import React, {useContext} from "react";
import {View} from "../components/Themed";
import {Pressable, StyleSheet} from "react-native";
import {Button} from "react-native-paper";
import {MonoText} from "../components/StyledText";
import {RootTabScreenProps} from "../types";
import {ToDoContext} from "../App";
import {useApi} from "../api";

export default function Tags({ navigation }: RootTabScreenProps<'Tags'>) {
    const {deleteTag, getAllTags} = useApi()
    const { setTags, tags } = useContext(ToDoContext);

    const deleteItem = async (id: number) => {
        await deleteTag(id)
        // @ts-ignore
        await getAllTags().then((res) => setTags(res));
    }

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <MonoText>Теги:</MonoText>
            </View>
            <View style={styles.tags}>
                {tags.map((item, index) => {
                    return item.id !== -1 && <View style={styles.tag} key={index}>
                        <MonoText>{item.text}</MonoText>
                        <Pressable style={styles.close} onPress={() => deleteItem(item.id)}>
                            <View><MonoText style={{color: 'purple', fontSize: 12, fontWeight: 'bold'}}>x</MonoText></View>
                        </Pressable>
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
    },
    tag: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'purple',
        borderRadius: 5,
        marginRight: 10,
        marginBottom: 10,
        position: 'relative',
    },
    top: {
        marginBottom: 20,
    },
    close: {
        position: 'absolute',
        right: 4,
        top: 0,
    }
});