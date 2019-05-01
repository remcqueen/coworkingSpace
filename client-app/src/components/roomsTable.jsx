import React, { Component } from 'react';
import auth from '../services/authService';
import Table from './common/table';

class RoomsTable extends Component {
  columns = [
    { path: 'name', label: 'Room' },
    { path: 'capacity', label: 'Capacity' },
    { path: 'roomType.name', label: 'Room Type' },
    {
      key: 'book',
      content: room => (
        <button className="btn" onClick={() => this.props.onBook(room)}>
          <i className="fa fa-book" aria-hidden="true" />
        </button>
      ),
    },
  ];

  deleteColumn = {
    key: 'delete',
    content: room => (
      <button onClick={() => this.props.onDelete(room)} className="btn btn-danger btn-sm">
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

  render() {
    const { rooms, onSort, sortColumn } = this.props;

    return <Table columns={this.columns} data={rooms} sortColumn={sortColumn} onSort={onSort} />;
  }
}

export default RoomsTable;
