import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import {createContext, useEffect, useState} from "react";
import {ITag, IToDoItem, OrganizerContextType} from "./models";
import {useApi} from "./api";

export const ToDoContext = createContext<OrganizerContextType>(
    {} as OrganizerContextType
);

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [tags, setTags] = useState<ITag[]>([]);
  const [notes, setNotes] = useState<IToDoItem[]>([]);
  const { getAllTags, getAllNotes } = useApi();

  useEffect(() => {
      getAllTags().then((res) => setTags(res));
      getAllNotes().then((res) => setNotes(res));
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ToDoContext.Provider value={{tags, notes, setNotes, setTags}}>
          <Navigation colorScheme={colorScheme} />
        </ToDoContext.Provider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
