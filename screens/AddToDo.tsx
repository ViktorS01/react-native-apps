import React, {useContext, useEffect, useState} from "react";
import {Text, View} from "../components/Themed";
import {Pressable, StyleSheet, TextInput} from "react-native";
import {Button} from "react-native-paper";
import {RootTabScreenProps} from "../types";
import {useApi} from "../api";
import {ToDoContext} from "../App";
import {MonoText} from "../components/StyledText";

export default function AddToDo({ navigation }: RootTabScreenProps<'AddToDo'>) {
    const [date, setDate] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [text, setText] = useState<string>('')
    const [currentTagsList, setCurrentTagsList] = useState<Array<{isActive: boolean, text: string, id: number}>>([])
    const [selectTag, setSelectTag] = useState<string[]>([])

    const {addNote, getAllNotes} = useApi()
    const { setNotes, tags } = useContext(ToDoContext);

    useEffect(() => {
        const newTags = tags.map(item => {
            return {isActive: false, text: item.text, id: item.id}
        })
        setCurrentTagsList(newTags)
    }, [])

    const handleActive = (id: number) => {
        const newTags = currentTagsList.map(item => item.id === id ? {...item, isActive: !item.isActive} : item)
        setCurrentTagsList(newTags)
        const newSelectTags: string[] = []
        newTags.forEach(item => {
            if (item.isActive){
                newSelectTags.push(item.text)
            }
        })
        setSelectTag(newSelectTags)
    }


    const addToDo = async () => {
        const newDate: string = date === '' ? new Date().toString() : date
        await addNote(text, title, newDate, selectTag)
        await getAllNotes().then((res) => setNotes(res));
        await navigation.navigate('ToDo')
    }

    return (
        <View style={styles.container}>
            <Text>Дата:</Text>
            <TextInput style={styles.input} value={date} onChangeText={setDate}/>
            <Text>Заголовок:</Text>
            <TextInput style={styles.input} value={title} onChangeText={setTitle}/>
            <Text>Текст:</Text>
            <TextInput style={styles.input} value={text} onChangeText={setText}/>
            <Text>Теги:</Text>
            <View style={styles.tags}>
                {currentTagsList.map((item, index) => {
                    return <Pressable onPress={() => handleActive(item.id)} key={index}>
                        <View style={item.isActive ? styles.activeTag : styles.tag} key={index}>
                        <MonoText style={item.isActive ? {color: 'white'} : {color: 'black'}}>{item.text}</MonoText>
                    </View>
                    </Pressable>
                })}
            </View>
            <Button
                mode="contained"
                style={{marginTop: 20}}
                onPress={() => addToDo()}
                color={'purple'}>
                Сохранить
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
    input: {
        borderStyle: 'solid',
        borderColor: 'purple',
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginVertical: 15,
    },
    tags: {
        display: "flex",
        alignItems: "center",
        flexDirection: 'row',
        flexWrap: "wrap",
        marginTop: 10,
    },
    tag: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'purple',
        borderRadius: 5,
        marginRight: 10,
        marginBottom: 10,
    },
    activeTag: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'purple',
        borderRadius: 5,
        marginRight: 10,
        marginBottom: 10,
        backgroundColor: 'purple',
    },
});