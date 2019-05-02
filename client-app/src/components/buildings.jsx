import React, { Component } from "react";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import { toast } from "react-toastify";
import _ from "lodash";
import RoomsTable from "./roomsTable";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { getRoomFrom, deleteRoom } from "../services/roomService";
import { getRoomTypes } from "../services/roomTypeService";
import { makeBooking } from "../services/bookingService";
import { paginate } from "../utils/paginate";
import auth from "../services/authService";
import SearchBox from "./searchBox";
import { getBuildingFrom } from "../services/buildingService";

class RoomBooking extends Component {
  state = {
    rooms: [],
    roomTypes: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedRoomType: null,
    date: null,
    sortColumn: { path: "name", order: "asc" },
    user: null,
    building: null
  };

  async componentDidMount() {
    const user = auth.getCurrentUser();
    if (!user) {
      return;
    }
    try {
      const building = await getBuildingFrom(user.businessId);
      const data = await getRoomTypes();
      const selectedRoomType = { _id: "", name: "All Room Types" };
      const roomTypes = [selectedRoomType, ...data];

      const rooms = await getRoomFrom(building._id);
      this.setState({ rooms, roomTypes, user, building, selectedRoomType });
    } catch (error) {
      toast.error("Network Error");
    }
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleRoomTypeSelect = roomType => {
    this.setState({
      selectedRoomType: roomType,
      searchQuery: "",
      currentPage: 1
    });
  };

  handleSearch = query => {
    this.setState({
      searchQuery: query,
      selectedOrganisation: null,
      currentPage: 1
    });
  };

  handleDateChange = date => {
    this.setState({ date });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleRoomBook = async room => {
    const { user, date, building } = this.state;
    if (!date) {
      return toast.error("Please select a date to book the room.");
    }
    const year = date.getFullYear();
    let month = 1 + date.getMonth();
    month = month > 9 ? month : "0" + month;
    let day = date.getDate();
    day = day > 9 ? day : "0" + day;
    const standardDate = year + "-" + month + "-" + day;

    const data = {
      userId: user._id,
      roomId: room._id,
      buildingId: building._id,
      date: standardDate
    };

    try {
      await makeBooking(data);
      return toast("Booking successfuly made");
    } catch (ex) {
      return toast.error("This room could not be booked on this date");
    }
  };

  handleDelete = async room => {
    const originalRooms = this.state.rooms;
    const rooms = originalRooms.filter(r => r._id !== room._id);
    this.setState({ rooms });

    try {
      await deleteRoom(room._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This room has already been deleted.");

      this.setState({ rooms: originalRooms });
    }
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedRoomType,
      searchQuery,
      rooms: allRooms
    } = this.state;

    let filtered = allRooms;
    if (searchQuery)
      filtered = allRooms.filter(b =>
        b.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedRoomType && selectedRoomType._id)
      filtered = allRooms.filter(m => m.roomType._id === selectedRoomType._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const rooms = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: rooms };
  };

  render() {
    const { length: count } = this.state.rooms;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { user } = this.props;

    if (count === 0)
      return <p>There are no rooms in the database for this building.</p>;

    const { totalCount, data: rooms } = this.getPagedData();

    return (
      <div className="row ">
        <div className="col">
          {user && (
            <Link
              to="/buildings/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Building
            </Link>
          )}
          <p>Showing {totalCount} buildings in the database.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <RoomsTable
            rooms={rooms}
            onSort={this.handleSort}
            sortColumn={sortColumn}
            onBook={this.handleRoomBook}
            onDelete={this.handleDelete}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
        <div className="col">
          <ListGroup
            items={this.state.roomTypes}
            selectedItem={this.state.selectedRoomType}
            onItemSelect={this.handleRoomTypeSelect}
          />
          <Calendar
            onChange={this.handleDateChange}
            value={this.state.date}
            minDate={new Date()}
            calendarType="ISO 8601"
          />
        </div>
      </div>
    );
  }
}

export default RoomBooking;

