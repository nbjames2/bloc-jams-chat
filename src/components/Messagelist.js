import React from 'react';

class MessageList extends React.Component {
    constructor(props) {
        super(props)
        this.messagesRef = this.props.firebase.database().ref('messages');
        this.state={
            messages: [],
            displayedMessages: [],
            newMessage: ""
        }
    }

    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages: this.state.messages.concat( message ) }, () => {
                this.updateMessages( this.props.activeRoom)
            });
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

    handleInputChange = (e) => {
        this.setState({ newMessage: e.target.value });
    }

    timeConverter(e) { 
        const today = e % 86400000;
        const hours = Math.floor(today / 3600000);
        let minutes = Math.floor(((today / 1000) - (hours * 3600)) / 60);
        if (minutes < 10) {
            minutes = "0" + minutes; 
        } 
        return hours + ':' + minutes;
    }

    handleSendMessage = (e) => {
        e.preventDefault();
        if (this.state.newMessage !== "") {
            this.messagesRef.push({
                content: this.state.newMessage,
                roomId: this.props.activeRoom.key,
                sentAt: Date.now(),
                username: this.props.userAuth.displayName
            });
        }
        this.setState({ newMessage: "" })
    }

    removeMessage = (message) => {
        this.messagesRef.child(message.key).remove();
        const tempDispMessages = this.state.displayedMessages.filter( (msg) => msg.key !== message.key);
        const tempMessages = this.state.messages.filter( (msgs) => msgs.key !== message.key);
        this.setState({ displayedMessages: tempDispMessages,
                        messages: tempMessages });

        // const index = this.state.displayedMessages.findIndex(room => room.name === this.props.activeRoom.name);
        // const tempRooms = [...this.state.rooms];
        // tempRooms[index].name = e;
        // const msgs = this.state.messages.filter( msgs => msgs.roomId === this.props.activeRoom.key );
        // this.setState({ displayedMessages: msgs});

      }

    render() {
        return(
            <section id='messagelist'>
                <h1>{this.props.activeRoom.name}</h1>
                { this.state.displayedMessages.map( (value, index) =>
                        <div key={index} style={{background: index % 2 ? '#f2feff':'#fffffff' }} className='messages'>
                            <div className='message-user'>{value.username}</div>
                            <div className='message-content'>{value.content}</div>
                            <div className='message-sentAt'>{this.timeConverter(value.sentAt)}</div>
                            <button id='deletemessagebutton' onClick={ () => this.removeMessage(value)}>Delete</button>
                        </div>
                    )
                }
                <section id='create-message'>
                    <form id='send-message'>
                        <input id='newmessagefield' type='text' value={this.state.newMessage} placeholder='Send new message' onChange={this.handleInputChange} />
                        <input id='newmessagesend' type='submit' value='Send' onClick={this.handleSendMessage} />
                    </form>
                </section>
            </section>
        )
    }
}

export default MessageList;