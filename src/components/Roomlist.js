import React from 'react';

class RoomList extends React.Component {
    constructor(props) {
        super(props);
        this.roomsRef = this.props.firebase.database().ref('rooms');
        this.state = {
          rooms: []
        };
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room ) });
            console.log(this.state.rooms);
        });
      }

    render() {
        return(
            <section className='db-rooms'>
        {
          this.state.rooms.map( (value, index) =>
                <section className='value-info'>
               <div className='room-number'>{value.name}</div>
                </section>
          )
        }
      </section>
        );
    }
}

export default RoomList;