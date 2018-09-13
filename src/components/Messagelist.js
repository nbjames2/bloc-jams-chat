import React from 'react';

class MessageList extends React.Component {
    constructor(props) {
        super(props)
        this.messagesRef = this.props.firebase.database().ref('messages');
        this.state={
            messages: [],
            displayedMessages: []
        }
    }

    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages: this.state.messages.concat( message ) });
        });
      }
    
      componentWillReceiveProps(nextProps) {
        this.updateMessages( nextProps.activeRoom );
      }

      updateMessages(activeRoom) {
        if (!activeRoom) { return }
        const msg = this.state.messages.filter( message => message.roomId === activeRoom.key );
        this.setState({ displayedMessages: msg});
      }

      messageBackground () {
        if (this.state.messagebg === '#000000') {
            this.setState({ messagebg: '#fffffff' });
        } else {
            this.setState({ messagebg: '#000000' })
        }
      }



    render() {
        return(
            <section id='messagelist'>
                <h1>{this.props.activeRoom.name}</h1>
                { this.state.displayedMessages.map( (value, index) =>
                        <div key={index} style={{background: index % 2 ? '#f2feff':'#fffffff' }} className='messages'>
                            <div className='message-user'>{value.username}</div>
                            <div className='message-content'>{value.content}</div>
                            <div className='message-sentAt'>{value.sentAt}</div>
                        </div>
                    )
                }
            </section>
        )
    }
}

export default MessageList;