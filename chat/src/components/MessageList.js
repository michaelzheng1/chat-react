// import React from 'react'

// const DUMMY_DATA = [
//     {
//         senderId: 'perborgen',
//         text: 'Hey'
//     },
//     {
//         senderId: 'janedoe',
//         text: 'Great!'
//     },
//     {
//         senderId: 'perborgen',
//         text: 'Good'
//     }
// ]
// class MessageList extends React.Component {
//     render() {
//         return (
//             <div className="message-list">
//                 {DUMMY_DATA.map((message, index) => {
//                     return (
//                         <div>
//                             <div>{message.senderId}</div>
//                             <div>{message.tex}</div>

//                         </div>
//                     )
//                 })}
//             </div>
//         )
//     }
// }

// export default MessageList

import React, {Component} from 'react'

class MessageList extends React.Component {
    render() {
        const styles = {
            container: {
                overflowY: 'scroll',
                flex:1,
            },
            ul: {
                listStyle: 'none',
            }, 
            li: {
                marginTop: 13,
                marginBottom: 13,
            },
            senderUsername: {
                fontWeigth: 'bold',
            },
            message: {fontSize: 15},
        }
        return (
            <div
                style= {{
                    ...this.props.style,
                    ...styles.container,
                }}
                >
                <ul style={styles.ul}>
                    {this.props.messages.map((message,index) => (
                        <li key={index} style={styles.li}>
                            <div>
                                <span style={styles.senderUsername}>{message.senderId}</span>
                                {' '}
                            </div>
                            <p style={styles.message}>{message.text}</p>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default MessageList