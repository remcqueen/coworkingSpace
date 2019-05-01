import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import Form from "./common/form";
import { saveOrganisation } from "../services/organisationService";

class OrganisationForm extends Form {
  state = {
    data: {
      name: ""
    },
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string()
      .required()
      .label("Name")
  };

  doSubmit = async () => {
    try {
      await saveOrganisation(this.state.data);
      this.props.history.push("/buildings");
    } catch (error) {
      toast.error("Network Error - could not save Organisation");
    }
  };

  render() {
    return (
      <div>
        <h1>Organisation Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default OrganisationForm;
