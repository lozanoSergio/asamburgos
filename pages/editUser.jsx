import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import UserForm from "../components/forms/UserForm";
import { Router } from "../routes";
import {
  getUserProfileById,
  updateProfile,
  updateFee,
  getActivities,
  updateUserActivitiesAndServices,
  getServices
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

    try {
      profile = await getUserProfileById(query.id);
    } catch (error) {
      console.log(error);
    }

    try {
      activities = await getActivities(req);
    } catch (err) {
      console.log(err);
    }

    try {
      services = await getServices(req);
    } catch (err) {
      console.log(err);
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

    return { profile, activities, services, userActivities, userServices };
  }

  constructor(props) {
    super(props);
    this.state = {
      activitiesIds: [],
      servicesIds: [],
      userType: "",
      error: undefined
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
    updateFee(this.props.profile, userFee)
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

    console.log(this.state);

    updateUserActivitiesAndServices(this.props.profile, data)
      .then(result => {
        setSubmitting(false);
        this.setState({ error: undefined });
        //Router.pushRoute("/");
      })
      .catch(err => {
        const error = err.message || "Server Error!";
        setSubmitting(false);
        this.setState({ error });
      });
  }

  handlerSelectType(type) {
    this.setState({ userType: type });
  }

  handleActivityAutocomplete(values, action) {
    const { activities } = this.props;
    let activitiesIds = this.state.activitiesIds;

    if (action === "remove") {
      this.setState(state => {
        const activitiesIds = [...state.activitiesIds];
        activitiesIds.splice(activitiesIds.indexOf(values[0]), 1);
        return { activitiesIds };
      });
    }

    if (activitiesIds.length < 1) {
      activities &&
        activities.filter(activity => {
          if (values.indexOf(activity.name) > -1) {
            activitiesIds.push({ id: activity._id, name: activity.name });
          }
        });
      this.setState({ activitiesIds });
    } else {
      activitiesIds = [];
      activities &&
        activities.filter(activity => {
          if (values.indexOf(activity.name) > -1) {
            activitiesIds.push({ id: activity._id, name: activity.name });
          }
        });
      this.setState({ activitiesIds });
    }
  }

  handleServiceAutocomplete(values, action) {
    const { services } = this.props;
    let servicesIds = this.state.servicesIds;

    if (action === "remove") {
      this.setState(state => {
        const servicesIds = [...state.servicesIds];
        servicesIds.splice(servicesIds.indexOf(values), 1);
        return { servicesIds };
      });
    }

    if (servicesIds.length < 1) {
      services &&
        services.filter(service => {
          if (values.indexOf(service.name) > -1) {
            servicesIds.push({ id: service._id, name: service.name });
          }
        });
      this.setState({ servicesIds });
    } else {
      servicesIds = [];
      services &&
        services.filter(service => {
          if (values.indexOf(service.name) > -1) {
            servicesIds.push({ id: service._id, name: service.name });
          }
        });
      this.setState({ servicesIds });
    }
  }

  render() {
    const {
      profile,
      activities,
      services,
      userActivities,
      userServices
    } = this.props;

    return (
      <BaseLayout>
        <UserForm
          handlerSelectType={this.handlerSelectType}
          initialProfileValues={profile}
          onSubmitProfile={this.updateProfile}
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
      </BaseLayout>
    );
  }
}

export default EditUser;
