import {StyleSheet, ImageBackground, TextInput} from 'react-native';
import { Text, View } from '../components/Themed';
import React, {FC, useState} from "react";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootTabParamList} from "../types";
import {Button} from "react-native-paper";
const staticImage1 = require("../assets/images/11.jpg");
const staticImage2 = require("../assets/images/22.webp");
const staticImage3 = require("../assets/images/33.jpg");

const arrayImg = [
    {
        id: 1,
        image: staticImage1,
    },
    {
        id: 2,
        image: staticImage2,
    },
    {
        id: 3,
        image: staticImage3,
    }
]

const TabTwoScreen:FC<NativeStackScreenProps<RootTabParamList, 'TabTwo'>> = ({route, navigation}) => {
  const [name, setName] = useState<string>(route.params.name);
  const [nameVisible, setNameVisible] = useState(false);
  const [img, setImg] = useState(arrayImg[0])

  const nextImage = () => {
      switch(img.id){
          case 1:
              setImg(arrayImg[1])
              break;
          case 2:
              setImg(arrayImg[2])
              break;
          case 3:
              setImg(arrayImg[0])
              break;
      }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Здравствуйте, {name}!</Text>
      <ImageBackground source={img.image} style={styles.ImageBackground} />
      <View style={styles.buttons}>
          <Button mode="contained" style={styles.button}
                  onPress={() => nextImage()}>
            Сменить фон
          </Button>
          <Button mode="contained" style={styles.button}
                  onPress={() => setNameVisible(!nameVisible)}>
            Изменить имя
          </Button>
          {nameVisible && <TextInput style={styles.input} value={name} onChangeText={setName}/>}
          <Button mode="contained" style={styles.button}
                  onPress={() => navigation.navigate('TabTree')}>
            Перейти
          </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  ImageBackground: {
    width: 250,
    height: 330,
    marginTop: 10,
  },
  button: {
      marginVertical: 10,
      marginHorizontal: 10,
      borderRadius: 10,
      width: '90%',
  },
  buttons: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 20,
  },
  input: {
        borderRadius: 10,
        borderStyle: 'solid',
        borderColor: 'purple',
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        marginVertical: 15,
  },
});

export default TabTwoScreen