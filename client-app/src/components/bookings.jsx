import React, { Component } from "react";
import { toast } from "react-toastify";
import _ from "lodash";
import BookingsTable from "./bookingsTable";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { getBookings, deleteBooking } from "../services/bookingService";
import { getBuildings } from "../services/buildingService";
import { paginate } from "../utils/paginate";

class Bookings extends Component {
  state = {
    bookings: [],
    buildings: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedBuilding: null,
    sortColumn: { path: "name", order: "asc" }
  };

  async componentDidMount() {
    try {
      const bookings = await getBookings();
      const data = await getBuildings();
      const selectedBuilding = { _id: "", name: "All Buildings" };
      const buildings = [selectedBuilding, ...data];
      this.setState({ bookings, buildings, selectedBuilding });
    } catch (error) {
      return toast.error("Network Error");
    }
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleBuildingSelect = building => {
    this.setState({
      selectedBuilding: building,
      searchQuery: "",
      currentPage: 1
    });
  };

  handleSearch = query => {
    this.setState({
      searchQuery: query,
      selectedBuilding: null,
      currentPage: 1
    });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleDelete = async booking => {
    const { booking: originalBookings } = this.state;
    try {
      const bookings = originalBookings.filter(b => b._id !== booking._id);
      this.setState({ bookings });
    } catch (error) {
      return toast.error(
        "Could not delete booking from building that no longer exists"
      );
    }

    try {
      await deleteBooking(booking._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This booking has already been deleted.");

      this.setState({ buildings: originalBookings });
    }
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedBuilding,
      searchQuery,
      bookings: allBookings
    } = this.state;

    let filtered = allBookings;
    if (searchQuery)
      filtered = allBookings.filter(b =>
        b.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedBuilding && selectedBuilding._id)
      filtered = allBookings.filter(
        b => b.building._id === selectedBuilding._id
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const bookings = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: bookings };
  };

  render() {
    const { length: count } = this.state.bookings;
    const { pageSize, currentPage, sortColumn } = this.state;

    if (count === 0) return <p>There are no bookings in the database.</p>;

    const { totalCount, data: bookings } = this.getPagedData();
    return (
      <div className="row">
        <div className="col">
          <ListGroup
            items={this.state.buildings}
            selectedItem={this.state.selectedBuilding}
            onItemSelect={this.handleBuildingSelect}
          />
        </div>
        <div className="col">
          <BookingsTable
            bookings={bookings}
            onSort={this.handleSort}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
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

export default Bookings;
