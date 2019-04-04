import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import NewUserForm from "../components/forms/NewUserForm";

import teal from '@material-ui/core/colors/teal';
import purple from '@material-ui/core/colors/purple'
import cyan from '@material-ui/core/colors/cyan'

class newUser extends React.Component {
  constructor(props) {
    super();

    this.state = {
      type: "user",
      color: "primary",
      inputColor: teal
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = type => event => {
    let color;
    let inputColor;
    let eventValue = event.target.value;
    switch (eventValue) {
      case "user": {
        color = "primary";
        inputColor = teal;
        break;
      }
      case "voluntary": {
        color = "secondary";
        inputColor = purple;
        break;
      }
      case "partner": {
        color = "info";
        inputColor = cyan;
        break;
      }
      default: {
        color = "primary";
        inputColor = teal;
        break;
      }
    }
    this.setState({ [type]: event.target.value, color: color, inputColor: inputColor });
  };

  render() {
    return (
      <BaseLayout>
        <NewUserForm
          handleChange={this.handleChange}
          selectValue={this.state.type}
          color={this.state.color}
          inputColor={this.state.inputColor}
        />
      </BaseLayout>
    );
  }
}

export default newUser;
