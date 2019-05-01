import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { saveBusiness } from "../services/businessService";
import { getBuildings } from "../services/buildingService";
import { toast } from "react-toastify";

class BusinessForm extends Form {
  state = {
    data: {
      name: "",
      buildingId: this.props.match.params.id
    },
    buildings: [],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string()
      .required()
      .label("Name"),
    buildingId: Joi.string()
      .required()
      .label("Building")
  };

  async populateBuildings() {
    const buildings = await getBuildings();
    if (!buildings) {
      return;
    }
    this.setState({ buildings });
  }

  async componentDidMount() {
    await this.populateBuildings();
  }

  doSubmit = async () => {
    try {
      await saveBusiness(this.state.data);
      this.props.history.goBack();
    } catch (error) {
      toast.error("Network Error - could not save Business");
    }
  };

  render() {
    return (
      <div>
        <h1>Business Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderSelect("buildingId", "Building", this.state.buildings)}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default BusinessForm;
