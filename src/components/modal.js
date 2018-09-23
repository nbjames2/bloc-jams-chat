import React, { Component } from 'react';

class Modaladd extends Component {

    addName(name){
        console.log(name);
        this.props.addName(name);
    }

    render() {
        return(
            <section id='addprivateuser-main'>
                <ModalAdd show={this.props.showModal} hideModaladd={this.props.hideModal}>
                    {this.props.userList.map( (value) =>
                        <div key={value.key}>{value.displayName}
                        <button id='modaladdbutton' onClick={() => this.addName(value)}>Add</button></div>
                        )}
                </ModalAdd>
            </section>
        )
    }
}

const ModalAdd = ({ show, hideModaladd, children }) => {
    const showHideClassName = show ? "display-block" : "display-none";

    return (
        <div className={showHideClassName} id='modaladd-main'>
            <section className="modaladd-main">
                {children}
                <button id='modaladdclose' onClick={hideModaladd}>close</button>
            </section>
        </div>
    );
};

export default Modaladd;