import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withRouter } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { flexbox } from '@material-ui/system';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { version } from 'punycode';
import { retry } from 'redux-saga/effects';

const MyCard = styled(Card)({
    background: '#d2d2d4',
    border: 0,
    borderRadius: 3,
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    // // color: 'white',
    height: 125,
    width: 150,
    padding: 10,
    margin: 5,
    fontSize: 16,
    display: flexbox,
    textAlign: "center",
    fontFamily: 'PT Sans Narrow'
});

const styles = {
    palette: {
        backgroundColor: "teal",
        color: "white"
    },
    fab: {
        width: "100%",
        position: "fixed",
        bottom: "0",
        height: "21%",
        left: "0%",
        size: "large"

    },
    add: {
        color: "white",
        fontSize: "large"
    }
};

class AdminUserList extends Component {

    state = {
        listUser: [],
        newUserOpen: false,
        newPhilOpen: false,
        phil:'',
        username: '',
        password: '',
        selectedId: '',
        philosophy:''
    }


    addUser = (event) => {
        event.preventDefault();

        if (this.state.username && this.state.password) {
            this.props.dispatch({
                type: 'ADD_USER',
                payload: {
                    username: this.state.username,
                    password: this.state.password,
                },
            })
            this.handleNewUserClose();
            this.listUsers();
            // this.props.history.push('/adminviewuser');
        } else {
            this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
        }
    } // end registerUser

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        });
    }
    componentDidMount() {
        this.listUsers();
    }

    listUsers = () => {
        axios.get('/api/admin').then((response) => {
            console.log("grabbing user list:", response.data)
            this.setState({...this.state,
                listUser: response.data
            })
        })
    }

    handleNewUserOpen = () => {
        this.setState({...this.state,
        newUserOpen: true,
        })
      
    }

    handleNewUserClose = () => {
        this.setState({
            ...this.state,
            newUserOpen: false
        });
        this.listUsers();
        this.props.dispatch({ type: 'SET_TO_ADD_USER_MODE' });

    }


    addPhil = (event) => {
        event.preventDefault();
        if (this.state.philosophy) {
            this.props.dispatch({
                type: 'ADD_PHIL',
                payload: {
                    philosophy: this.state,
                },
            })
            this.handleNewPhilClose();
            // this.props.history.push('/adminviewuser');
        } return
    }

    handleInputChangeForPhil = propertyName => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        });
    }

    handleNewPhilOpen = () => {
        this.setState({
            newPhilOpen: true,
        })
    }

    handleNewPhilClose = () => {
        this.setState({
            newPhilOpen: false,
        });
    }

    fetchClientID = (event) => {
        this.props.dispatch({ type: 'ACCESS_USER_INFO', payload: event.target.value });
        this.props.history.push(`/adminviewuser/${event.target.value}`);
    }

    fetchClientIDPhil = (event) => {
        // this.props.dispatch({ type: 'ACCESS_USER_INFO', payload: event.target.value });
       console.log(event.target);
        this.setState({
            selectedId: event.target.value,
        });
        this.handleNewPhilOpen();
        this.state.listUser.forEach(element => {
            if (element.id == event.target.value)
                this.setState({
                    philosophy: element.philosophy
                })
                // return console.log('yay', element.philosophy);
                
        })
    }


    test = () => {
        console.log(this.state);
        
    }

    render() {
        return (
            <div className="clients-wrapper">
                {this.state.listUser.map((user) => {
                    if (user.active === true) {
                        if (user.name === null){
                            return (
                                <MyCard className="client-card-wrapper">
                                    <p><h1 className="client-header1">{user.username}</h1>
                                        <div className="client-profile-wrapper">
                                            <button className="clientCard" onClick={this.fetchClientID} value={user.id} >USER PROFILE</button>
                                        </div>
                                    </p>
                                </MyCard>
                            );
                        }
                        else {
                        return (
                                <MyCard className="client-card-wrapper">
                                <p><h1 className="client-header1">{user.name} ({user.username})</h1>
                                    <div className="client-profile-wrapper">
                                        <button className="clientCard" onClick={this.fetchClientID} value={user.id} >USER PROFILE</button>
                                        <div className="add-phil-wrapper">

                                            <button value={user.id} phil={user.philosophy} style={styles.palette} aria-label="PHIL" onClick={this.fetchClientIDPhil}>
                                               Phil 
                                            </button>
                                            <Dialog open={this.state.newPhilOpen} onClose={this.handleNewPhilClose}  >
                                                <DialogTitle id="form-dialog-title"><h1>Add New philosophy:</h1></DialogTitle>
                                                <DialogContent value={user.philosophy}>
                                                    {this.props.errors.registrationMessage && (
                                                        <h2
                                                            className="alert"
                                                            role="alert"
                                                        >
                                                            {this.props.errors.registrationMessage}
                                                        </h2>
                                                    )}
                                                    <form onSubmit={this.addPhil}>
                                                        <div>
                                                           
                                                            <label htmlFor="phil">
                                                                philosophy:
                                                                <input
                                                                    type="text"
                                                                    name="phil"
                                                                    placeholder={this.state.philosophy}
                                                                    value={this.state.philosophy}
                                                                    onChange={this.handleInputChangeForPhil('philosophy')}
                                                                    className="newPhilInput"
                                                                />
                                                            </label>
                                                        </div>
                                                        <div>
                                                            <input
                                                                className="addPhil"
                                                                type="submit"
                                                                name="submit"
                                                                value="ADD PHIL"
                                                                className="newUserBtns"
                                                            />
                                                            <input
                                                                type="button"
                                                                value="CANCEL"
                                                                className="newUserBtns"
                                                                onClick={(e) => this.handleNewPhilClose()}
                                                            />
                                                        </div>
                                                    </form>
                                                </DialogContent>
                                                {/* <DialogActions>
                            <button onClick={this.handleNewUserClose}>
                                CANCEL
                                        </button>
                            <button onClick={this.handleSubmit}>
                                YES
                                        </button>
                        </DialogActions> */}
                                            </Dialog>
                                        </div>
                                    </div>
                                </p>
                                </MyCard>
                        )
                        }
                    }
                })}
                <div className="add-client-wrapper">
                    <Fab style={styles.palette} aria-label="Add" onClick={() => this.handleNewUserOpen()}>
                        <AddIcon color={styles.palette.color} size="large" />
                    </Fab>
                    <Dialog open={this.state.newUserOpen} onClose={this.handleNewUserClose}>
                        <DialogTitle id="form-dialog-title"><h1>Add New User:</h1></DialogTitle>
                        <DialogContent>
                            {this.props.errors.registrationMessage && (
                                <h2
                                    className="alert"
                                    role="alert"
                                >
                                    {this.props.errors.registrationMessage}
                                </h2>
                            )}
                            <form onSubmit={this.addUser}>
                                <div>
                                    <label htmlFor="username">
                                        Name:
              <input
                                            type="text"
                                            name="username"
                                            value={this.state.username}
                                            onChange={this.handleInputChangeFor('username')}
                                            className="newUserInput"
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label htmlFor="password">
                                        Password:
              <input
                                            type="password"
                                            name="password"
                                            value={this.state.password}
                                            onChange={this.handleInputChangeFor('password')}
                                            className="newUserInput"
                                        />
                                    </label>
                                </div>
                                <div>
                                    <input
                                        className="adduser"
                                        type="submit"
                                        name="submit"
                                        value="ADD USER"
                                        className="newUserBtns"
                                    />
                                    <input
                                    type="button"
                                    value="CANCEL"
                                    className="newUserBtns"
                                    onClick={(e) => this.handleNewUserClose()}
                                    />
                                </div>
                            </form>
                        </DialogContent>
                        {/* <DialogActions>
                            <button onClick={this.handleNewUserClose}>
                                CANCEL
                                        </button>
                            <button onClick={this.handleSubmit}>
                                YES
                                        </button>
                        </DialogActions> */}
                    </Dialog>
            </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
        errors: state.errors,
});

export default withRouter(connect(mapStateToProps)(AdminUserList));