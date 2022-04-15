import React, {FC, useContext} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {MonoText} from "./StyledText";
import {useApi} from "../api";
import {ToDoContext} from "../App";

interface IToDoItem{
    date: string
    title: string
    text: string
    tag: string
    id: number
}

export const ToDoItem:FC <IToDoItem> = ({date, title, text, tag, id}) => {
    const {deleteNote, getAllNotes} = useApi()
    const { setNotes } = useContext(ToDoContext);

    const deleteItem = async () => {
        await deleteNote(id)
        await getAllNotes().then((res) => setNotes(res));
    }

    return (
        <View style={styles.todo}>
            <MonoText>Дата: {date}</MonoText>
            <MonoText style={{fontWeight: "bold"}}>{title}</MonoText>
            <MonoText>{text}</MonoText>
            <MonoText>Теги: <MonoText style={{fontStyle: "italic"}}>{tag}</MonoText></MonoText>
            <Pressable style={styles.close} onPress={() => deleteItem()}>
                <View><MonoText style={{color: 'purple', fontSize: 20, fontWeight: 'bold'}}>x</MonoText></View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container:  {
        padding: 20,
    },
    display:    {
        fontSize: 70,
        color: "black",
        textAlign: "right",
    },
    todo: {
        borderColor: 'purple',
        borderWidth: 1,
        width: '100%',
        fontSize: 17,
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 10,
        marginBottom: 10,
        position: 'relative',
    },
    close: {
        position: 'absolute',
        right: 15,
        top: 0,
    },
})