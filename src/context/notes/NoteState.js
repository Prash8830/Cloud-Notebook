import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial =[]
  const [note, setNote] = useState(notesInitial)

  //Add a note 

  const addNote = async(title, description, tag) => {
    //Api call 

    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json', 
        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1NWUzZWNhOGMxNWY1OTc1ZWRkYTY0In0sImlhdCI6MTYzMzAxODg2MH0.F40Kf8luQ_Z1niUf2pgADKmieXu9CXtppUwz1bJLpQU'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
    });
    // const json = response.json(); 

    console.log("Notes are added");
    const not = {
      "_id": "26155eeef671fd11081f25bc1",
      "user": "6155e3eca8c15f5975edda64",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2021-09-30T17:07:59.610Z",
      "__v": 0
    };
    setNote(note.concat(not))
  }


  //get all notes

  const getnotes = async() => {
    //Api call 

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json', 
        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1NWUzZWNhOGMxNWY1OTc1ZWRkYTY0In0sImlhdCI6MTYzMzAxODg2MH0.F40Kf8luQ_Z1niUf2pgADKmieXu9CXtppUwz1bJLpQU'
      },
    });
    const json = await response.json()
    console.log(json)
    setNote(json)
  }


  //Delete a note 

  const deleteNote = (id) => {

    console.log("Note deleted on " + id);
    const newnote = note.filter((note) => { return note._id !== id })
    setNote(newnote)
  }

  //Edit a note  

  const editNote = async (id, title, description, tag) => {

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json', 
        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1NWUzZWNhOGMxNWY1OTc1ZWRkYTY0In0sImlhdCI6MTYzMzAxODg2MH0.F40Kf8luQ_Z1niUf2pgADKmieXu9CXtppUwz1bJLpQU'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({id,title,description, tag}) // body data type must match "Content-Type" header
    });
    const json = response.json(); // parses JSON response into native JavaScript objects



    for (let index = 0; index < note.length; index++) {
      const element = note[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  }


  return (
    <NoteContext.Provider value={{ note, setNote, addNote, deleteNote, editNote,getnotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;