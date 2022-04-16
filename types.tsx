import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Menu: undefined;
  NotFound: undefined;
  Calculator: undefined;
  Converter: undefined;
  AddToDo: undefined;
  Tags: undefined;
  AddTag: undefined;
  EditToDo: {id: number};
  ToDo: undefined;
  Draw: undefined;
  TabTwo: {name: string, gender: string, age: string};
  TabTree: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  TabOne: undefined;
  Menu: undefined;
  TabTwo: {name: string, gender: string, age: string};
  PersonalToDo: undefined,
  AddToDo: undefined,
  TabTree: undefined;
  AddTag: undefined;
  EditToDo: {id: number};
  Tags: undefined;
  ToDo: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
