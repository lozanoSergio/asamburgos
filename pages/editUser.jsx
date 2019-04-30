import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import UserForm from "../components/forms/UserForm";
import AlertDialog from "../components/Alerts/AlertDialog"
import withAuth from '../components/hoc/withAuth';
import Error from "./_error"
import { Router } from "../routes";
import {
  getUserProfileById,
  updateProfile,
  updateFee,
  getActivities,
  updateUserActivitiesAndServices,
  getServices,
  deleteUserProfile
} from "../actions";

const INITIAL_FEE_VALUES = {
  price: "",
  account: "",
  startDate: null,
  endDate: null
};

class EditUser extends React.Component {
  static async getInitialProps({ query, req }) {
    let profile = {};
    let activities = {};
    let services = {};
    let userActivities = [];
    let userServices = [];
    let error;

    try {
      profile = await getUserProfileById(req, query.id);
    } catch (err) {
      error = err.response.status;
    }

    try {
      activities = await getActivities(req);
    } catch (err) {
      error = err.response.status;
    }

    try {
      services = await getServices(req);
    } catch (err) {
      error = err.response.status;
    }

    if (
      typeof profile.activities !== "undefined" &&
      profile.activities.length > 0
    ) {
      userActivities = profile.activities;
    }

    if (
      typeof profile.services !== "undefined" &&
      profile.services.length > 0
    ) {
      userServices = profile.services;
    }

    return { profile, activities, services, userActivities, userServices, error };
  }

  constructor(props) {
    super(props);
    this.state = {
      activitiesIds: [],
      servicesIds: [],
      userType: this.props.profile.type,
      error: undefined,
      open: false
    };

    this.updateProfile = this.updateProfile.bind(this);
    this.updateFee = this.updateFee.bind(this);
    this.updateUserActivitiesAndServices = this.updateUserActivitiesAndServices.bind(
      this
    );
    this.handlerSelectType = this.handlerSelectType.bind(this);
    this.handleActivityAutocomplete = this.handleActivityAutocomplete.bind(
      this
    );
    this.handleServiceAutocomplete = this.handleServiceAutocomplete.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this)
  }

  componentDidMount() {
    const { userActivities, userServices } = this.props;

    if (typeof userActivities !== "undefined" && userActivities.length > 0) {
      this.setState({ activitiesIds: userActivities });
    }

    if (typeof userServices !== "undefined" && userServices.length > 0) {
      this.setState({ servicesIds: userServices });
    }
  }

  updateProfile(userProfileData, { setSubmitting }) {
    setSubmitting(true);
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
    const {profile} = this.props;
    updateFee(profile, userFee)
      .then(result => {
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

  updateUserActivitiesAndServices(data, { setSubmitting }) {
    setSubmitting(true);

    data = {
      activities: this.state.activitiesIds,
      services: this.state.servicesIds
    };

    updateUserActivitiesAndServices(this.props.profile, data)
      .then(result => {
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

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleAccept = () => {
    const id = this.props.profile._id;
    if (id !== (null || undefined)) {
      this.deleteUserProfile(id);
    }
  };

  deleteUserProfile(userId) {
    deleteUserProfile(userId).then(() => {
      Router.pushRoute("/");
    })
    .catch(err => console.error(err));
  }

  handlerSelectType(type) {
    this.setState({ userType: type });
  }

  handleActivityAutocomplete(values) {
    this.setState({activitiesIds: values})
  }

  handleServiceAutocomplete(values) {
    this.setState({servicesIds: values})
  }

  render() {
    const {
      profile,
      activities,
      services,
      userActivities,
      userServices,
      error
    } = this.props;


    if (error) {
      return (
        <BaseLayout>
          <Error errorCode={error} />
        </BaseLayout>
      );
    }

    return (
      <BaseLayout>
        <UserForm
          handlerSelectType={this.handlerSelectType}
          initialProfileValues={profile}
          onSubmitProfile={this.updateProfile}
          deleteUserProfile={this.handleClickOpen}
          onSubmitFee={this.updateFee}
          onSubmitActivitiesAndServicies={this.updateUserActivitiesAndServices}
          initialFeeValues={profile.fee ? profile.fee : INITIAL_FEE_VALUES}
          activities={activities}
          services={services}
          userActivities={userActivities}
          userServices={userServices}
          handleActivityAutocomplete={this.handleActivityAutocomplete}
          handleServiceAutocomplete={this.handleServiceAutocomplete}
        />
        <AlertDialog
          id="eliminar-perfil"
          title="Eliminar Perfil"
          description="¿Desea eliminar permanentemente este perfil? Esta acción no se puede deshacer."
          open={this.state.open}
          handleClose={this.handleClose}
          handleAccept={this.handleAccept}
        />
      </BaseLayout>
    );
  }
}

export default withAuth("admin")(EditUser);
