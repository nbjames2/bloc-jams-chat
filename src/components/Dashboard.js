import React, { Component } from "react";

class Dashboard extends Component {
    state = { newName: this.props.messageContent || "" }

    onNameChange = (e) => {
        this.setState({ newName: e.target.value });
    }

    newName = (e) => {
        e.preventDefault();
        const roomname = this.state.newName;
        if (roomname) {
            this.props.modalResult(roomname);
            this.setState({ newName: "" });
            this.props.hideModal();
        }
    }

    render() {
        return(
            <section id='modal-main'>
                <Modal show={this.props.show} hideModal={this.props.hideModal}>
                    <form>
                        <div id='modaltitle'><label>{this.props.modalMessage}</label></div>
                        <input type="text" placeholder='enter new name' value={this.state.newName} onChange={this.onNameChange}/>
                        <input type="submit" value="Submit" onClick={this.newName} />
                    </form>
                </Modal>
            </section>
        );
    }
}

const Modal = ({ show, hideModal, children }) => {
    const showHideClassName = show ? "display-block" : "display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                {children}
                <button id='modalClose' onClick={hideModal}>close</button>
            </section>
        </div>
    );
};

export default Dashboard;