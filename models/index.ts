import {Dispatch, SetStateAction} from "react";

export interface IToDoItem {
    id: number
    title: string
    text: string
    date: string
    tag: string
}

export interface ITag{
    id: number
    text: string
}

export type OrganizerContextType = {
    tags: ITag[];
    setTags: Dispatch<SetStateAction<ITag[]>>;
    notes: IToDoItem[];
    setNotes: Dispatch<SetStateAction<IToDoItem[]>>;
};