import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import NewUserForm from "../components/forms/NewUserForm";

class newUser extends React.Component {
  constructor(props) {
    super();

    this.state = {
      type: "user",
      color: "primary"
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = type => event => {
    let color;
    let eventValue = event.target.value;
    switch (eventValue) {
      case "user": {
        color = "primary";
        break;
      }
      case "voluntary": {
        color = "warning";
        break;
      }
      case "partner": {
        color = "info";
        break;
      }
      default: {
        color = "primary";
        break;
      }
    }
    this.setState({ [type]: event.target.value, color: color });
  };

  render() {
    return (
      <BaseLayout>
        <NewUserForm
          handleChange={this.handleChange}
          selectValue={this.state.type}
          color={this.state.color}
        />
      </BaseLayout>
    );
  }
}

export default newUser;
