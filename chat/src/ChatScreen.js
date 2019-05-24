import React, {Component} from 'react'
import ChatKit from '@pusher/chatkit-client'

class ChatScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: {}
        }
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
            this.setState({currentUser})
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
        return(
            <div style={styles.container}>
                <div style={styles.chatContainer}>
                    <aside style={styles.whosOnlineListContainer}>
                        <h2>Who's online PLACEHOLDER</h2>
                    </aside>
                    <section style={styles.chatListContainer}>
                        <h2>Chat PLACEHOLDER</h2>
                    </section>
                </div>
            </div>
        )
    }
}

export default ChatScreen