/*import {tsConstructorType} from '@babel/types';*/
import React,{Component} from 'react';
import {variables} from './Variables.js';

export class Home extends Component{


    constructor(props) {
        super(props);


        this.state = {
            bookings: [],
            RoomFilter:"",
            bookingsWithoutFilter:[]
        }
    }

    FilterFn() {

        var RoomFilter = this.state.RoomFilter;

        var filteredData = this.state.bookingsWithoutFilter.filter(
            function (el) {
                return el.RoomName.toString().toLowerCase().includes(
                    RoomFilter.toString().trim().toLowerCase()
                )
            }
        );

        this.setState({ bookings: filteredData });

    }

    changeRoomNameFilter = (e) => {
        this.state.RoomFilter = e.target.value;
        this.FilterFn();
    }

    refreshList() {
        fetch(variables.API_URL + 'booking')
            .then(response => response.json())
            .then(data => {
                this.setState({ bookings:data,bookingsWithoutFilter:data });
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
                            <th>
                                Customer Name
                            </th>
                            <th>
                                <input className="form-control m-2"
                                    onChange={this.changeRoomNameFilter}
                                    placeholder="Filter" />
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