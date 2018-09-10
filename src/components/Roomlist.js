import React from 'react';

class RoomList extends React.Component {
    constructor(props) {
        super(props);
        this.roomsRef = this.props.firebase.database().ref('rooms');
        this.state = {
          rooms: [],
          newRoom: "Add a new room",
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

      roomHighlight(name) {
          if(this.state.active === name) {
              return '#bcbcbc';
          }
          return "";
      }

      handleClick(name) {
          this.setState({ active: name });
          this.props.handleRoomClick(name);

      }

    render() {
        return(
            <section id='roomlist'> 
                <div id='new-room-form'>              
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            <input id='input-new-room' type="text" value={this.state.newRoom} onChange={this.handleFormChange}/>
                        </label>
                        <input type="submit" value="Add" />
                    </form>
                </div>
                    <section className='db-rooms'>
                    {
                        this.state.rooms.map( (value, index) =>
                                <div className='room-number' style={{background: this.roomHighlight(value.name)}} value={value.name} onClick={() => this.handleClick(value.name)} key={index}>{value.name}</div>
                        )
                    }
                </section>
            </section>
        );
    }
}

export default RoomList;