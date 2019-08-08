import React from "react";
import Note from "./Note";
import "./note-list.css";
import UserContext from './UserContext';
import AddNote from './AddNote'

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
      <div>
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
        <UserContext.Provider value={{
          setAddingNote: this.context.setAddingNote,
          addingNote: this.context.addingNote,
          handleCreateNote: this.context.handleCreateNote,
          match: this.context.match,
          setFolderId: this.context.setFolderId,
          currentNoteContent: this.context.currentNoteContent,
          setCurrentNoteContent: this.context.setCurrentNoteContent
        }}>
        <AddNote />
      </UserContext.Provider>
      </div>
    );
  }
  
};

export default NoteList;
