import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/Roomlist';
import MessageList from './components/Messagelist';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCr5SljJUNL1yTx5HSV92r7LvMlgmPS2jA",
  authDomain: "bloc-jams-chat-22790.firebaseapp.com",
  databaseURL: "https://bloc-jams-chat-22790.firebaseio.com",
  projectId: "bloc-jams-chat-22790",
  storageBucket: "bloc-jams-chat-22790.appspot.com",
  messagingSenderId: "970001352980"
};
firebase.initializeApp(config);


class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      activeRoom: ""
    }
  }

  handleRoomClick(e) {
    this.setState({ activeRoom: e });
  }

  render() {
    return (
      <section id="fullscreen">
        <section id='sidebar'>
          <div id='subsidebar'>
            <h1>Bloc Chat</h1>
            <RoomList id='roomlist'
              firebase={firebase}
              activeRoom={this.state.activeRoom}
              handleRoomClick={(e) => this.handleRoomClick(e)}
            />
          </div>
        </section>
        <section id='messages'>
          <MessageList id='messagelist'
            firebase={firebase}
            activeRoom={this.state.activeRoom}
          />
        </section> 
      </section>
    );
  }
}

export default App;
