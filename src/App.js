import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Header from "./components/Header";
import FolderList from "./components/FolderList";
import NoteList from "./components/NoteList";
import NotePage from "./components/NotePage";
import NoteSidebar from "./components/NoteSidebar";
import AppContext from "./context/AppContext";
import AddFolder from "./components/AddFolder";
import AddNote from "./components/AddNote";
import ErrorBoundary from "./ErrorBoundary";

import "./App.css";

class App extends Component {
  state = {
    folders: [],
    notes: [],
    error: null,
    loading:false
  };

  deleteNote = async id => {
    try {
      await fetch(`http://localhost:9090/notes/${id}`, { method: "DELETE" });
      this.setState({ notes: this.state.notes.filter(note => note.id !== id) });
      this.props.history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  addFolder = async nameObj => {
    try {
      const res = await fetch(`http://localhost:9090/folders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nameObj)
      });
      const resJson = await res.json();
      this.setState({ folders: [...this.state.folders, resJson] });

      this.props.history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  addNote = async noteData => {
    try {
      const res = await fetch(`http://localhost:9090/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(noteData)
      });
      const resJson = await res.json();
      this.setState({ notes: [...this.state.notes, resJson] });

      this.props.history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  componentDidMount() {
    this.setState ({loading:true})
    setTimeout(()=>{
      console.log("didMount")

      Promise.all([
          fetch("http://localhost:9090/folders"),
          fetch("http://localhost:9090/notes")
        ])
        .then(responses => {
          responses.forEach(response => {
            if (!response.ok) {
              Promise.reject("sorry there was an issue");
            }
          });
          return responses;
        })
        .then(responses => Promise.all(responses.map(res => res.json())))
        .then(responses =>
          this.setState({
            loading: false,
            folders: responses[0],
            notes: responses[1]
          })
        )
        .catch(error => {
          this.setState({loading:false})
          console.log(error);
        });
    },1000)
    
  }

  render() {
    const { folders, notes } = this.state;
    
    if (this.state.loading){
      return (<h1 style={{color:"black",textAlign:"center",fontSize:"6rem"}}>loading...</h1>)
    } else {
    return (
      <div className="App">
        <AppContext.Provider
          value={{ folders, notes, deleteNote: this.deleteNote }}
        >
          
          < Header / >
        <div className="main">
          <div className="sidebar">
            <Switch>
              <Route
                exact
                path="/notes/:noteId"
                render={props => <NoteSidebar {...props} />}
              />
              <Route render={props => <FolderList {...props} />} />
            </Switch>
          </div>
          <div className="section" >
            <Switch>
              <Route exact path="/" render={props => <NoteList {...props} />} />
              <Route
                exact
                path="/folders/:folderId"
                render={props => <NoteList {...props} />}
              />
              <Route
                exact
                path="/notes/:notesId"
                render={props => <NotePage {...props} />}
              />
              <ErrorBoundary>
                <Route
                  exact
                  path="/add-folder"
                  render={props => (
                    <AddFolder {...props} addFolder={this.addFolder} />
                  )}
                />
                <Route
                  exact
                  path="/add-note"
                  render={props => (
                    <AddNote
                      {...props}
                      folders={this.state.folders}
                      addNote={this.addNote}
                    />
                  )}
                />
              </ErrorBoundary>
            </Switch>
          </div>
          </div>
        </AppContext.Provider>
      </div>
    );}
  }
}

export default withRouter(App);
