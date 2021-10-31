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
           
        //this.handleSubmit = this.handleSubmit.bind(this);
        //this.handleFileSelected = this.handleFileSelected.bind(this);
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
        //this.setState({ roomName: e.target.value });



        //this.setState({ roomId: e.target.option.id });

        //this.state.roomId = "2";
       
        //this.setState.roomtest = this.state.rooms.find((room) => room.roomName == e.target.value);
        
        //alert(roomtest.roomId)
        //this.setState.roomId = roomtest.roomId;


        var test = this.state.rooms.find((room) => room.roomName == e.target.value);
        this.setState({ roomName: e.target.value });
        this.setState({ roomId: test.roomId });


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
                //roomid: 2
                roomid: parseInt(this.state.roomId, 10)
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                //this.refreshList();
            }, (error) => {
                alert('Failed. Be sure that there is no other room with the same name.');
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
                        <Form.Label column sm="2"> Arrival Date :  </Form.Label>
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
                        <Form.Label column sm="2"> Departure Date :  </Form.Label>
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
                        <Form.Label column sm="2"> Customer Name : </Form.Label>
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
                            <Form.Label column sm="2"> Room Name: </Form.Label>
                            <Col sm="5">
                                <Form.Control as="select" aria-label="Default select example" value={roomName} onChange={this.changeRoomName}>
                                    {this.state.rooms.map(room =>
                                        <option key={room.roomId}>{room.roomName}</option>)}
                                </Form.Control>
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