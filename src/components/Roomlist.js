import React from 'react';
import Dashboard from './Dashboard';


class RoomList extends React.Component {
    constructor(props) {
        super(props);
        this.roomsRef = this.props.firebase.database().ref('rooms');
        this.state = {
          rooms: [],
          newRoom: "",
          active: "",
          show: false,
          modalMessage: "Rename room:",
          newName: ""        
        };
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room ) });
        });

      }

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

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

    handleClick(room) {
        this.setState({ active: room.name });
        this.props.handleRoomClick(room);
    }

    removeRoom = (e) => {
        if (this.props.activeRoom) {
            this.roomsRef.child(e.key).remove();
            const tempRooms = this.state.displayedRooms.filter( (room) => room.key !== e.key);
            this.setState({ displayedRooms: tempRooms });
        }
    }

    renameRoom = (e) => {
        console.log(e);
        if (e.name !== "") {
            const active = this.props.activeRoom;
            this.setState({ show: true })
            return this.props.firebase.database().ref().child("rooms").child(active.key).update({ name: e});
        }
    }    

    render() {
        return(
            <section id='roomlist'>
                {this.state.show ? <div><Dashboard
                    show={this.state.show}
                    modalMessage={this.state.modalMessage}
                    hideModal={() => this.hideModal()}
                    renameRoom={(name) => this.renameRoom(name)}
                /></div> : null }
                <div id='new-room-form'>              
                    <form onSubmit={ (e) => this.handleSubmit(e) }>
                        <input id='input-new-room' type="text" placeholder='Open new room' value={this.state.newRoom} onChange={this.handleFormChange}/>
                        <input type="submit" value="Add room" />
                    </form>
                </div>
                    <section className='db-rooms'>
                    {
                        this.state.rooms.map( (value, index) =>
                                <div className='room-number' style={{background: this.roomHighlight(value.name)}} value={value.name} onClick={() => this.handleClick(value)} key={value.key}>
                                    {value.name}
                                    {value.key === this.props.activeRoom.key ? 
                                        <div>
                                            <button id='rename-room' onClick={ () => this.renameRoom(this.props.activeRoom)}>Rename</button>
                                            <button id='delete-room' onClick={ () => this.removeRoom(this.props.activeRoom)}>Delete</button>
                                        </div> : "" } 
                                </div>
                        )
                    }
                </section>
            </section>
        );
    }
}

// const container = document.createElement("div");
// document.body.appendChild(container);
// ReactDOM.render(<Roomlist />, container);

export default RoomList;