import React from 'react';

class MessageList extends React.Component {
    constructor(props) {
        super(props)
        this.messagesRef = this.props.firebase.database().ref('messages');
        this.state={
            messages: []
        }
    }

    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages: this.state.messages.concat( message ) });
            console.log(this.state.messages);
        });
      }

    render() {
        return(
            <section id='messagelist'>
                <h1>{this.props.activeRoom}</h1>
                {
                    this.state.messages.map( (value, index) =>
                    
                    )
                }
            </section>
        )
    }
}

export default MessageList;