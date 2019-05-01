import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import Form from "./common/form";
import { getAllBusinesses } from "../services/businessService";
import { register } from "../services/userService";
import auth from "../services/authService";

class RegisterForm extends Form {
  state = {
    data: {
      fName: "",
      sName: "",
      email: "",
      password: "",
      businessId: ""
    },
    businesses: [],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    fName: Joi.string()
      .required()
      .label("First Name"),
    sName: Joi.string()
      .required()
      .label("Second Name"),
    email: Joi.string()
      .required()
      .label("Email"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
    businessId: Joi.string()
      .required()
      .label("Business")
  };

  async populateBusinesses() {
    try {
      const businesses = await getAllBusinesses();
      if (!businesses) {
        return;
      }
      this.setState({ businesses });
    } catch (error) {
      toast.error("Network Error");
    }
  }

  async componentDidMount() {
    await this.populateBusinesses();
  }

  doSubmit = async () => {
    try {
      const response = await register(this.state.data);
      auth.loginWithJwt(response.token);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("fName", "First Name")}
          {this.renderInput("sName", "Second Name")}
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderSelect("businessId", "Business", this.state.businesses)}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
