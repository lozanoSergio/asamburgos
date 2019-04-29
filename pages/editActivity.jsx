import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import ActivityForm from "../components/forms/ActivityForm";
import ActivityTable from "../components/tables/ActivityTable";
import GridContainer from "../src/components/Grid/GridContainer";
import GridItem from "../src/components/Grid/GridItem";
import withAuth from '../components/hoc/withAuth';
import { Router } from "../routes";
import { getActivities, getActivityById, updateActivity } from "../actions";

class EditActivity extends React.Component {
  static async getInitialProps({ query, req }) {
    let activities = [];

    let activity = {};

    try {
      activities = await getActivities(req);
    } catch (err) {
      console.log(err);
    }

    try {
      activity = await getActivityById(req, query.id);
    } catch (err) {
      console.log(err);
    }

    return { activities, activity };
  }

  constructor(props) {
    super(props);

    this.state = {
      error: undefined
    };

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
    const { activities, activity } = this.props;

    return (
      <BaseLayout>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12} lg={12} xl={4}>
            <ActivityForm
              edit
              onSubmit={this.updateActivity}
              initialValues={activity}
            />
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
