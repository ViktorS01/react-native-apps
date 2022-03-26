import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import {FontAwesome} from "@expo/vector-icons";
import * as React from "react";
import {useState} from "react";
import {RootTabScreenProps} from "../types";

export default function ModalScreen({ navigation }: RootTabScreenProps<'Menu'>) {
    const [active, setActive] = useState<'auth' | 'calculator' | 'converter' | 'to-do' | 'draw'>(
        'auth'
    )

    const goToPage = (page: 'auth' | 'calculator' | 'converter' | 'to-do' | 'draw') => {
        setActive(`${page}`);
        switch (page){
            case 'auth':
                navigation.navigate('TabOne');
                break;
            case 'calculator':
                navigation.navigate('Calculator');
                break;
            case 'converter':
                navigation.navigate('Converter');
                break;
            case 'to-do':
                navigation.navigate('ToDo');
                break;
            case 'draw':
                navigation.navigate('Draw');
                break;
        }
    }

  return (
    <View style={styles.container}>
        <View style={styles.block}>
            <FontAwesome
                name="sign-in"
                size={30}
                style={{color: active === 'auth' ? 'purple' : 'black'}}
            />
            <Text style={{fontWeight: 'bold', fontSize: 25, color: active === 'auth' ? 'purple' : 'black'}}
                  onPress={() => goToPage('auth') }>
                Авторизация
            </Text>
        </View>
      <View style={styles.block}>
          <FontAwesome
              name="calculator"
              size={30}
              style={{color: active === 'calculator' ? 'purple' : 'black'}}
          />
          <Text style={{fontWeight: 'bold', fontSize: 25, color: active === 'calculator' ? 'purple' : 'black'}}
                onPress={() => goToPage('calculator') }>
              Калькулятор
          </Text>
      </View>
        <View style={styles.block}>
            <FontAwesome
                name="edit"
                size={30}
                style={{color: active === 'converter' ? 'purple' : 'black'}}
            />
            <Text style={{fontWeight: 'bold', fontSize: 25, color: active === 'converter' ? 'purple' : 'black'}}
                  onPress={() => goToPage('converter') }>
                Конвертер
            </Text>
        </View>
        <View style={styles.block}>
            <FontAwesome
                name="check"
                size={30}
                style={{color: active === 'to-do' ? 'purple' : 'black'}}
            />
            <Text style={{fontWeight: 'bold', fontSize: 25, color: active === 'to-do' ? 'purple' : 'black'}}
                  onPress={() => goToPage('to-do') }>
                Заметки
            </Text>
        </View>
        <View style={styles.block}>
            <FontAwesome
                name="eye"
                size={30}
                style={{color: active === 'draw' ? 'purple' : 'black'}}
            />
            <Text style={{fontWeight: 'bold', fontSize: 25, color: active === 'draw' ? 'purple' : 'black'}}
                  onPress={() => goToPage('draw') }>
                Рисовалка
            </Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      height: '100%',
      paddingHorizontal: 30,
      paddingVertical: 20,
      display: 'flex',
      alignItems: "center",
      justifyContent: "center",
      color: 'purple',
  },
  block: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '70%',
      paddingVertical: 20,
  },
});
