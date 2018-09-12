import React, { Component } from "react";
import "./App.css";
import contacts from "../contacts.json";

class App extends Component {
  //initialize state here
  constructor(props) {
    super(props);
    this.state = {
      contacts: []
      //other states would go here
    };
  }

  //establishing the state after the component mounts
  componentDidMount() {
    this.setState({
      contacts: contacts.slice(0, 5)
    });
  }
  //define event listener functions here
  //to ADD new contact

  addClick(e) {
    console.log("Add Button Clicked");
    //define the new random contact to be added (bracket notation index)
    let addContact = contacts[Math.floor(Math.random() * contacts.length)];
    //update the state to add the new contact to the array of contacts
    this.setState({ contacts: [...this.state.contacts, addContact] });
  }

  sortNameClick(e) {
    console.log("Sort ButtonClicked");
    //sort all the current contacts by name then replace the contacts state with the new sorted contacts

    //define the sorted contacts by making a shallow copy of the current contacts
    let sortedContacts = this.state.contacts.slice();
    //then sort it
    sortedContacts.sort((a, b) => {
      return b.name < a.name ? 1 : -1;
    });
    //update the state with contacts replaced by contacts
    this.setState({ contacts: sortedContacts });
  }

  sortPopularityClick(e) {
    let sortedContacts = this.state.contacts.slice();
    sortedContacts.sort((a, b) => {
      return b.popularity > a.popularity ? 1 : -1;
    });
    this.setState({ contacts: sortedContacts });
  }

  // handleDelete(indexToRemove) {
  //   this.setState({
  //     contacts: this.state.contacts.filter((c, i) => i !== indexToRemove)
  //   });
  // }

  //RENDER here
  render() {
    return (
      <div>
        <h1>IronContacts</h1>

        {/* add new contact */}
        <button onClick={e => this.addClick(e)}>Add Random Contact</button>

        {/* sort by name */}
        <button onClick={e => this.sortNameClick(e)}>Sort by name</button>

        {/* sort by popularity */}
        <button onClick={e => this.sortPopularityClick(e)}>
          Sort by popularity
        </button>

        <Table contactsInfo={this.state.contacts} />
      </div>
    );
  }
}

class Table extends Component {
  render() {
    return (
      <div className="App">
        <table width="100%">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Popularity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.contactsInfo.map(singleContact => {
              return (
                <tr key={singleContact.pictureUrl}>
                  <td>
                    <img src={singleContact.pictureUrl} alt="" width="50px" />
                  </td>
                  <td>{singleContact.name}</td>
                  <td>{singleContact.popularity}</td>
                  <td>
                    <button onClick={e => this.handleDelete(e, singleContact)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;

// Iteration 3 | Sort Contacts By Name And Popularity
// Iteration 4 | Remove Contacts
// Iteration 5 | Bonus | Styling
