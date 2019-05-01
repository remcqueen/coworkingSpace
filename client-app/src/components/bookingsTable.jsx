import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Table from './common/table';

class BookingsTable extends Component {
  columns = [
    {
      path: 'building.name',
      label: 'Building',
      content: booking => (
        <Link to={`/users/${booking.building._id}`}>{booking.building.name}</Link>
      ),
    },
    { path: 'room.name', label: 'Room' },
    { path: 'user.email', label: 'User' },
    {
      path: 'date',
      label: 'Date',
    },
    {
      key: 'delete',
      content: booking => (
        <button onClick={() => this.props.onDelete(booking)} className="btn btn-danger btn-sm">
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { bookings, onSort, sortColumn } = this.props;

    return <Table columns={this.columns} data={bookings} sortColumn={sortColumn} onSort={onSort} />;
  }
}

export default BookingsTable;
