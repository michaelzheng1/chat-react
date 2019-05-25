import React, { Component } from 'react'
import ChatKit from '@pusher/chatkit-client'
import MessageList from './components/MessageList'
import SendMessageForm from './components/MessageList'
import TypingIndicator from './components/TypingIndicator'
import whosOnlineList from './components/WhosOnlineList'
import WhosOnlineList from './components/WhosOnlineList';

class ChatScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: {},
            currentRoom: {},
            messages: [],
            usersWhoAreTyping: [],
        }
        this.sendMessageForm = this.sendMessageForm.bind(this)
        this.sendTypingEvent = this.sendTypingEvent.bind(this)
    }

    sendTypingEvent() {
        this.state.currentUser
            .isTypingIn({ roomId: this.state.currentRoom.id })
            .catch(error => console.error('error', error))
    }

    sendMessage(text) {
        this.state.currentUser.sendMessage({
            text,
            roomId: this.state.currentRoom.id,
        })
    }
    componenetDidMount() {
        const chatManager = new ChatKit.chatManager({
            instanceLocator: 'v1:us1:4b2a59b9-1bdd-4ff4-a0dc-ec0b224906dd',
            userId: this.props.currentUsername,
            tokenProvider: new ChatKit.tokenProvider({
                url: 'http://localhost:3001/authenticate'
            }),
        })
        chatManager
            .connect()
            .then(currentUser => {
                this.setState({ currentUser })
                return currentUser.subscribeToRoom({
                    roomId: "19864673",
                    messageLimit: 100,
                    hooks: {
                        onMessage: message => {
                            this.setState({
                                messages: [...this.state.messages, message],
                            })
                        },
                        onUserStartedTyping: user => {
                            this.setState({
                                usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name],
                            })
                        },
                        onUserStoppedTyping: user => {
                            this.setState({
                                usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                                    username => username !== user.name
                                ),
                            })
                        },
                        onPresenceChange: () => this.forceUpdate(),
                    },
                })
            })
            .then(currentRoom => {
                this.setState({ currentRoom })
            })
            .catch(error => console.error('error', error))
    }
    render() {
        // return (
        //     <div>
        //         <h1>Chat</h1>
        //     </div>
        // )
        const styles = {
            container: {
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
            },
            chatContainer: {
                display: 'flex',
                flex: 1
            },
            whosOnlineListContainer: {
                width: '300px',
                flex: 'none',
                padding: 20,
                backgroundColor: '#2c303b',
                color: 'white'
            },
            chatListContainer: {
                padding: 20,
                width: '85%',
                display: 'flex',
                flexDirection: 'column'
            }
        }
        return (
            <div style={styles.container}>
                <div style={styles.chatContainer}>
                    <aside style={styles.whosOnlineListContainer}>
                        {/* <h2>Who's online PLACEHOLDER</h2> */}
                        <WhosOnlineList
                        currentUser={this.state.currentUser}
                        users={this.state.currentRoom.users}
                        />
                    </aside>
                    <section style={styles.chatListContainer}>
                        {/* <h2>Chat PLACEHOLDER</h2> */}
                        <MessageList
                            messages={this.UNSAFE_componentWillMount.state.messages}
                            style={styles.chatList}
                        />
                        TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping}/>
                        <SendMessageForm
                            onSubmit={this.sendMessage}
                            onChange={this.sendTypingEvent}
                        />
                    </section>
                </div>
            </div>
        )
    }
}

export default ChatScreen