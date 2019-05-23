import React from 'react';
import logo from './logo.svg';
import NewRoomForm from './components/NewRoomForm'
import RoomList from './components/RoomList'
import SendMessageForm from './components/SendMessageForm'
import MessageList from './components/MessageList.js'
import './App.css';

class App extends React.component {
  render() {
    return (
      <div className="app">
        <RoomList/>
        <MessageList/>
        <SendMessageForm/>
        <NewRoomForm/>
      </div>
    );
  }
}

export default App;
