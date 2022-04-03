import React, {FC} from 'react';
import { StyleSheet, View, Text }from 'react-native';

interface ICalcDisplay{
    display: string
}

export const CalcDisplay:FC <ICalcDisplay> = ({display}) => {

        return (
            <View style={styles.container}>
                <Text style={styles.display}>{display}</Text>
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
})