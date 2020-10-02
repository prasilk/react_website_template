import React from "react";
import { Button, Paper } from "@material-ui/core";
import { apiService } from "../../../_services";
import {
  CAutocompleteMultiSelect,
  CAutocompleteSingleSelect,
  CComponent,
} from "../../../_components/custom";

export class Child1 extends CComponent {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      cities: [],
      selectedEmployee: null,
      selectedCities: [],
    };
  }
  componentDidMount() {
    this.props.updateHeader("Child 1");
    apiService
      .get("http://dummy.restapiexample.com/api/v1/employees", {}, true)
      .then((res) => {
        this.updateState({ employees: res.data.data });
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <CAutocompleteSingleSelect
          style={{ width: 230 }}
          label="Employees"
          displayKey="employee_name"
          selectionKey="id"
          options={this.state.employees}
          value={this.state.selectedEmployee}
          onChange={(selectedId) => {
            this.updateState({ selectedEmployee: selectedId });
            alert("Seleced ID: " + selectedId);
          }}
        />
        <CAutocompleteMultiSelect
          label="Employees"
          displayKey="employee_name"
          selectionKey="id"
          options={this.state.employees}
          value={this.state.selectedEmployees}
          onChange={(selectedId) => {
            this.updateState({ selectedEmployees: selectedId });
          }}
        />
      </Paper>
    );
  }
}
