import React, { Component } from 'react';
import { Button, Row, Col, Form } from 'react-bootstrap';
import { variables } from './Variables.js';
import ReactDom from 'react-dom'

export class Book extends Component {

    constructor(props) {
        super(props);

        this.state = {
            rooms: [],
            // tmpRoomId: "",
            message: ''
        };
    }

    resetMessageText = (e) => {
        this.setState({ message: '' });
    }


    componentDidMount() {
        fetch(variables.API_URL + 'room')
            .then(response => response.json())
            .then(data => {
                this.setState({ rooms: data });
            });
    }

    addBookingClick() {

        var tmpRoomObj = this.state.rooms.find((room) => room.RoomName == this.refs.RoomId.value);

        let BookInfo = {
            ArrivalDate: this.refs.ArrivalDate.value,
            DepartureDate: this.refs.DepartureDate.value,
            CustomerName: this.refs.CustomerName.value,
            RoomId: tmpRoomObj.RoomId
        };

        if (this.refs.ArrivalDate.value.trim() == "" || this.refs.DepartureDate.value.trim() == "" || this.refs.CustomerName.value.trim() == "" || this.refs.RoomId.value.trim() == "") {
            this.setState({ message: 'You must fill all the information in order to complete the booking.' });
        }
        else {

            fetch(variables.API_URL + 'booking', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(BookInfo)
            }).then(r => r.json()).then(res => {
                if (res) {
                    this.setState({ message: 'Booking Saved Successfully.' });
                    this.refs.ArrivalDate.value = "";
                    this.refs.DepartureDate.value = "";
                    this.refs.CustomerName.value = "";
                }
                else {
                    this.setState({ message: 'Failed to save Booking.' });
                }
            });
        }
    }

    render() {
 
        return (

            <div>
                <p>
                    <label>From : <input onChange={this.resetMessageText} style={{ width: '374px' }} type="date" ref="ArrivalDate"></input></label>
                </p>
                <p>
                    <label>Until : <input onChange={this.resetMessageText} style={{ width: '378px' }}  type="date" ref="DepartureDate"></input></label>
                </p>
                <p>
                    <label>Customer Name : <input onChange={this.resetMessageText} style={{ width: '296px' }} type="text"  ref="CustomerName"></input></label>
                </p>
                <p>
                    <label>Room Name : <select onChange={this.resetMessageText} style={{ width: '322px' }} type="select" ref="RoomId" >
                            {this.state.rooms.map(room =><option id={room.RoomId}>{room.RoomName}</option>)}
                        </select>

                    </label>
                </p>
                <button onClick={() => this.addBookingClick()} variant="outline-primary"> Add Booking </button>
                <p>{this.state.message}</p>
            </div>


        )
    }


}

const element = <Book></Book>
ReactDom.render(element, document.getElementById("root"));