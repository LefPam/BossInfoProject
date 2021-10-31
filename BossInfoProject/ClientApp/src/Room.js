import React, { Component } from 'react';
import { variables } from './Variables.js';

export class Room extends Component {

    constructor(props) {
        super(props);


        this.state = {
            rooms: []
        }
    }

    refreshList() {
        fetch(variables.API_URL + 'room')
            .then(response => response.json())
            .then(data => {
                this.setState({ rooms: data });
            })
    }

    componentDidMount() {
        this.refreshList();
    }


    render() {

        const { rooms } = this.state;


        return (
            <div>
                <table className="table table-striped" >
                    <thead>
                        <tr>
                            {/*<th>*/}
                            {/*    BookingID*/}
                            {/*</th>*/}
                            <th>
                                room id
                            </th>
                            <th>
                                Room Name
                            </th>
                            

                        </tr>
                    </thead>
                    <tbody>
                        {rooms.map(rm =>
                            <tr key={rm.RoomId}>
                                <td>{rm.RoomId}</td>
                                <td>{rm.RoomName}</td>
                               
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>

        )
    }


}