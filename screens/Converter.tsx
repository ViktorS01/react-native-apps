import React, {useEffect, useState} from "react";
import {View} from "../components/Themed";
import {StyleSheet, Picker, TextInput, ScrollView} from "react-native";
import {RadioButton} from "react-native-paper";
import {MonoText} from "../components/StyledText";

const initialState = {
    meters: 0,
    kilometers: 0,
    centimeters: 0,
    feet: 0,
    miles: 0,
    inches: 0,
}

export default function Converter() {
    const [value, setValue] = useState<string>('Meters')
    const [valueInput, setValueInput] = useState<string>('')
    const [state, setState] = useState(initialState)
    const languageTypes = [
            {
                userType: 'ru',
                userName: 'Русский'
            },
            {
                userType: 'eng',
                userName: 'English'
            },
        ];
    const [language, setLanguage] = useState<string>('ru')

    const loadLanguage = () => {
        return languageTypes.map(user => (
                <Picker.Item
                    label={user.userName}
                    value={user.userType}
                    key={user.userType}
                />
        ))
    }

    useEffect(() => {
        switch (value){
            case 'Meters':
                setState({
                    meters: Number(valueInput),
                    kilometers: Number(valueInput) / 1000,
                    centimeters: Number(valueInput) * 100,
                    feet: Number(valueInput) * 3.28,
                    miles: Number(valueInput) * 0.00062,
                    inches: Number(valueInput) * 39.37,
                })
                break;
            case 'Kilometers':
                setState({
                    meters: Number(valueInput) * 1000,
                    kilometers: Number(valueInput),
                    centimeters: Number(valueInput) * 100000,
                    feet: Number(valueInput) * 3280.84,
                    miles: Number(valueInput) * 0.62,
                    inches: Number(valueInput) * 39370.08,
                })
                break;
            case 'Centimeters':
                setState({
                    meters: Number(valueInput) * 0.01,
                    kilometers: Number(valueInput) * 0.00001,
                    centimeters: Number(valueInput),
                    feet: Number(valueInput) * 0.033,
                    miles: Number(valueInput) * 0.0000062,
                    inches: Number(valueInput) * 0.39,
                })
                break;
            case 'Feet':
                setState({
                    meters: Number(valueInput) * 0.3,
                    kilometers: Number(valueInput) * 0.0003,
                    centimeters: Number(valueInput) * 30.48,
                    feet: Number(valueInput),
                    miles: Number(valueInput) * 0.00019,
                    inches: Number(valueInput) * 12,
                })
                break;
            case 'Miles':
                setState({
                    meters: Number(valueInput) * 1609.34,
                    kilometers: Number(valueInput) * 1.61,
                    centimeters: Number(valueInput) * 160934.4,
                    feet: Number(valueInput) * 5280,
                    miles: Number(valueInput),
                    inches: Number(valueInput) * 63360,
                })
                break;
            case 'Inches':
                setState({
                    meters: Number(valueInput) * 0.025,
                    kilometers: Number(valueInput) * 0.000025,
                    centimeters: Number(valueInput) * 2.54,
                    feet: Number(valueInput) * 0.083,
                    miles: Number(valueInput) * 0.000016,
                    inches: Number(valueInput),
                })
                break;
        }
    }, [valueInput, value])

    return (
        <ScrollView>
            <View style={styles.main}>
                <View style={styles.top}>
                    <Picker
                        style={styles.picker}
                        selectedValue={language}
                        onValueChange={(itemValue) =>
                            setLanguage(itemValue)
                        }>
                        {loadLanguage()}
                    </Picker>
                </View>
                <View style={styles.container}>
                    <View>
                        <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
                            <RadioButton.Item
                                label={language === 'ru' ? 'Метры' : 'Meters'}
                                value="Meters"
                                color={'purple'}
                            />
                            <RadioButton.Item
                                label={language === 'ru' ? 'Километры' : 'Kilometers'}
                                value="Kilometers"
                                color={'purple'}
                            />
                            <RadioButton.Item
                                label={language === 'ru' ? 'Сантиметры' : 'Centimeters'}
                                value="Centimeters"
                                color={'purple'}
                            />
                            <RadioButton.Item
                                label={language === 'ru' ? 'Футы' : 'Feet'}
                                value="Feet"
                                color={'purple'}
                            />
                            <RadioButton.Item
                                label={language === 'ru' ? 'Мили' : 'Miles'}
                                value="Miles"
                                color={'purple'}
                            />
                            <RadioButton.Item
                                label={language === 'ru' ? 'Дюймы' : 'Inches'}
                                value="Inches"
                                color={'purple'}
                            />
                        </RadioButton.Group>
                    </View>
                    <TextInput value={valueInput} style={styles.input} onChangeText={setValueInput} />
                    <View style={styles.output}>
                        <View style={styles.item}>
                            <MonoText>{state.meters}</MonoText>
                            <MonoText>{language === 'ru' ? 'метры' : 'meters'}</MonoText>
                        </View>
                        <View style={styles.item}>
                            <MonoText>{state.centimeters}</MonoText>
                            <MonoText>{language === 'ru' ? 'сантиметры' : 'centimeters'}</MonoText>
                        </View>
                        <View style={styles.item}>
                            <MonoText>{state.miles}</MonoText>
                            <MonoText>{language === 'ru' ? 'мили' : 'miles'}</MonoText>
                        </View>
                        <View style={styles.item}>
                            <MonoText>{state.kilometers}</MonoText>
                            <MonoText>{language === 'ru' ? 'километры' : 'kilometers'}</MonoText>
                        </View>
                        <View style={styles.item}>
                            <MonoText>{state.feet}</MonoText>
                            <MonoText>{language === 'ru' ? 'футы' : 'feet'}</MonoText>
                        </View>
                        <View style={styles.item}>
                            <MonoText>{state.inches}</MonoText>
                            <MonoText>{language === 'ru' ? 'дюймы' : 'inches'}</MonoText>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 40,
    },
    picker: {
        width: '80%',
    },
    top: {
        display: 'flex',
        alignItems: 'center',
    },
    input: {
      fontSize: 16,
      paddingHorizontal: 5,
      marginHorizontal: 15,
      borderStyle: 'solid',
      borderColor: 'purple',
      borderWidth: 1,
      marginVertical: 20,
    },
    output: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    item: {
        width: '50%',
        fontSize: 20,
        paddingHorizontal: 15,
        marginTop: 25,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: "wrap",
    },
    main: {
        paddingVertical: 63,
        display: "flex",
        flex: 1,
    }
});
