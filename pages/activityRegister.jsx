import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import ActivityForm from "../components/forms/ActivityForm";
import ActivityTable from "../components/tables/ActivityTable";
import GridContainer from "../src/components/Grid/GridContainer";
import GridItem from "../src/components/Grid/GridItem";


class ActivityRegister extends React.Component {
  render() {
    return (
      <BaseLayout>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12} lg={3} xl={3}>
            <ActivityForm />
          </GridItem>
          <GridItem xs={12} sm={12} md={12} lg={6} xl={6}>
            <ActivityTable />
          </GridItem>
        </GridContainer>
      </BaseLayout>
    );
  }
}

export default ActivityRegister;