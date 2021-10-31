/*import {tsConstructorType} from '@babel/types';*/
import React,{Component} from 'react';
import {variables} from './Variables.js';

export class Home extends Component{


    constructor(props) {
        super(props);


        this.state = {
            bookings: []
        }
    }

    refreshList() {
        fetch(variables.API_URL + 'booking')
            .then(response => response.json())
            .then(data => {
                this.setState({ bookings: data });
            })
    }

    componentDidMount() {
        this.refreshList();
    }


    render() {

        const { bookings } = this.state;


        return (
            <div>
                <table className="table table-striped" >
                    <thead>
                        <tr>
                            {/*<th>*/}
                            {/*    BookingID*/}
                            {/*</th>*/}
                            <th>
                                Customer Name
                            </th>
                            <th>
                                Room Name
                            </th>
                            <th>
                                Arrival Date
                            </th>
                            <th>
                                Departure Date
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(bk =>
                            <tr key={bk.bookingId}>
                                {/*                        <td>{bk.bookingId}</td>*/}
                                <td>{bk.CustomerName}</td>
                                <td>{bk.RoomName}</td>
                                <td>{bk.ArrivalDate}</td>
                                <td>{bk.DepartureDate}</td>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>

        )
    }


}  