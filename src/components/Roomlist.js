import React from 'react';

class RoomList extends React.Component {
    constructor(props) {
        super(props);
        this.roomsRef = this.props.firebase.database().ref('rooms');
        this.state = {
          rooms: [],
          newRoom: "",
          active: ""          
        };
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room ) });
        });
      }

      handleSubmit = (e) => {
        e.preventDefault();
        const newRoomName = this.state.newRoom
        if (newRoomName) {
            this.roomsRef.push({
                name: newRoomName,
            });
        this.setState({ newRoom: '' })

        }
      }

      handleFormChange = (e) => {
        this.setState({ newRoom: e.target.value });
      }

      roomHighlight(name) {
          if(this.state.active === name) {
              return '#5C6672';
          }
          return '';
      }

      handleClick(room) {
          this.setState({ active: room.name });
          this.props.handleRoomClick(room);
      }

    render() {
        return(
            <section className='roomlist'> 
                <form className='new-room-form'>              
                    <input className='input menu-input' type="text" placeholder='Open new room' value={this.state.newRoom} onChange={this.handleFormChange} disabled={this.props.user ? '' : 'true'}/>
                    <button onSubmit={ (e) => this.handleSubmit(e) } disabled={this.props.user ? '' : 'true'}>Add room</button>
                </form>
                    <section className='db-rooms'>
                    {
                        this.state.rooms.map( (value, index) =>
                                <div className='room-number' style={{background: this.roomHighlight(value.name)}} value={value.name} onClick={() => this.handleClick(value)} key={value.key}>{value.name}</div>
                        )
                    }
                </section>
            </section>
        );
    }
}

export default RoomList;