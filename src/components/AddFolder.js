import React from 'react';
import UserContext from './UserContext';

export default class AddFolder extends React.Component {

    static contextType = UserContext;

    render () {
        return(
            <form className="addFolder">
                <label htmlFor="folderName">Folder Name:
                    <input id="folderName" type="text" 
                    value={this.context.addingFolder} 
                    onChange={e => this.context.setAddingFolder(e.target.value)} />
                </label>
                <button onClick={this.context.handleCreateFolder()} >Add Folder</button>
            </form>
        );
    }
}