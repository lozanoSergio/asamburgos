import React from "react";
import Error from "next/error";
import BaseLayout from "../components/layouts/BaseLayout";
import ActivityForm from "../components/forms/ActivityForm";
import ActivityTable from "../components/tables/ActivityTable";
import UsersListCard from "../components/cards/UsersListCard";
import GridContainer from "../src/components/Grid/GridContainer";
import GridItem from "../src/components/Grid/GridItem";
import withAuth from "../components/hoc/withAuth";
import { Router } from "../routes";
import {
  getActivities,
  getActivityById,
  updateActivity,
  getUsersInActivity
} from "../actions";

class EditActivity extends React.Component {
  static async getInitialProps({ query, req }) {
    let activities = [];
    let activity = {};
    let users = [];
    let error;

    try {
      activities = await getActivities(req);
    } catch (err) {
      error = err.response.status;
    }

    try {
      activity = await getActivityById(req, query.id);
    } catch (err) {
      error = err.response.status;
    }

    try {
      users = await getUsersInActivity(req, query.id);
    } catch (err) {
      error = err.response.status;
    }

    return { activities, activity, users, error };
  }

  constructor(props) {
    super(props);

    this.updateActivity = this.updateActivity.bind(this);
  }

  updateActivity = (activityData, { setSubmitting }) => {
    setSubmitting(true);
    updateActivity(activityData)
      .then(activity => {
        setSubmitting(false);
        this.setState({ error: undefined });
        Router.push("/registrar-actividades");
      })
      .catch(err => {
        const error = err.message || "Server Error!";
        setSubmitting(false);
        this.setState({ error });
      });
  };

  render() {
    const { activities, activity, users, error } = this.props;

    if (error) {
      return (
        <BaseLayout>
          <Error status={error} />
        </BaseLayout>
      );
    }
    return (
      <BaseLayout>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12} lg={12} xl={4}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12} lg={6} xl={12}>
                <ActivityForm
                  edit
                  onSubmit={this.updateActivity}
                  initialValues={activity}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12} lg={6} xl={12}>
                <UsersListCard
                  users={users}
                  title="Participantes"
                  subtitle="Listado de participantes en la actividad"
                />
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={12} sm={12} md={12} lg={12} xl={8}>
            <ActivityTable activities={activities} />
          </GridItem>
        </GridContainer>
      </BaseLayout>
    );
  }
}

export default withAuth("admin")(EditActivity);
