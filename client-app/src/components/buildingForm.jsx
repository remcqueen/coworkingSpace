import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { toast } from "react-toastify";
import { getBuilding, saveBuilding } from "../services/buildingService";
import { getOrganisations } from "../services/organisationService";
import { getAddress } from "../services/googleApiService";
import SearchBox from "./searchBox";

class BuildingForm extends Form {
  state = {
    data: {
      name: "",
      address: "",
      postcode: "",
      organisationId: ""
    },
    searchQuery: "",
    organisations: [],
    errors: {},
    errorMessage: false
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string()
      .required()
      .label("Name"),
    address: Joi.string()
      .required()
      .label("Address"),
    postcode: Joi.string()
      .required()
      .min(6)
      .max(8)
      .label("Postcode"),
    organisationId: Joi.string()
      .required()
      .label("Organisation")
  };

  async populateOrganisations() {
    try {
      const organisations = await getOrganisations();
      this.setState({ organisations });
    } catch (error) {
      toast.error("Network Error");
    }
  }

  async populateBuildings() {
    try {
      const buildingId = this.props.match.params.id;
      if (buildingId === "new") return;

      const building = await getBuilding(buildingId);
      this.setState({ data: this.mapToViewModel(building) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateOrganisations();
    await this.populateBuildings();
  }

  handleSearch = query => {
    this.setState({
      searchQuery: query
    });
    this.handlePrediction(query);
  };

  async handlePrediction(data) {
    try {
      const prediction = await getAddress(data);
      console.log(prediction);
      if (prediction.status === "OK" || "ZERO_RESULTS") {
        const result = prediction.candidates[0];
        const name = result.name;
        let address = result.formatted_address;
        let postcode = "";
        try {
          postcode = this.extractPostcode(address);
          address = address.replace(postcode, "");
        } catch (error) {
          postcode = "";
        }

        this.setState({
          data: {
            name: name,
            address: address,
            postcode: postcode
          }
        });
      } else {
        if (!this.state.errorMessage) {
          this.setState({ errorMessage: true });
          return toast.error(
            "Connection to googles API server could not be established"
          );
        }
      }
    } catch (error) {}
  }

  extractPostcode(address) {
    return address
      .split(",")
      .map(s => s.trim().match(/([A-Za-z]{1,2}\d{1,2})(\s?(\d?\w{2}))?/))
      .filter(e => e)[0][0];
  }

  mapToViewModel(building) {
    return {
      _id: building._id,
      name: building.name,
      address: building.address,
      postcode: building.postcode,
      organisationId: building.organisation._id
    };
  }

  doSubmit = async () => {
    try {
      await saveBuilding(this.state.data);
      this.props.history.push("/buildings");
    } catch (error) {
      toast.error("Network Error - unabe to sumbit building form");
    }
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <div>
        <h1>Building Form</h1>

        <label>
          The below search box is using Googles address lookup API to
          autocomplete the address fields:
        </label>
        <SearchBox value={searchQuery} onChange={this.handleSearch} />
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("address", "Address")}
          {this.renderInput("postcode", "Postcode")}
          {this.renderSelect(
            "organisationId",
            "Organisation",
            this.state.organisations
          )}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default BuildingForm;
