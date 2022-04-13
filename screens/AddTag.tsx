import React, {useState} from "react";
import {Text, View} from "../components/Themed";
import {StyleSheet, TextInput} from "react-native";
import {Button} from "react-native-paper";
import axios from "axios";
import {RootTabScreenProps} from "../types";

export default function AddTag({ navigation }: RootTabScreenProps<'AddTag'>) {
    const [newTag, setNewTag] = useState<string>('')

    const click = () => {
        axios.post('http://192.168.84.178:8000/api/tag', {text: newTag})
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err.data))
        navigation.navigate('Tags')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.inputText}>Новый тег:</Text>
            <TextInput style={styles.input} value={newTag} onChangeText={setNewTag}/>
            <Button
                mode="contained"
                style={{marginTop: 10}}
                onPress={() => click()}
                color={'purple'}>
                Добавить
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
    },
    inputText: {
        fontSize: 16,
    },
    input: {
        borderStyle: 'solid',
        borderColor: 'purple',
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginVertical: 15,
    },
});
