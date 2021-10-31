import React, { Component } from 'react';
import { variables } from './Variables.js';

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


    createClick() {
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
                //this.refreshList();
            }, (error) => {
                alert('Failed. Be sure that there is no other room with the same name.');
            })
    }



    render() {

        const {     
            RoomName
        } = this.state;

        return (      
            <form>

                <div className="input-group mb-3">
                    <span className="input-group-text">Room</span>
                    <input type="text" className="form-control" value={RoomName}
                    onChange={this.changeRoomName} />                                 
                </div>
                <button type="button"
                    className="btn btn-primary"
                    onClick={() => this.createClick()}
                >Add Room</button>
            </form>

        )
    }


}