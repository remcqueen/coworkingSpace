import React, { Component } from 'react';
import auth from '../services/authService';
import { Link } from 'react-router-dom';
import Table from './common/table';

class BuildingsTable extends Component {
  columns = [
    {
      path: 'name',
      label: 'Name',
      content: building => <Link to={`/users/${building._id}`}>{building.name}</Link>,
    },
    { path: 'organisation.name', label: 'Organisation' },
    { path: 'businesses', label: 'Businesses' },
    { path: 'occupants', label: 'Occupancy' },
  ];

  editColumn = {
    key: 'edit',
    content: building => (
      <Link to={`/buildings/${building._id}`}>
        <i className="fa fa-pencil-square-o" aria-hidden="true" />
      </Link>
    ),
  };

  deleteColumn = {
    key: 'delete',
    content: building => (
      <button onClick={() => this.props.onDelete(building)} className="btn btn-danger btn-sm">
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.editColumn, this.deleteColumn);
  }

  render() {
    const { buildings, onSort, sortColumn } = this.props;

    return (
      <Table columns={this.columns} data={buildings} sortColumn={sortColumn} onSort={onSort} />
    );
  }
}

export default BuildingsTable;
