import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import UserForm from "../components/forms/UserForm";
import { getUserProfileById } from "../actions";

const INITIAL_FEE_VALUES = {
  fee: "",
  accountNumber: "",
  startDate: null,
  endDate: null
}

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
  render() {
    const { profile } = this.props;
    return (
      <BaseLayout>
        <UserForm
          handlerAction={this.handler}
          initialProfileValues={profile}
          onSubmitProfile={this.saveProfileData}
          initialFeeValues={INITIAL_FEE_VALUES}
        />
      </BaseLayout>
    )
  }
}

export default EditUser;
