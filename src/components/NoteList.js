import React from "react";
import Note from "./Note";
import "./note-list.css";
import UserContext from './UserContext';

class NoteList extends React.Component {
  static contextType = UserContext;
  
  findNotes = () => {
    let notes
    if (this.context.match.params.folderId) {
      notes = this.context.notes.filter(
        note => note.folderId === this.context.match.params.folderId
      );
    } else {
      notes = this.context.notes;
    }
    return notes
  }
  
  render () {
    return (
      <ul>
        {this.findNotes().map(note => (
          <Note
            name={note.name}
            id={note.id}
            key={note.id}
            modified={note.modified}
          />
        ))}
      </ul>
    );
  }
  
};

export default NoteList;
