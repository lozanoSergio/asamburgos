import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import ActivityForm from "../components/forms/ActivityForm";
import ActivityTable from "../components/tables/ActivityTable";
import GridContainer from "../src/components/Grid/GridContainer";
import GridItem from "../src/components/Grid/GridItem";
import withAuth from '../components/hoc/withAuth';
import { Router } from "../routes";
import { createActivity, getActivities } from "../actions";

const INITIAL_ACTIVITY_VALUES = {
  name: "",
  voluntaryName: "",
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
  sunday: false,
  place: "",
  startTime: null,
  endTime: null,
  startDate: null,
  endDate: null
};

class ActivityRegister extends React.Component {
  static async getInitialProps({ req }) {
    let activities = [];

    try {
      activities = await getActivities(req);
    } catch (err) {
      console.log(err);
    }

    return { activities };
  }

  constructor(props) {
    super(props);

    this.state = {
      error: undefined
    };

    this.saveActivity = this.saveActivity.bind(this);
  }

  saveActivity = (activityData, { setSubmitting }) => {
    setSubmitting(true);
    createActivity(activityData)
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
    const { activities } = this.props;

    return (
      <BaseLayout>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12} lg={6} xl={4}>
            <ActivityForm
              onSubmit={this.saveActivity}
              initialValues={INITIAL_ACTIVITY_VALUES}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12} lg={6} xl={8}>
            <ActivityTable activities={activities} />
          </GridItem>
        </GridContainer>
      </BaseLayout>
    );
  }
}

export default withAuth("admin")(ActivityRegister);