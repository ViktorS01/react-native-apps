import {useEffect, useState} from 'react';
import {
    NativeSyntheticEvent,
    Pressable,
    StyleSheet,
    TextInput,
    TextInputChangeEventData
} from 'react-native';
import { Button } from 'react-native-paper';
import {ExampleControlledTriangle} from "../components/ExampleControlledTriangle";
import { Text, View } from '../components/Themed';

interface IFigureData {
    width: number,
    height: number,
    marginLeft: number,
    marginTop: number,
    borderRadius: number,
    backgroundColor: string,
    borderWidth: number,
    borderColor: string,
    deg: number,
}

const SQUARE = 'SQUARE',
    CIRCLE = 'CIRCLE',
    LINE = 'LINE';

export default function GraphicsEditorScreen() {
    const [locationStart, setLocationStart] = useState({ x: 0, y: 0 }),
        [locationEnd, setLocationEnd] = useState({ x: 0, y: 0 }),
        [figuresData, setFiguresData] = useState<Array<IFigureData | null>>([]),
        [currentFigure, setCurrentFigure] = useState(''),
        [currentCoords, setCurrentCoords] = useState(`${Math.floor(locationStart.x)};${Math.floor(locationStart.y)}`),
        [currentSize, setCurrentSize] = useState(`${Math.floor(locationEnd.x)};${Math.floor(locationEnd.y)}`),
        [currentFigureId, setCurrentFigureId] = useState(0),
        [isConfirmData, setIsConfirmData] = useState(false);

        const [isPickerLine, setIsPickerLine] = useState<boolean>(false)
        const [isPickerBackground, setIsPickerBackground] = useState<boolean>(false)

        const [colorLine, setColorLine] = useState<string>('#757575')
        const [colorBackground, setColorBackground] = useState<string>('transparent')
        const [prevColorLine, setPrevColorLine] = useState<string>('#757575')
        const [prevColorBackground, setPrevColorBackground] = useState<string>('transparent')
        const [sizeLine, setSizeLine] = useState<string>('2')

    useEffect(() => {setIsConfirmData(false)}, [isConfirmData])

    function writeFigureData(endX: number, endY: number): IFigureData | null {
        switch(currentFigure) {
            case SQUARE:
                return writeSquareData(endX, endY)
            case CIRCLE:
                return writeCircleData(endX, endY)
            case LINE:
                return writeLineData(endX, endY)
            default:
                return null;
        }
    }

    function writeSquareData(endX: number, endY: number): IFigureData {
        return {
            width: endX - locationStart.x > 0 ?
                endX - locationStart.x : locationStart.x - endX,
            height: endY - locationStart.y > 0 ?
                endY - locationStart.y : locationStart.y - endY,
            marginLeft: endX - locationStart.x > 0 ?
                locationStart.x : endX,
            marginTop: endY - locationStart.y > 0 ?
                locationStart.y : endY,
            borderRadius: 0,
            backgroundColor: colorBackground,
            borderColor: colorLine,
            borderWidth: +sizeLine,
            deg: 0,
        }
    }

    function writeCircleData(endX: number, endY: number): IFigureData {
        return {
            width: Math.round(Math.sqrt(Math.pow(endX - locationStart.x, 2) + Math.pow(endY - locationStart.y, 2))),
            height: Math.round(Math.sqrt(Math.pow(endX - locationStart.x, 2) + Math.pow(endY - locationStart.y, 2))),
            marginLeft: endX - locationStart.x > 0 ?
                locationStart.x : endX,
            marginTop: endY - locationStart.y > 0 ?
                locationStart.y : endY,
            borderRadius: 9999,
            backgroundColor: colorBackground,
            borderColor: colorLine,
            borderWidth: +sizeLine,
            deg: 0,
        }
    }

    function writeLineData(endX: number, endY: number): IFigureData {
        return {
            width: endX - locationStart.x > 0 ?
                endX - locationStart.x : locationStart.x - endX,
            height: 1,
            marginLeft: endX - locationStart.x > 0 ?
                locationStart.x : endX,
            marginTop: endY - locationStart.y > 0 ?
                locationStart.y : endY,
            borderRadius: 0,
            backgroundColor: colorBackground,
            borderColor: colorLine,
            borderWidth: +sizeLine,
            deg: Math.atan2(locationStart.y-endY,locationStart.x-endX),
        }
    }

    function drawFigures(): Array<JSX.Element | null> {
        return figuresData.map((value, i) => {
            if(value) {
                return (
                    <View
                        key={`figure-${i}`}
                        style={{
                            position: 'absolute',
                            backgroundColor: value.backgroundColor,
                            borderRadius: value.borderRadius,
                            width: value.width,
                            height: value.height,
                            marginLeft: value.marginLeft,
                            marginTop: value.marginTop,
                            borderWidth: value.borderWidth,
                            borderColor: value.borderColor,
                            transform: [{ rotateZ: `${value.deg}rad` }],
                        }}
                        onTouchEnd={() => {
                            setCurrentFigureId(i)
                            setColorLine(`${value.borderColor}`)
                            setSizeLine(`${value.borderWidth}`)
                            setColorBackground(`${value.backgroundColor}`)
                            setCurrentSize(`${Math.floor(value.width)};${Math.floor(value.height)}`)
                            setCurrentCoords(`${Math.floor(value.marginLeft)};${Math.floor(value.marginTop)}`)
                        }}
                    />
                )
            } else return null})
    }

    function clearBoard() {
        setFiguresData([])
        setCurrentFigureId(0)
        setColorLine('#757575')
        setColorBackground('transparent')
        setCurrentSize(`0;0`)
        setCurrentCoords(`0;0`)
    }

    function confirmFigureData() {
        figuresData[currentFigureId]!.backgroundColor = colorBackground
        figuresData[currentFigureId]!.borderColor = colorLine
        figuresData[currentFigureId]!.borderWidth = +sizeLine
        figuresData[currentFigureId]!.marginLeft = +currentCoords.split(';')[0]
        figuresData[currentFigureId]!.marginTop = +currentCoords.split(';')[1]
        figuresData[currentFigureId]!.height = +currentSize.split(';')[1]
        figuresData[currentFigureId]!.width = +currentSize.split(';')[0]
        setIsConfirmData(true)
    }

    return (
        !isPickerLine && !isPickerBackground ? <View style={ styles.container }>
            <View style={styles.rowContainer}>
                <View style={{width: '40%'}}>
                    <Pressable onPress={() => {
                        setIsPickerBackground(!isPickerBackground)
                        setPrevColorBackground(colorBackground)
                    }}>
                        <View style={styles.colorBar}>
                            <Text style={styles.topBarText}>Сменить цвет заливки</Text>
                            <View style={{backgroundColor: `${colorBackground}`, width: 17, height: 17, borderRadius: 15, marginLeft: 15, borderColor: 'black', borderWidth: 1}}/>
                        </View>
                    </Pressable>
                    <Pressable onPress={() => {
                        setIsPickerLine(!isPickerLine)
                        setPrevColorLine(colorLine)
                    }}>
                        <View style={styles.colorBar}>
                            <Text style={styles.topBarText}>Сменить цвет линии</Text>
                            <View style={{backgroundColor: `${colorLine}`, width: 17, height: 17, borderRadius: 15, marginLeft: 15, borderColor: 'black', borderWidth: 1}}/>
                        </View>
                    </Pressable>
                    <View style={ styles.rowContainer }>
                        <Text style={styles.text}>Толщина линии</Text>
                        <TextInput
                            style={ styles.input }
                            placeholder="Толщина"
                            value={ sizeLine }
                            onChange={(text: NativeSyntheticEvent<TextInputChangeEventData>) => setSizeLine(text.nativeEvent.text.trim())}
                        />
                    </View>
                </View>
                <View style={{width: '30%'}}>
                    <View style={ styles.columnContainer }>
                        <Text style={ styles.text }>Координаты</Text>
                        <TextInput
                            style={ styles.input }
                            placeholder="Координаты"
                            value={ currentCoords }
                            onChange={(text: NativeSyntheticEvent<TextInputChangeEventData>) => setCurrentCoords(text.nativeEvent.text.trim())}
                        />
                    </View>
                    <View style={ styles.columnContainer }>
                        <Text style={ styles.text }>Размер</Text>
                        <TextInput
                            style={ styles.input }
                            placeholder="Размер"
                            value={ currentSize }
                            onChange={(text: NativeSyntheticEvent<TextInputChangeEventData>) => setCurrentSize(text.nativeEvent.text.trim())}
                        />
                    </View>
                </View>
            </View>
                <View style={styles.board}
                      onTouchStart={(e) => {
                          setLocationStart({ x: e.nativeEvent.locationX, y: e.nativeEvent.locationY });
                      }}
                      onTouchEnd={(e) => {
                          setLocationEnd({ x: e.nativeEvent.locationX, y: e.nativeEvent.locationY });
                          figuresData.push(writeFigureData(e.nativeEvent.locationX, e.nativeEvent.locationY));
                          setCurrentFigure('');
                      }}>

                    { drawFigures() }

                </View>

            <View style={ styles.rowContainer }>
                <Button onPress={() => setCurrentFigure(SQUARE)}
                        style={ currentFigure === SQUARE ? styles.figureButtonActive : styles.figureButton }
                >
                    <Text style={ styles.figureButtonText }>□</Text>
                </Button>
                <Button onPress={() => setCurrentFigure(CIRCLE)}
                        style={ currentFigure === CIRCLE ? styles.figureButtonActive : styles.figureButton }
                >
                    <Text style={ styles.figureButtonText }>○</Text>
                </Button>
                <Button onPress={() => setCurrentFigure(LINE)}
                        style={ currentFigure === LINE ? styles.figureButtonActive : styles.figureButton }
                >
                    <Text style={ styles.figureButtonText }>-</Text>
                </Button>
            </View>

            <View style={ styles.rowContainer }>
                <Button onPress={confirmFigureData} style={ styles.buttonConfirm } >
                    <Text style={{ fontSize: 10, color: '#fff' }}>Принять изменения</Text>
                </Button>
                <Button onPress={clearBoard} style={ styles.buttonDelete } >
                    <Text style={{ fontSize: 10, color: '#fff' }}>Очистить поле</Text>
                </Button>
            </View>
        </View> :
            isPickerLine ?
            <ExampleControlledTriangle
                handleVisible={setIsPickerLine}
                visible={isPickerLine}
                setColor={setColorLine}
                prevColor={prevColorLine}
            /> :
                <ExampleControlledTriangle
                    handleVisible={setIsPickerBackground}
                    visible={isPickerBackground}
                    setColor={setColorBackground}
                    prevColor={prevColorBackground}
                />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
    },
    columnContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: "flex-start",
    },
    topBarText: {
        fontSize: 12,
        color: 'white',
    },
    text: {
        fontSize: 15,
        color: 'purple',
        marginRight: 4,
    },
    board: {
        borderWidth: 1,
        borderColor: 'purple',
        flex: 1,
        overflow: 'hidden',
        marginTop: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: '500',
        padding: 10,
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    input: {
        height: 30,
        borderWidth: 1,
        width: 85,
        borderColor: 'purple',
        borderRadius: 5,
        padding: 7,
        marginTop: 4,
    },
    button: {
        marginTop: 10,
        backgroundColor: '#757575',
    },
    buttonConfirm: {
        marginTop: 10,
        backgroundColor: 'green',
    },
    buttonDelete: {
        marginTop: 10,
        backgroundColor: '#d10000',
    },
    figureButtonText: {
        fontSize: 40,
        color: '#fff'
    },
    figureButton: {
        marginTop: 10,
        width: 100,
        backgroundColor: 'purple',
    },
    figureButtonActive: {
        marginTop: 10,
        width: 100,
        backgroundColor: 'red',
    },
    hidden: {
        display: 'none',
    },
    error: {
        paddingTop: 10,
        color: 'red',
    },
    colorBar: {
        display: "flex",
        flexDirection: "row",
        borderWidth: 2,
        borderColor: 'purple',
        backgroundColor: 'purple',
        width: 210,
        height: 40,
        borderRadius: 50,
        marginBottom: 5,
        alignItems: "center",
        justifyContent: "space-around"
    }
});