import {Picker, StyleSheet} from "react-native";
import React, {FC, useEffect, useState} from "react";
import {ITag} from "../models";

export const PickerTags:FC<{newTags: ITag[]}> = ({newTags}) => {
    const [selectTag, setSelectTag] = useState<string>()
    const [currentTagsList, setCurrentTagsList] = useState<ITag[][]>([])
    const [colTag, setColTag] = useState<number[]>([1])
    const [newTagsList, setNewTagsList] = useState< ITag[]>([])

    const loadTags = () => {
        if (newTags){
            return newTags.map((tag, index) => (
                <Picker.Item
                    label={tag.text}
                    key={index}
                />
            ))
        }
    }

    // const addTag = () => {
    //     setNewTagsList(currentTagsList[currentTagsList.length - 1].filter((item) => item.text !== selectTag[selectTag.length - 1]))
    //     // setCurrentTagsList()
    // }

    useEffect(() => {
        if (newTagsList.length > 1){
            setCurrentTagsList([...currentTagsList, [...newTagsList]])
            const newColTag = colTag
            newColTag.push(1)
            setColTag(newColTag)
        }
    }, [newTagsList])

    return (
        <>
            <Picker
                style={styles.picker}
                selectedValue={selectTag}
                onValueChange={(itemValue) =>
                    setSelectTag(itemValue)
                }>
                {loadTags()}
            </Picker>
    </>
    )

}

const styles = StyleSheet.create({
    picker: {
        marginTop: 10,
    },
});