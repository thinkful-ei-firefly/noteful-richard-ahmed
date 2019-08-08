import React from "react";
import Folder from "./Folder";
import AddFolder from './AddFolder'
import UserContext from "./UserContext"

class FolderList extends React.Component {
  static contextType = UserContext;

  render() {
    const { folders } =this.context;
    return ( 
      <ul className="folder-list">
        {folders.map(folder => (
          <Folder name={folder.name} id={folder.id} key={folder.id} />
        ))}
        <UserContext.Provider value={{
          setAddingFolder: this.context.setAddingFolder,
          addingFolder: this.context.addingFolder,
          handleCreateFolder: this.context.handleCreateFolder
        }}>
        <AddFolder />
      </UserContext.Provider>
      </ul>
    );
  }
};

export default FolderList;
