import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import FolderList from "./components/FolderList";
import NoteList from "./components/NoteList";
import NotePage from "./components/NotePage";
import NoteSidebar from "./components/NoteSidebar";
import UserContext from "./components/UserContext";

import "./App.css";

class App extends Component {

  state = {
    folders: [],
    notes: [],
    loading: true,
    addingFolder: '',
    addingNote:'',
    currentFolderId: false,
    currentNoteContent: '',
  };
  
  componentDidMount() {
    this.updateState()
  }

  setAddingFolder = (text) => {
    this.setState ({
      addingFolder: text,
    })
  }
  setAddingNote = (text) => {
    this.setState({
      addingNote: text,
    })
  }

  setFolderId = (text) => {
    this.setState({
      currentFolderId: text,
    })
  }

  setCurrentNoteContent = (text) => {
    this.setState({
      currentNoteContent: text,
    })
  }

  updateState() {
    fetch('http://localhost:8080/db')
      .then(res => res.json())
      .then(resJson => {
        this.setState({
          folders: resJson.folders,
          notes: resJson.notes,
          loading: false,
          currentFolderId: false,
        })
      });
  }
  

  handleCreateFolder = (e) => { e.preventDefault() 
    fetch('http://localhost:8080/folders/', {
      method: 'Post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({name: this.state.addingFolder})
    })
    .then(()=> this.updateState())
  }

  handleCreateNote = (e) => {
    e.preventDefault()
    const date = new Date();
    const timestamp = date.getTime();
    fetch('http://localhost:8080/notes/', {
        method: 'Post',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          name: this.state.addingNote,
          modified: timestamp,
          folderId: this.state.currentFolderId,
          content: this.state.currentNoteContent
        })
      })
      .then(() => this.updateState())
  }

  handleDelete = (id) => {
    console.log('deleting '+id)
    fetch(`http://localhost:8080/notes/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(() => {
        this.setState({
          notes: this.state.notes.filter(note => note.id !== id)
        })
      })
  }
  

  render() {
    const { folders, notes, loading } = this.state;
    if (loading) return <div>loading</div>
    return (
      <div className="App">
        <Header />
        <div className="sidebar">
        <UserContext.Provider value ={{
          folders: folders,
          notes: notes,
          addingFolder: this.state.addingFolder,
          setAddingFolder: this.setAddingFolder,
          handleCreateFolder: this.handleCreateFolder,
        }}>
          <Switch>
            <Route
              exact
              path="/notes/:noteId"
              render={({ match }) => (
                  <NoteSidebar match={match}/>
              )}
            />
            <Route
              render={() => (
                  <FolderList />
              )}
            />
      
          </Switch>
        </UserContext.Provider>
        </div>
        <div className="main">
          <Switch>
            <Route
              exact
              path="/"
              render={({match}) =>
                <UserContext.Provider value ={{
                  notes: notes,
                  match: match,
                  handleDelete: this.handleDelete,
                  setAddingNote: this.setAddingNote,
                  addingNote: this.addingNote,
                  handleCreateNote: this.handleCreateNote,
                  setFolderId: this.setFolderId,
                  currentNoteContent: this.state.currentNoteContent,
                  setCurrentNoteContent: this.state.setCurrentNoteContent
                }}> 
                  <NoteList />
                </UserContext.Provider>
              }  
            />
            <Route
              exact
              path="/folders/:folderId"
              render={({match}) => 
                <UserContext.Provider value ={{
                  notes: notes,
                  match: match,
                  handleDelete: this.handleDelete,
                  setAddingNote: this.setAddingNote,
                  addingNote: this.addingNote,
                  handleCreateNote: this.handleCreateNote,
                  setFolderId: this.setFolderId,
                  currentNoteContent: this.state.currentNoteContent,
                  setCurrentNoteContent: this.state.setCurrentNoteContent
                }}> 
                  <NoteList match ={match} />
                </UserContext.Provider>
              }
            />
            <Route
              exact
              path="/notes/:notesId"
              render={({match}) => 
                <UserContext.Provider value ={{
                  notes: notes,
                  match: match,
                  handleDelete: this.handleDelete
                }}> 
                  <NotePage />
                </UserContext.Provider>
              }
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
