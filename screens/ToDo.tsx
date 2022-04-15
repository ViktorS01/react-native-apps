import React, {useContext} from "react";
import {View} from "../components/Themed";
import {ScrollView, StyleSheet} from "react-native";
import { Button } from 'react-native-paper'
import {RootTabScreenProps} from "../types";
import {ToDoItem} from "../components/ToDoItem";
import {ToDoContext} from "../App";


export default function ToDo({ navigation }: RootTabScreenProps<'ToDo'>) {
    const toDo = useContext(ToDoContext);

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Button
                    icon="plus"
                    mode="contained"
                    color={'purple'}
                    onPress={() => navigation.navigate('AddToDo')}
                    style={{width: 220}}>
                    Добавить заметку
                </Button>
                <Button
                    icon="cloud-tags"
                    mode="contained"
                    color={'purple'}
                    onPress={() => navigation.navigate('Tags')}
                    style={{width: 100}}>
                    Теги
                </Button>
            </View>
            <ScrollView style={styles.main}>
                {toDo.notes.map((item, index) => {
                    return <ToDoItem date={item.date} title={item.title} text={item.text} tag={item.tag} key={index} id={item.id} />
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        paddingHorizontal: 15,
        paddingVertical: 20,
    },
    top: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
    },
    main: {
        marginVertical: 20,
    },
});
