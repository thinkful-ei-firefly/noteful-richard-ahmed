import React from 'react';
import UserContext from './UserContext';

export default class AddNote extends React.Component {

    static contextType = UserContext;

    render () {
        if (!this.context.setFolderId) {
            this.context.setFolderId(this.context.match.params.folderId)
        }
        return(
            <form className="addNote" onSubmit={this.context.handleCreateNote}>
                <label htmlFor="noteName">Note Name:
                    <input id="noteName" type="text" 
                    value={this.context.addingNote} 
                    onChange={e => this.context.setAddingNote(e.target.value)} />
                </label>
                <label htmlFor="noteText">Note:
                    <input id="noteText" type="text"
                    value={this.context.currentNoteContent}
                    onChange={e => this.context.setCurrentNoteContent(e.target.value)} />
                </label>
                <button type ="submit">Add Note</button>
            </form>
        );
    }
}