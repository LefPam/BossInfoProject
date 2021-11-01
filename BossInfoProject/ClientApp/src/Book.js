import React, { Component } from 'react';
import { Button, Row, Col, Form } from 'react-bootstrap';
import { variables } from './Variables.js';

export class Book extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            customerName: "",
            arrivalDate: "",
            departureDate: "",
            roomName: "",
            roomId: "",
            roomtest:""

        }

    }

    changeArrivalDate = (e) => {
        this.setState({ arrivalDate: e.target.value });
    }
    changeDepartureDate = (e) => {
        this.setState({ departureDate: e.target.value });
    }

    changeCustomerName = (e) => {
        this.setState({ customerName: e.target.value });
    }

    changeRoomName = (e) => {

        var tmpRoomObj = this.state.rooms.find((room) => room.RoomName == e.target.value);
        this.setState({ roomName: e.target.value });
        this.setState({ roomId: tmpRoomObj.RoomId });


    }


    componentDidMount() {
        fetch(variables.API_URL + 'room')
            .then(response => response.json())
            .then(data => {
                this.setState({ rooms: data });
            });
    }

    addBookingClick() {
        fetch(variables.API_URL + 'booking', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                customerName: this.state.customerName,
                arrivaldate: this.state.arrivalDate,
                departuredate: this.state.departureDate,
                roomid: parseInt(this.state.roomId, 10)
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
            }, (error) => {
                alert('Failed.');
            })
    }


    render() {
        const {
            arrivalDate,
            departureDate,
            roomName,
            roomId,
            customerName,
            rooms,
            roomtest
        } = this.state;
        return (
            <div className="container">
             
                <Col sm="10">
                <Form>
                    <Form.Group as={Row} controlId="ArrivalDate">
                        <Form.Label column sm="2"> From :  </Form.Label>
                             <Col sm="5">
                        <Form.Control
                           type="date"
                            name="ArrivalDate"
                            required
                            placeholder="Arrival Date"
                            value={arrivalDate}
                            onChange={this.changeArrivalDate}
                        />
                           </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="DepartureDate">
                        <Form.Label column sm="2"> Until :  </Form.Label>
                             <Col sm="5">
                        <Form.Control
                            type="date"
                            name="DepartureDate"
                            required
                            placeholder="Departure Date"
                            value={departureDate}
                            onChange={this.changeDepartureDate}
                        />
                           </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="CustomerName">
                        <Form.Label column sm="2"> Name : </Form.Label>
                           <Col sm="5">
                            <Form.Control
                                type="text"
                                name="CustomerName"
                                    required
                                    value={customerName}
                                    onChange={this.changeCustomerName}
                                 />
                        </Col>
                    </Form.Group>

                        <Form.Group as={Row} controlId="roomName">
                            <Form.Label column sm="2"> Choose a room: </Form.Label>
                            <Col sm="5">
                                <Form.Select value={roomName} onChange={this.changeRoomName}>
                                    {this.state.rooms.map(room =>
                                        <option key={room.RoomId}>{room.RoomName}</option>)}
                                </Form.Select>
                            </Col>
                        </Form.Group>
                
                   
                    <Form.Group as={Row} controlId="AddBooking" >
                        <Col sm="5">
                        <Button variant="primary" type="submit" onClick={() => this.addBookingClick()}>
                           
                                Add Booking
                           
                            </Button>
                        </Col>
                        </Form.Group>
                      
              
                    </Form>
                    </Col>
              
            </div>
        )
    }


}