import React from 'react';
import Dashboard from './Dashboard';
import Modaladd from './modal';

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
          newName: "",
          privateName: "",
          showModal: false        
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
        if (this.state.show === true) {
            this.setState({ show: false });
        } else if (this.state.showModal === true) {
            this.setState({ showModal: false })
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const newRoomName = this.state.newRoom
        if (newRoomName !== "") {
            this.roomsRef.push({
                name: newRoomName,
                private: 'false'
            });
        this.setState({ newRoom: "" })

        }
    }

    handleFormChange = (e) => {
        this.setState({ newRoom: e.target.value });
    }

    handlePrivateFormChange = (e) => {
        this.setState({ privateName: e.target.value });
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
            const tempRooms = this.state.rooms.filter( (room) => room.key !== e.key);
            this.setState({ rooms: tempRooms });
        }
    }

    modalResult = (e) => {
        if (e !== "") {
            const active = this.props.activeRoom;
            this.roomsRef.child(active.key).update({ name: e});
            const index = this.state.rooms.findIndex(room => room.name === this.props.activeRoom.name);
            const tempRooms = [...this.state.rooms];
            tempRooms[index].name = e;
            this.setState({ rooms: tempRooms });
        }
    }
    
    adminForm() {
        if (this.props.admin === true) {
            return (
                <form onSubmit={ (e) => this.privateRoom(e) }>
                <input className='roominput' type="text" placeholder='Open private room' value={this.state.privateName} onChange={this.handlePrivateFormChange}/>
                <input type="submit" value="Add room" />
                </form>
            );
        }
    }

    privateRoom(e) {
        e.preventDefault();
        const newRoomName = this.state.privateName;
        if (newRoomName !== "") {
            this.roomsRef.push({
                name: newRoomName,
                private: 'true',
                members: ""
            });
            this.setState({ privateName: "" });
        }
    }

    displayRooms(room) {
        if (this.props.admin === true) {
            if (room.private) {
                if (room.key === this.props.activeRoom.key) {
                    return <div>{room.name + " **private**"}
                    <button id='addmember' onClick={() => this.selectMember()}>Add user</button></div>
                } else {
                    return <div>{room.name + " **private**"}</div>
                }
            } else {
                return room.name;
            }
        } else {
            if (!room.private) {
                return room.name;
            }
        }
    }
    
    selectMember = () => {
        this.setState({ showModal: true });
    }

    addName = (name) => {
        if (name !== "") {    
            const active = this.props.activeRoom;
            console.log(name.key);
            this.roomsRef.child(active.key).child('members').set(name.key);
        }
    }

    render() {
        return(
            <section id='roomlist'>
                {this.state.show ? <div><Dashboard
                    show={this.state.show}
                    modalMessage={this.state.modalMessage}
                    hideModal={() => this.hideModal()}
                    modalResult={(name) => this.modalResult(name)}
                /></div> : null }
                <div id='new-room-form'>              
                    <form onSubmit={ (e) => this.handleSubmit(e) }>
                        <input className='roominput' type="text" placeholder='Open new room' value={this.state.newRoom} onChange={this.handleFormChange}/>
                        <input type="submit" value="Add room" />
                    </form>
                    {this.adminForm()}
                </div>
                    <section className='db-rooms'>
                    {
                        this.state.rooms.map( (value, index) =>
                                <div className='room-number' style={{background: this.roomHighlight(value.name)}} value={value.name} onClick={() => this.handleClick(value)} key={value.key}>
                                    {this.displayRooms(value)}
                                    {value.key === this.props.activeRoom.key ? 
                                        <div>
                                            <button id='rename-room' onClick={ this.showModal}>Rename</button>
                                            <button id='delete-room' onClick={ () => this.removeRoom(this.props.activeRoom)}>Delete</button>
                                        </div> : "" } 
                                </div>
                        )
                    }
                </section>
                    {this.state.showModal ? <div><Modaladd
                        showModal={this.state.showModal}
                        hideModal={() => this.hideModal()}
                        addName={(name) => this.addName(name)}
                        userList={this.props.userList}
                    /></div> : null }
            </section>
        );
    }
}



export default RoomList;