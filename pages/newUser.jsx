import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import UserForm from "../components/forms/UserForm";
import { Router } from "../routes";
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
  disabilityType: "",
  disabilityLevel: "",
  parentName: "",
  parentSurname1: "",
  parentSurname2: "",
  contactPhone: "",
  notes: "",
  type: ""
};

const INITIAL_FEE_VALUES = {
  fee: "",
  accountNumber: "",
  startDate: null,
  endDate: null
}

class NewUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: undefined
    };

    this.saveProfileData = this.saveProfileData.bind(this);
    this.handler = this.handler.bind(this);
    
  }

  handler(type) {
    this.state ={userType: type}
  }

  saveProfileData = (userProfileData, { setSubmitting }) => {
    setSubmitting(true);
    userProfileData.type = this.state.userType;
    createUserProfile(userProfileData)
      .then(profile => {
        setSubmitting(false);
        this.setState({ error: undefined });
        Router.pushRoute(`/editar-perfil/${profile._id}`);
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
        <UserForm
          handlerAction={this.handler}
          initialProfileValues={INITIAL_PROFILE_VALUES}
          onSubmitProfile={this.saveProfileData}
          initialFeeValues={INITIAL_FEE_VALUES}
          newUser
        />
      </BaseLayout>
    );
  }
}

export default NewUser;
