import React, { Component } from "react";
import { PropTypes } from "prop-types";

class ListGroup extends Component {
  state = {};

  render() {
    const {
      items,
      textProperty,
      valueProperty,
      selectedItem,
      onItemSelect
    } = this.props;
    return (
      <div className="listgroup">
        <ul className="list-group">
          {items.map(item => (
            <li
              onClick={() => onItemSelect(item)}
              key={item[valueProperty]}
              className={
                item === selectedItem
                  ? "list-group-item active"
                  : "list-group-item"
              }
            >
              {item[textProperty]}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

ListGroup.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  textProperty: PropTypes.string,
  valueProperty: PropTypes.string,
  selectedItem: PropTypes.object,
  onItemSelect: PropTypes.func.isRequired
};

ListGroup.defaultProp = {
  items: []
};

export default ListGroup;
