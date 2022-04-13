import React, {FC} from 'react';
import { StyleSheet, View }from 'react-native';
import {MonoText} from "./StyledText";

interface IToDoItem{
    date: string
    title: string
    text: string
    tag: string
}

export const ToDoItem:FC <IToDoItem> = ({date, title, text, tag}) => {

    return (
        <View style={styles.todo}>
            <MonoText>Дата: {date}</MonoText>
            <MonoText><strong>{title}</strong></MonoText>
            <MonoText>{text}</MonoText>
            <MonoText>Теги: <em>{tag}</em></MonoText>
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
    },
})