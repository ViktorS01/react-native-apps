import React from 'react'
import {View, Text, Pressable} from 'react-native'
import { TriangleColorPicker, toHsv, fromHsv } from 'react-native-color-picker'
import Slider from '@react-native-community/slider';

export class ExampleControlledTriangle extends React.Component {

    constructor(...args) {
        super(...args)
        this.state = { color: toHsv('green') }
        this.onColorChange = this.onColorChange.bind(this)
    }

    onColorChange(color) {
        this.setState({ color })
        this.props.setColor(fromHsv(this.state.color))
    }

    changeColor() {
        this.props.handleVisible(!this.props.visible)
    }

    render() {
        return (
            <View style={{flex: 1, padding: 45, backgroundColor: '#212021'}}>
                <Pressable onPress={() => this.changeColor()}>
                    <Text style={{color: 'white'}}>Сохранить изменения</Text>
                </Pressable>
                <TriangleColorPicker
                    oldColor={this.props.prevColor}
                    color={this.state.color}
                    onColorChange={this.onColorChange}
                    onColorSelected={color => this.props.setColor(`${color}`)}
                    onOldColorSelected={color => alert(`Old color selected: ${color}`)}
                    sliderComponent={
                    <Slider
                        style={{width: 200, height: 40}}
                        minimumValue={0}
                        maximumValue={1}
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="#000000"
                    />}
                    style={{flex: 1}}
                />
            </View>
        )
    }

}
