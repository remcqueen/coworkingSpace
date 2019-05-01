import React, { Component } from "react";
import Table from "./common/table";

class UsersTable extends Component {
  columns = [
    { path: "fName", label: "First Name" },
    { path: "sName", label: "Second Name" },
    { path: "email", label: "Email" },
    { path: "business.name", label: "Business" }
  ];

  render() {
    const { users, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={users}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default UsersTable;
