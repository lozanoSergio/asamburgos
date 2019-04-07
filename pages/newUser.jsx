import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import NewUserForm from "../components/forms/NewUserForm";
import { createUserProfile } from "../actions";

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
      error: undefined
    };

    this.saveProfileData = this.saveProfileData.bind(this);
  }

  saveProfileData = (userProfileData, { setSubmitting }) => {
    setSubmitting(true);
    userProfileData.type = "Participante"
    console.log(userProfileData)
    createUserProfile(userProfileData)
      .then(profile => {
        setSubmitting(false);
        this.setState({ error: undefined });
        Router.pushRoute("/");
      })
      .catch(err => {
        const error = err.message || "Server Error!";
        setSubmitting(false);
        this.setState({ error });
      });
  }

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
          newUser
        />
      </BaseLayout>
    );
  }
}

export default newUser;
