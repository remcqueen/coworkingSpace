import React from "react";
import { PropTypes } from "prop-types";

const Select = ({ name, label, options, error, ...rest }) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <select name={name} id={name} {...rest} className="form-control">
      <option value="" />
      {options.map(option => (
        <option key={option._id} value={option._id}>
          {option.name}
        </option>
      ))}
    </select>
    {error && <div className="alert alert-danger">{error}</div>}
  </div>
);

Select.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  error: PropTypes.objectOf(PropTypes.string)
};

Select.defaultProp = {
  items: []
};

export default Select;
