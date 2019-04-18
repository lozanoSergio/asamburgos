import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import UserForm from "../components/forms/UserForm";
import { Router } from "../routes";
import { getUserProfileById, updateProfile, updateFee } from "../actions";

const INITIAL_FEE_VALUES = {
  price: "",
  account: "",
  startDate: null,
  endDate: null
};

class EditUser extends React.Component {
  static async getInitialProps({ query }) {
    let profile = {};

    try {
      profile = await getUserProfileById(query.id);
    } catch (error) {
      console.log(error);
    }

    return { profile };
  }

  constructor(props) {
    super();
    this.state = {
      error: undefined
    };
    this.updateProfile = this.updateProfile.bind(this);
    this.updateFee = this.updateFee.bind(this);
    this.handler = this.handler.bind(this);
  }

  updateProfile(userProfileData, { setSubmitting }) {
    setSubmitting(true);
    console.log(userProfileData)
    userProfileData.type = this.state.userType;
    updateProfile(userProfileData)
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

  updateFee(userFee, { setSubmitting }) {
    setSubmitting(true);
    console.log(userFee)
    updateFee(this.props.profile, userFee)
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

  handler(type) {
    this.state ={userType: type}
  }

  render() {
    const { profile } = this.props;
    return (
      <BaseLayout>
        <UserForm
          handlerAction={this.handler}
          initialProfileValues={profile}
          onSubmitProfile={this.updateProfile}
          onSubmitFee={this.updateFee}
          initialFeeValues={profile.fee ? profile.fee : INITIAL_FEE_VALUES}
        />
      </BaseLayout>
    );
  }
}

export default EditUser;
