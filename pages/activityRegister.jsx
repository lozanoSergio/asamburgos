import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import ActivityForm from "../components/forms/ActivityForm";
import ActivityTable from "../components/tables/ActivityTable";
import GridContainer from "../src/components/Grid/GridContainer";
import GridItem from "../src/components/Grid/GridItem";

const INITIAL_ACTIVITY_VALUES = { 
  activityName: "",
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
}


class ActivityRegister extends React.Component {
  saveActivityData = (activitydata) => {
    console.log(activitydata)
  }
  render() {
    return (
      <BaseLayout>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12} lg={6} xl={4}>
            <ActivityForm
              onSubmit={this.saveActivityData}
              initialValues={INITIAL_ACTIVITY_VALUES}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12} lg={6} xl={8}>
            <ActivityTable />
          </GridItem>
        </GridContainer>
      </BaseLayout>
    );
  }
}

export default ActivityRegister;