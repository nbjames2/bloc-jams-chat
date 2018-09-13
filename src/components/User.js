import React from 'react';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            token: "",
            displayButton: 'Sign in'
        }
    }

    componentDidMount () {
        this.props.firebase.auth().onAuthStateChanged( user => {
            this.props.setUser(user)
        })
    }

    handleSignin() {
        this.props.firebase.auth().signInWithPopup( new this.props.firebase.auth.GoogleAuthProvider() );    
    }

    handleSignout() {
        this.props.firebase.auth().signOut();
    }

    render() {
        return(
            <section id='sign-in'>
                <div id='current-user'>{this.props.userAuth ? this.props.userAuth.displayName : 'Guest' }</div>
                <button className='userbuttons' id='sign-in-button' onClick={ this.props.userAuth ? () => this.handleSignout() : () => this.handleSignin() }>
                    Sign { this.props.userAuth ? 'out' : 'in' }
                </button>

            </section>
        )
    }
}

export default User;