import {StyleSheet, TextInput} from 'react-native';
import React, {useState} from "react";
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { RadioButton, Button } from 'react-native-paper';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [value, setValue] = useState<string>('male')
  const [name, setName] = useState<string>('')
  const [age, setAge] = useState<string>('')

  const checkInputs = () => {
    if (name.trim() === ''){
      alert('Введите имя! \n')
      return
    }
    if (age.trim() === ''){
      alert('Введите ваш возраст! \n')
      return
    }
    if (5 >= Number(age) || 100 <= Number(age)){
      alert('Ваш возраст должен быть в диапазоне от 5 до 100! \n')
      return;
    } else {
        navigation.navigate('TabTwo', {name: name, age: age, gender: value})
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Здравствуйте</Text>
      <Text style={styles.inputText}>Введите ваше имя:</Text>
      <TextInput style={styles.input} value={name}
                 onChangeText={setName}/>
      <Text style={styles.inputText}>Введите ваш возраст:</Text>
      <TextInput style={styles.input} value={age} onChangeText={setAge}/>

      <Text style={styles.inputText}>Выберите пол: </Text>
      <View style={{borderRadius: 10, marginTop: 15, marginHorizontal: 10}}>
        <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
          <RadioButton.Item label="Мужской" value="male" color={'purple'}/>
          <RadioButton.Item label="Женский" value="female" color={'purple'}/>
        </RadioButton.Group>
        <Button mode="contained" style={{marginVertical: 15, marginHorizontal: 15, borderRadius: 10, backgroundColor: "purple"}}
                onPress={() => checkInputs()}>
          Войти
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontWeight: 'bold',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
  },
  inputText: {
    marginLeft: 10,
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
  }
});
