import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
    const notesinitial = [
        {
          "_id": "6155ee8a671fd11081f25bb9",
          "user": "6155e3eca8c15f5975edda64",
          "title": " Updated Trees and Graphs Notes",
          "description": "Data Structue today Notes",
          "tag": "DSA",
          "date": "2021-09-30T17:06:18.929Z",
          "__v": 0
        },
        {
          "_id": "6155eeef671fd11081f25bbd",
          "user": "6155e3eca8c15f5975edda64",
          "title": "Trees and Graphs Notes",
          "description": "Data Structue Yesterday Notes",
          "tag": "DSA",
          "date": "2021-09-30T17:07:59.216Z",
          "__v": 0
        },
        {
          "_id": "6155eeef671fd11081f25bbf",
          "user": "6155e3eca8c15f5975edda64",
          "title": "Trees and Graphs Notes",
          "description": "Data Structue Yesterday Notes",
          "tag": "DSA",
          "date": "2021-09-30T17:07:59.383Z",
          "__v": 0
        },
        {
          "_id": "6155eeef671fd11081f25bc1",
          "user": "6155e3eca8c15f5975edda64",
          "title": "Trees and Graphs Notes",
          "description": "Data Structue Yesterday Notes",
          "tag": "DSA",
          "date": "2021-09-30T17:07:59.610Z",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(notesinitial)
    return (
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;