import React from 'react';

class MessageList extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            messages: []
        }
    }

    render() {
        return(
            <section id='messagelist'></section>
        )
    }
}

export default MessageList;