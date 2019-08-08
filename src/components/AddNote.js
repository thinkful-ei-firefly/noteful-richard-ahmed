import React from 'react';
import UserContext from './UserContext';

export default class AddNote extends React.Component {

    static contextType = UserContext;

    render () {
        return(
            <form className="addNote" onSubmit={this.context.handleCreateNote}>
                <label htmlFor="noteName">Note Name:
                    <input id="noteName" type="text" 
                    value={this.context.addingNote} 
                    onChange={e => this.context.setAddingNote(e.target.value)} />
                </label>
                <button type ="submit"  >Add Note</button>
            </form>
        );
    }
}