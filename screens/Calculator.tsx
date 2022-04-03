import React from "react";
import {View} from "../components/Themed";
import {ImageBackground, Pressable, SafeAreaView, StyleSheet, TouchableOpacity} from "react-native";
import {CalcButton} from "../components/CalcButton";
import {CalcDisplay} from "../components/CalcDisplay";
import calculator, { initialState } from "../utils/calculator";

export interface IState {
    currentValue: string
    operator: string | null
    previousValue: string | null
}

export default class Calculator extends React.Component {
    staticImage1 = require("../assets/images/delete.png");
    state = initialState

    handleTap = (type: string, value?: string) => {
        this.setState(state => calculator(type, value, state));
    };

    render () {
        return (
            <SafeAreaView style={styles.container}>

                <View style={{flex: 1, justifyContent: "flex-end"}}>
                    <CalcDisplay display={parseFloat(this.state.currentValue).toLocaleString()}/>
                </View>

                <View style={{display: 'flex', alignItems: 'flex-end', paddingRight: 25, paddingVertical: 25}}>
                    <Pressable onPress={() => this.handleTap("clear")}>
                        <ImageBackground source={this.staticImage1} style={styles.img}/>
                    </Pressable>
                </View>

                <View style={styles.buttons}>

                    <View style={{flexDirection: "row", justifyContent: "space-between",}}>

                        <TouchableOpacity onPress={() => this.handleTap("clear")}>
                            <CalcButton title={'C'} color={'red'} backgroundColor={'#dae0db'}/>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.handleTap("percentage")}>
                            <CalcButton title={'%'} color={'green'} backgroundColor={'#dae0db'}/>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.handleTap("operator", "/")}>
                            <CalcButton title={'/'} color={'green'} backgroundColor={'#dae0db'}/>
                        </TouchableOpacity>
                    </View>

                    <View style={{flexDirection: "row", justifyContent: "space-between",}}>
                        <TouchableOpacity onPress={() => this.handleTap("number", '7')}>
                            <CalcButton title={'7'} color={'black'} backgroundColor={'#dae0db'}/>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.handleTap("number", '8')}>
                            <CalcButton title={'8'} color={'black'} backgroundColor={'#dae0db'}/>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.handleTap("number", '9')}>
                            <CalcButton title={'9'} color={'black'} backgroundColor={'#dae0db'}/>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.handleTap("operator", "*")}>
                            <CalcButton title={'x'} color={'green'} backgroundColor={'#dae0db'}/>
                        </TouchableOpacity>
                    </View>

                    <View style={{flexDirection: "row", justifyContent: "space-between",}}>
                        <TouchableOpacity onPress={() => this.handleTap("number", '4')}>
                            <CalcButton title={'4'} color={'black'} backgroundColor={'#dae0db'}/>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.handleTap("number", '5')}>
                            <CalcButton title={'5'} color={'black'} backgroundColor={'#dae0db'}/>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.handleTap("number", '6')}>
                            <CalcButton title={'6'} color={'black'} backgroundColor={'#dae0db'}/>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.handleTap("operator", "-")}>
                            <CalcButton title={'-'} color={'green'} backgroundColor={'#dae0db'}/>
                        </TouchableOpacity>
                    </View>

                    <View style={{flexDirection: "row", justifyContent: "space-between",}}>
                        <TouchableOpacity onPress={() => this.handleTap("number", '1')}>
                            <CalcButton title={'1'} color={'black'} backgroundColor={'#dae0db'}/>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.handleTap("number", '2')}>
                            <CalcButton title={'2'} color={'black'} backgroundColor={'#dae0db'}/>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.handleTap("number", '3')}>
                            <CalcButton title={'3'} color={'black'} backgroundColor={'#dae0db'}/>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.handleTap("operator", "+")}>
                            <CalcButton title={'+'} color={'green'} backgroundColor={'#dae0db'}/>
                        </TouchableOpacity>

                    </View>

                    <View style={{flexDirection: "row", justifyContent: "space-between",}}>
                        <TouchableOpacity onPress={() => this.handleTap("posneg")}>
                            <CalcButton title={'+/-'} color={'black'} backgroundColor={'#dae0db'}/>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.handleTap("number", '0')}>
                            <CalcButton title={'0'} color={'black'} backgroundColor={'#dae0db'}/>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.handleTap("number", ".")}>
                            <CalcButton title={','} color={'black'} backgroundColor={'#dae0db'}/>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.handleTap("equal")}>
                            <CalcButton title={'='} color={'green'} backgroundColor={'#dae0db'}/>
                        </TouchableOpacity>
                    </View>
                </View>

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
    },
    buttons: {
        paddingHorizontal: 30,
        paddingVertical: 10,
    },
    img:{
        width: 24,
        height: 24,
    }
});
