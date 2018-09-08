import React from 'react';

class RoomList extends React.Component {
    constructor(props) {
        super(props);
        this.roomsRef = this.props.firebase.database().ref('rooms');
        this.state = {
          rooms: [],
          newRoom: "Add a new room"
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

      handleSubmit = (e) => {
        const newRoomName = this.state.newRoom
        if (newRoomName !== "Add a new room") {
            this.roomsRef.push({
                name: newRoomName
            });
        }
      }

      handleFormChange = (e) => {
        this.setState({ newRoom: e.target.value });
      }

    render() {
        return(
            <section id='roomlist'> 
                <div id='new-room-form'>              
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            <input type="text" value={this.state.newRoom} onChange={this.handleFormChange}/>
                        </label>
                        <input type="submit" value="Add" />
                    </form>
                </div>
                    <section className='db-rooms'>
                    {
                        this.state.rooms.map( (value, index) =>
                            <section className='value-info'>
                                <div className='room-number' onClick={this.handleRoomClick}>{value.name}</div>
                            </section>
                        )
                    }
                </section>
            </section>
        );
    }
}

export default RoomList;