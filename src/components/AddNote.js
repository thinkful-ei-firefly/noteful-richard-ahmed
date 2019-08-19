import React, { Component } from "react";
import "./add-note.css";

export default class AddNote extends Component {
  state = {
    name: "",
    folderId: "",
    content: "",
    error: null
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { name, folderId, content } = this.state;
    if (!name) {
      this.setState({
        error:
          "Name is Required"
      });
    } else if (!folderId) {
      this.setState({
        error: "You must choose a folder"
      });
    } else {
      this.props.addNote({ name, folderId, content, modified: Date.now() });
    }
  };
  render() {
    return (
      < div className = "add-note-contaier add-form" >
        <h2>Add Note</h2>
        <form className="add-note-form submit-btn" onSubmit={this.handleSubmit}>
          <label>
            
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
              placeholder="Note name"
              
            />
          </label>
          <label for="folder-select">
            <select
              id="folder-select"
              name="folderId"
              value={this.state.folderId}
              onChange={this.onChange}
              
            >
              <option>--Please Choose a Folder--</option>
              {this.props.folders.map(folder => (
                <option value={folder.id}>{folder.name}</option>
              ))}
            </select>
          </label>
          <label for="content">Add Note Content:</label>
          <textarea
            id="content"
            name="content"
            rows="5"
            cols="33"
            value={this.state.content}
            onChange={this.onChange}
          >
            Add stuff to me...
          </textarea>
          {this.state.error && (
            <p style={{ color: "red" }}>{this.state.error}</p>
          )}
          <input style={{ margin: "5%" }} type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
