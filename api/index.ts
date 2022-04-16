import axios from "axios";

export const useApi = () => {
    const getAllNotes = () => {
        return axios.get('http://192.168.84.178:8000/api/notes')
            .then((res) => {return res.data.data})
            .catch((err) => console.log(err.data))
    };

    const getAllTags = () => {
        return  axios.get('http://192.168.84.178:8000/api/tags')
            .then((res) => {return [...res.data.data]})
            .catch((err) => console.log(err.data))
    }

    const deleteNote = (id: number) => {
        return axios.delete(`http://192.168.84.178:8000/api/note/${id}`)
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err.data))
    }

    const deleteTag = (id: number) => {
        return axios.delete(`http://192.168.84.178:8000/api/tag/${id}`)
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err.data))
    }

    const addTag = (newTag: string) => {
        return axios.post('http://192.168.84.178:8000/api/tag', {text: newTag})
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err.data))
    }

    const addNote = (text: string, title: string, newDate: string, selectTag: string[]) => {
        return axios.post('http://192.168.84.178:8000/api/note', {text, title, date: newDate, tag: selectTag.join(', ')})
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err.data))
    }

    const getNote = (id: number) => {
        return axios.get(`http://192.168.84.178:8000/api/note/${id}`)
            .then((res) => {return res.data.data})
            .catch((res) => console.log(res.data))
    }

    const updateNote = (text: string, title: string, newDate: string, selectTag: string[], id: number) => {
        return axios.patch(`http://192.168.84.178:8000/api/note/${id}`, {text, title, date: newDate, tag: selectTag.join(', ')})
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err.data))
    }

    return {
        getAllNotes,
        getAllTags,
        deleteNote,
        deleteTag,
        addNote,
        addTag,
        getNote,
        updateNote
    }
}