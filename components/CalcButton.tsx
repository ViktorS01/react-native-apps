import React, {FC} from 'react';
import { StyleSheet, View, Text } from 'react-native';

export const CalcButton: FC<{title: string, color: string, backgroundColor?: string}> = ({title, color, backgroundColor}) => {
        return (
            <View style={[styles.container, {backgroundColor: backgroundColor}]}>
                <Text style={[styles.text, {color: color}]}>{title}</Text>
            </View>
        );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        margin: 10,
        borderRadius: 100,
        backgroundColor: '#dae0db',
        width: 50,
        height: 50,
    },
    text: {
        fontSize: 25,
    },
});