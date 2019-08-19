import React, { Component } from "react";
import "./add-folder.css";

export default class AddFolder extends Component {
  state = {
    name: "",
    error: null
  };

  onChange = e => {
    this.setState({ name: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { name } = this.state;
    if (!name) {
      this.setState({
        error:
          "Name is Required"
      });
    } else {
      this.props.addFolder({ name });
    }
  };
  render() {
    return (
      < div className = "add-form" >
        <h2>Add Folder</h2>
        <form onSubmit={this.handleSubmit} className="submit-btn" >
          <label>
            
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
              
              placeholder = "Folder Name"
            />
          </label>
          {this.state.error && (
            <p style={{ color: "red" }}>{this.state.error}</p>
          )}
          <input style={{ margin: "5%" }} type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
