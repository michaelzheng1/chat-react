import React, { Component } from 'react'
import UsernameForm from './components/UsernameForm'
import ChatScreen from './ChatScreen'

class App extends Component {
  constructor() {
    super()
    this.state= {
      currentUsername: '',
      currentScreen: 'WhatIsYourUsernameScreen'
    }
    this.onUsernameSubmitted = this.onUsernameSubmitted.bind(this)
  }

  onUsernameSubmitted(username) {
    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username}),
      })
      .then(response => {
        this.setState({
          currentUsername: username,
          curretnScreen: 'ChatScreen'
        })
      })
      .catch(error => console.error('error', error))
  }
  render() {
    // return <h1>Chatly</h1>
    if (this.state.currentScreen === "WhatIsYourUsernameScreen") {
      return <UsernameForm onSubmit={this.onUsernameSubmitted} />
    }
    if (this.state.currentScreen === "ChatScreen") {
      return <ChatScreen currentUsername={this.state.currentUsername} />
    }
    return <UsernameForm onSubmit={this.onUsernameSubmitted}/>
  }
}

export default App
