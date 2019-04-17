import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

class InputWeekCheck extends React.Component {
    state = {
        checked: this.props.field.value
    }
    handleChange = event => {
      const {field, form} = this.props;
      const value = event.target.checked
      form.setFieldValue(field.name, value, true)
      this.setState({
            checked: value
        })
    }
  render() {
    const { field, form, labelText, value, ...other } = this.props;
    return (
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              checked={this.state.checked}
              onChange={this.handleChange}
              {...other}
            />
          }
          label={labelText}
        />
    );
  }
}

export default InputWeekCheck;
