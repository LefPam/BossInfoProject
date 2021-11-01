import React, { Component } from 'react';
import { variables } from './Variables.js';
import { Button, Row, Col, Form } from 'react-bootstrap';

export class Admin extends Component {
    constructor(props) {
        super(props);

        this.state = {      
            RoomName: "",        
        }
    }

    changeRoomName = (e) => {
        this.setState({ RoomName: e.target.value });
    }


    saveRoom() {
        if (this.state.RoomName == "") {
            alert('Fill all the required fields.');
        }
        else {
            fetch(variables.API_URL + 'room', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    RoomName: this.state.RoomName
                })
            })
                .then(res => res.json())
                .then((result) => {
                    alert(result);
                }, (error) => {
                    alert('Room Name must be unique');
                })
        }
    }



    render() {

        const {     
            RoomName
        } = this.state;

        return (      
            <div className="container">
                <Col sm="10">
                    <Form>
                        <Form.Group as={Row} controlId="RoomName">
                            <Form.Label column sm="2"> Room : </Form.Label>
                            <Col sm="5">
                                <Form.Control
                                    type="text"
                                    name="RoomName"
                                    required
                                    value={RoomName}
                                    onChange={this.changeRoomName}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="AddRoom" >
                            <Col sm="5">
                                <Button variant="primary" type="submit" onClick={() => this.saveRoom()}>
                                    Add Room
                                </Button>
                            </Col>
                        </Form.Group>


                    </Form>
                </Col>

            </div>

        )
    }


}