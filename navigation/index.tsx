import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import TabTreeScreen from '../screens/TabTreeScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import Calculator from "../screens/Calculator";
import ToDo from "../screens/ToDo";
import Converter from "../screens/Converter";
import Draw from "../screens/Draw";
import AddToDo from "../screens/AddToDo";
import Tags from "../screens/Tags";
import AddTag from "../screens/AddTag";
import EditToDo from "../screens/EditToDo";


export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="Menu" component={ModalScreen} />
      <Stack.Screen name="Calculator" component={Calculator} options={{title: 'Калькулятор',}}/>
      <Stack.Screen name="Converter" component={Converter} options={{title: 'Конвертер',}}/>
      <Stack.Screen name="Draw" component={Draw} options={{title: 'Рисовалка',}}/>
      <Stack.Screen name="ToDo" component={ToDo} options={{title: 'Заметки',}}/>
      <Stack.Screen name="AddToDo" component={AddToDo} options={{title: 'Добавение заметки',}}/>
      <Stack.Screen name="EditToDo" component={EditToDo} options={{title: 'Изменение заметки',}}/>
      <Stack.Screen name="AddTag" component={AddTag} options={{title: 'Добавение тега',}}/>
      <Stack.Screen name="Tags" component={Tags} options={{title: 'Теги',}}/>
      <Stack.Screen name="TabTwo" component={TabTwoScreen}
            options={{
                title: 'Главный экран'
            }}
      />
      <Stack.Screen name="TabTree" component={TabTreeScreen}
            options={{
                title: 'Статьи',
            }}
        />
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          title: 'Авторизация',
          tabBarIcon: ({ color }) => <TabBarIcon name="sign-in" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Menu')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
