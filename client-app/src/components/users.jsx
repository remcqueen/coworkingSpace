import React, { Component } from "react";
import { Link } from "react-router-dom";
import UsersTable from "./usersTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { getUsers } from "../services/userService";
import { getBusinesses } from "../services/businessService";
import auth from "../services/authService";
import { paginate } from "../utils/paginate";
import _ from "lodash";

class Users extends Component {
  state = {
    users: [],
    businesses: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedBusiness: null,
    sortColumn: { path: "name", order: "asc" }
  };

  async componentDidMount() {
    const buildingId = this.props.match.params.id;
    const selectedBusiness = { _id: "", name: "All Businesses" };
    try {
      const data = await getBusinesses(buildingId);
      const businesses = [selectedBusiness, ...data];

      const users = await getUsers(buildingId);
      this.setState({ users, businesses, selectedBusiness });
    } catch (error) {
      this.props.history.replace("/notFound");
    }
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleBusinessSelect = business => {
    this.setState({
      selectedBusiness: business,
      searchQuery: "",
      currentPage: 1
    });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedBusiness,
      users: allUsers
    } = this.state;

    let filtered = allUsers;
    if (selectedBusiness && selectedBusiness._id)
      filtered = allUsers.filter(m => m.business._id === selectedBusiness._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const users = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: users };
  };

  render() {
    const { pageSize, currentPage, sortColumn } = this.state;
    const { totalCount, data: users } = this.getPagedData();
    const user = auth.getCurrentUser();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.businesses}
            selectedItem={this.state.selectedBusiness}
            onItemSelect={this.handleBusinessSelect}
          />
        </div>
        <div className="col">
          {user && user.isAdmin && (
            <Link
              to={`/businesses/${this.props.match.params.id}`}
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Business
            </Link>
          )}
          <p>Showing {totalCount} users in the database.</p>
          <UsersTable
            users={users}
            sortColumn={sortColumn}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Users;
