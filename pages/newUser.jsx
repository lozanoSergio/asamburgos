import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import NewUserForm from "../components/forms/NewUserForm";

import teal from '@material-ui/core/colors/teal';
import purple from '@material-ui/core/colors/purple';
import cyan from '@material-ui/core/colors/cyan';

const INITIAL_PROFILE_VALUES = {
  firstName: "",
  surName1: "",
  surName2: "",
  email: "",
  birthDate: null,
  address: "",
  city: "",
  zipCode: "",
  numberPhone: "",
  parentName: "",
  parentSurname1: "",
  parentSurname2: "",
  contactPhone: "",
  notes: ""
};

const INITIAL_INSTALLMENTS_VALUES = {
  installments: "",
  accountNumber: "",
  startDate: null,
  endDate: null
}

class newUser extends React.Component {
  constructor(props) {
    super();

    this.state = {
      type: "user",
      color: "primary",
      inputColor: teal
    };

    this.handleChange = this.handleChange.bind(this);
    this.saveProfileData = this.saveProfileData.bind(this);
  }

  saveProfileData = (values, actions) => {
    console.log(values)
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
          initialProfileValues={INITIAL_PROFILE_VALUES}
          onSubmitProfile={this.saveProfileData}
          initialInstallmentsValues={INITIAL_INSTALLMENTS_VALUES}
        />
      </BaseLayout>
    );
  }
}

export default newUser;
