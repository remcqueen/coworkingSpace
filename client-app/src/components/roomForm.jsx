import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { toast } from "react-toastify";
import { saveRoom } from "../services/roomService";
import { getRoomTypes } from "../services/roomTypeService";
import { getBuildings } from "../services/buildingService";

class RoomForm extends Form {
  state = {
    data: {
      name: "",
      buildingId: "",
      capacity: "",
      roomTypeId: ""
    },
    roomTypes: [],
    buildings: [],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string()
      .required()
      .label("Room Name"),
    buildingId: Joi.string()
      .required()
      .label("Building"),
    capacity: Joi.number()
      .required()
      .max(100)
      .min(1)
      .label("Capacity"),
    roomTypeId: Joi.string()
      .required()
      .label("Room Type")
  };

  async populateBuildings() {
    const buildings = await getBuildings();
    this.setState({ buildings });
  }

  async populateRoomTypes() {
    const roomTypes = await getRoomTypes();
    this.setState({ roomTypes });
  }

  async componentDidMount() {
    await this.populateRoomTypes();
    await this.populateBuildings();
  }

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await saveRoom(data);
      this.props.history.push("/rooms");
    } catch (error) {
      toast.error("Network Error - could not save Room");
    }
  };

  render() {
    return (
      <div>
        <h1>Room Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderSelect("buildingId", "Building", this.state.buildings)}
          {this.renderInput("capacity", "Capacity")}
          {this.renderSelect("roomTypeId", "Room Type", this.state.roomTypes)}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default RoomForm;
