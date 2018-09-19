import React from 'react';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            nameDisplayed: "",
            displayButton: 'Sign in'
        }
    }

    componentDidMount () {
        this.props.firebase.auth().onAuthStateChanged( user => {
            this.props.setUser(user)
            let admin = false;
            if (user) {
                let userRef = this.props.firebase.database().ref('admin');
                userRef.on('child_added', snapshot => {
                    const userkey = snapshot.val();
                    if (userkey === user.uid) {
                        admin = true;
                    }
                    console.log(userkey);
                    console.log(user.uid);
                    console.log(admin);
                    if (admin) {
                        this.setState({ nameDisplayed: user.displayName + ' Admin' });
                    } else {
                        this.setState({ nameDisplayed: user.displayName });
                    }
                }); 
            }
        });
    }

    handleSignin() {
        this.props.firebase.auth().signInWithPopup( new this.props.firebase.auth.GoogleAuthProvider() );
    }

    handleSignout() {
        this.props.firebase.auth().signOut();
        this.setState({ admin: false });
    }

    renderAdmin(user) {
            console.log(user);
            
        }

    render() {
        return(
            <section id='sign-in'>
                <div id='current-user'>{this.props.userAuth ? this.state.nameDisplayed : 'Guest' }</div>
                <button className='userbuttons' id='sign-in-button' onClick={ this.props.userAuth ? () => this.handleSignout() : () => this.handleSignin() }>
                    Sign { this.props.userAuth ? 'out' : 'in' }
                </button>

            </section>
        )
    }
}

export default User;