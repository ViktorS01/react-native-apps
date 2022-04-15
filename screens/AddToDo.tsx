import React, {useContext, useEffect, useState} from "react";
import {Text, View} from "../components/Themed";
import {Picker, StyleSheet, TextInput} from "react-native";
import {Button} from "react-native-paper";
import {ITag} from "../models";
import {RootTabScreenProps} from "../types";
import {useApi} from "../api";
import {ToDoContext} from "../App";

export default function AddToDo({ navigation }: RootTabScreenProps<'AddToDo'>) {
    const [date, setDate] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [text, setText] = useState<string>('')
    const [currentTagsList, setCurrentTagsList] = useState<ITag[][]>([])
    const [selectTag, setSelectTag] = useState<string[]>([])
    const [colTag, setColTag] = useState<number[]>([1])
    const [newTagsList, setNewTagsList] = useState< ITag[]>([])

    const {addNote, getAllNotes} = useApi()
    const { setNotes, tags } = useContext(ToDoContext);

    useEffect(() => {
        setCurrentTagsList([tags])
    }, [])

    const loadTags = (index: number) => {
        if (currentTagsList[index]){
            return currentTagsList[index].map((tag, index) => (
                <Picker.Item
                    label={tag.text}
                    key={index}
                />
            ))
        }
    }

    const addToDo = async () => {
        const newDate: string = date === '' ? new Date().toString() : date
        await addNote(text, title, newDate, selectTag)
        await getAllNotes().then((res) => setNotes(res));
        await navigation.navigate('ToDo')
    }

    const addTag = () => {
        setNewTagsList(currentTagsList[currentTagsList.length - 1].filter((item) => item.text !== selectTag[selectTag.length - 1]))
    }

    const changeValue = (itemValue: string, index: number) => {
        const newSelectTag = selectTag
        newSelectTag[index] = itemValue
        setSelectTag(newSelectTag)
    }

    useEffect(() => {
        if (newTagsList.length > 1){
            setCurrentTagsList([...currentTagsList, [...newTagsList]])
            const newColTag = colTag
            newColTag.push(1)
            setColTag(newColTag)
        }
    }, [newTagsList])

    return (
        <View style={styles.container}>
            <Text style={styles.inputText}>Дата:</Text>
            <TextInput style={styles.input} value={date} onChangeText={setDate}/>
            <Text style={styles.inputText}>Заголовок:</Text>
            <TextInput style={styles.input} value={title} onChangeText={setTitle}/>
            <Text style={styles.inputText}>Текст:</Text>
            <TextInput style={styles.input} value={text} onChangeText={setText}/>
            <Text style={styles.inputText}>{colTag.length !== 0 ? 'Теги:' : ''}</Text>
            {colTag.map((item, index) => {
                return <Picker
                    style={styles.picker}
                    selectedValue={selectTag[index]}
                    key={index}
                    onValueChange={(itemValue) =>
                        changeValue(itemValue, index)
                    }>
                    {loadTags(index)}
                </Picker>
            })}
            <Button
                mode="contained"
                style={{marginTop: 20}}
                onPress={() => addTag()}
                color={'purple'}>
                Добавить тег
            </Button>
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
    inputText: {

    },
    input: {
        borderStyle: 'solid',
        borderColor: 'purple',
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginVertical: 15,
    },
    inputEnd: {
        borderStyle: 'solid',
        borderColor: 'purple',
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginVertical: 15,
        height: 200,
    },
    picker: {
        marginTop: 10,
    },
});