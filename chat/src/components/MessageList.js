import React from 'react'

const DUMMY_DATA = [
    {
        senderId: 'perborgen',
        text: 'Hey'
    },
    {
        senderId: 'janedoe',
        text: 'Great!'
    },
    {
        senderId: 'perborgen',
        text: 'Good'
    }
]
class MessageList extends React.Component {
    render() {
        return (
            <div className="message-list">
                {DUMMY_DATA.map((message, index) => {
                    return (
                        <div>
                            <div>{message.senderId}</div>
                            <div>{message.tex}</div>

                        </div>
                    )
                })}
            </div>
        )
    }
}

export default MessageList