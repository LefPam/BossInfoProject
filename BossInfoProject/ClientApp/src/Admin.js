import React, { Component } from 'react';
import { variables } from './Variables.js';
import { Button, Row, Col, Form } from 'react-bootstrap';
import ReactDom from 'react-dom'

export class Admin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: ''
        };
    }

    onAddRoom = () => {
   
        let Roominfo = {
            RoomName: this.refs.RoomName.value
        };

        if (this.refs.RoomName.value.trim() == "") {
            this.setState({ message: 'Room name must be filled.' });
        }
        else {
            fetch(variables.API_URL + 'room', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(Roominfo)
            }).then(r => r.json()).then(res => {
                if (res) {
                    if (res == 'Failed') this.setState({ message: 'Room Already Exists.' });
                    else {
                        this.setState({ message: 'Room Saved Successfully.' });
                        this.refs.RoomName.value = "";

                    }

                }
            });
        }
    }

    resetMessageText = (e) => {
        this.setState({ message: '' });
    }

    render() {

        return (   
            <div>
                <p>
                    <label>RoomName : <input required onChange={this.resetMessageText} type="text" ref="RoomName"></input></label>
                </p>
                <button variant="outline-primary" onClick={this.onAddRoom}>Add Room</button>
                <p>{this.state.message}</p>
            </div>

        )
    }

}

const element = <Admin></Admin>
ReactDom.render(element, document.getElementById("root"));