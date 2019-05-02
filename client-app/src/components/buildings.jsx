import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import BuildingsTable from "./buildingsTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { getBuildings, deleteBuilding } from "../services/buildingService";
import { getOrganisations } from "../services/organisationService";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBox from "./searchBox";

class Buildings extends Component {
  state = {
    buildings: [],
    organisations: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedOrganisation: null,
    sortColumn: { path: "name", order: "asc" }
  };

  async componentDidMount() {
    try {
      const data = await getOrganisations();
      if (!data) {
        return;
      }
      const selectedOrganisation = { _id: "", name: "All Organisations" };
      const organisations = [selectedOrganisation, ...data];
      const buildings = await getBuildings();
      this.setState({ buildings, organisations, selectedOrganisation });
    } catch (error) {
      toast.error("Network Error");
    }
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleOrganisationSelect = organisation => {
    this.setState({
      selectedOrganisation: organisation,
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

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleDelete = async building => {
    const originalBuildings = this.state.buildings;
    const buildings = originalBuildings.filter(b => b._id !== building._id);
    this.setState({ buildings });

    try {
      await deleteBuilding(building._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This building has already been deleted.");

      this.setState({ buildings: originalBuildings });
    }
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedOrganisation,
      searchQuery,
      buildings: allBuildings
    } = this.state;

    let filtered = allBuildings;
    if (searchQuery)
      filtered = allBuildings.filter(b =>
        b.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedOrganisation && selectedOrganisation._id)
      filtered = allBuildings.filter(
        m => m.organisation._id === selectedOrganisation._id
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const buildings = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: buildings };
  };

  render() {
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { user } = this.props;

    const { totalCount, data: buildings } = this.getPagedData();

    return (
      <div className="row">
        <div className="col">
          {user && user.isAdmin && (
            <React.Fragment>
              <Link to="/buildings/new" className="btn btn-primary topButton">
                New Building
              </Link>
              <Link
                to="/organisations/new"
                className="btn btn-primary topButton"
              >
                New Organisation
              </Link>
            </React.Fragment>
          )}
          {<p>Showing {totalCount} buildings in the database.</p>}
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <BuildingsTable
            buildings={buildings}
            sortColumn={sortColumn}
            onSort={this.handleSort}
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
            items={this.state.organisations}
            selectedItem={this.state.selectedOrganisation}
            onItemSelect={this.handleOrganisationSelect}
          />
        </div>
      </div>
    );
  }
}

export default Buildings;
