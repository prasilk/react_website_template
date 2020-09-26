import React, { Component } from "react";
import PropTypes from "prop-types";
import { Autocomplete } from "@material-ui/lab";
import { TextField, CircularProgress } from "@material-ui/core";
import _ from "lodash";

//The Following AutoComplete component is designed to have debounce effect with 500 milliseconds interval
export class CAutocompleteSingleSelect extends Component {
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
      helperText,
      displayKey = "name",
      selectionKey = "id",
      onChange,
      onInputChange,
      ...other
    } = this.props;
    const _options = _.isEmpty(options) ? [] : options;
    return (
      <Autocomplete
        onChange={(event, selection) =>
          onChange(selection ? selection[selectionKey] : null)
        }
        renderInput={(params) => (
          <TextField
            label={label}
            error={error}
            helperText={helperText}
            {...params}
            fullWidth
            onKeyUp={(e) => this.debounce(e, onInputChange)}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {this.props.loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
        getOptionLabel={(option) => {
          if (option) return option[displayKey];
        }}
        options={_options}
        value={
          _options.find((option) =>
            option ? option[selectionKey] === value : false
          ) || null
        }
        {...other}
      />
    );
  }
}

CAutocompleteSingleSelect.propTypes = {
  loading: PropTypes.bool,
  options: PropTypes.array,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onInputChange: PropTypes.func,
};
