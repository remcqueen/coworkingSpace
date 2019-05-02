import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import Buildings from "./components/buildings";
import BuildingForm from "./components/buildingForm";
import OrganisationForm from "./components/organisationForm";
import Users from "./components/users";
import BusinessForm from "./components/businessForm";
import NotFound from "./components/notFound";
import ProtectedRoute from "./components/common/protectedRoute";
import RoomBooking from "./components/roomBooking";
import Bookings from "./components/bookings";
import RoomForm from "./components/roomForm";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {
    user: null
  };

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <ProtectedRoute path="/logout" component={Logout} />
            <ProtectedRoute path="/businesses/:id" component={BusinessForm} />
            <ProtectedRoute
              path="/organisations/:id"
              component={OrganisationForm}
            />
            <ProtectedRoute path="/users/:id" component={Users} />
            <ProtectedRoute path="/buildings/:id" component={BuildingForm} />
            <Route
              path="/buildings"
              render={props => <Buildings {...props} user={this.state.user} />}
            />
            <ProtectedRoute path="/rooms/new" component={RoomForm} />
            <ProtectedRoute path="/rooms" component={RoomBooking} />
            <ProtectedRoute path="/bookings" component={Bookings} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/buildings" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
