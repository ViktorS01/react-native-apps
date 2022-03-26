import {RootTabScreenProps} from "../types";
import React from "react";
import {View} from "../components/Themed";
import {StyleSheet} from "react-native";

export default function Calculator({ navigation }: RootTabScreenProps<'Calculator'>) {

    return (
        <View style={styles.container}>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
});
