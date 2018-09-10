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
        if (newRoomName !== "") {
            this.roomsRef.push({
                name: newRoomName,
            });
        this.setState({ newRoom: "" })

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
                    <form onSubmit={ (e) => this.handleSubmit(e) }>
                        <input id='input-new-room' type="text" value={this.state.newRoom} onChange={this.handleFormChange}/>
                        <input type="submit" value="Add room" />
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