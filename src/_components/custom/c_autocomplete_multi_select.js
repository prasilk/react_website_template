import React, { Component } from "react";
import PropTypes from "prop-types";
import { Autocomplete } from "@material-ui/lab";
import { TextField, FormControlLabel, Checkbox } from "@material-ui/core";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import _ from "lodash";

//The Following AutoComplete component is designed to have debounce effect with 500 milliseconds interval
export class CAutocompleteMultiSelect extends Component {
  debounce = (e, fn) => {
    if (_.isFunction(fn)) {
      let value = e.target.value;
      let currentTarget = e.currentTarget;
      clearTimeout(this.typingTimer);
      this.typingTimer = setTimeout(() => fn(value, currentTarget), 500);
    }
  };

  render() {
    const {
      label,
      error,
      options,
      value,
      displayKey = "name",
      selectionKey = "id",
      helperText,
      onChange,
      onInputChange,
      ...other
    } = this.props;

    const _values = _.isEmpty(value) ? [] : value;
    const _options = _.isEmpty(options)
      ? []
      : [{ [displayKey]: "All", [selectionKey]: "_all_" }, ...options];
    return (
      <Autocomplete
        multiple
        onChange={(event, selection, reason) => {
          let selectedIds = _.map(selection, selectionKey);
          selectedIds =
            selectedIds.length === _options.length && reason === "select-option"
              ? []
              : selectedIds;
          onChange(
            selectedIds.includes("_all_")
              ? _.map(options, selectionKey)
              : selectedIds
          );
        }}
        renderOption={(option, status) => (
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                checkedIcon={<CheckBoxIcon fontSize="small" />}
                checked={_values.length === options.length || status.selected}
              />
            }
            label={option[displayKey]}
          />
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth={false}
            style={{ minWidth: 230 }}
            label={label}
            margin="dense"
          />
        )}
        getOptionLabel={(option) => {
          if (option) return option[displayKey];
        }}
        options={_options}
        value={
          _options.filter((option) => _values.includes(option[selectionKey])) ||
          null
        }
        {...other}
      />
    );
  }
}

CAutocompleteMultiSelect.propTypes = {
  loading: PropTypes.bool,
  options: PropTypes.array,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onInputChange: PropTypes.func,
};
