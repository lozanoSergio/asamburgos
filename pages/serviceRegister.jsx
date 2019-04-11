import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import ServiceForm from "../components/forms/ServiceForm";
import ServiceTable from "../components/tables/ServiceTable";
import GridContainer from "../src/components/Grid/GridContainer";
import GridItem from "../src/components/Grid/GridItem";

class ServiceRegister extends React.Component {
  render() {
    return (
      <BaseLayout>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12} lg={3} xl={3}>
            <ServiceForm />
          </GridItem>
          <GridItem xs={12} sm={12} md={12} lg={6} xl={6}>
            <ServiceTable />
          </GridItem>
        </GridContainer>
      </BaseLayout>
    );
  }
}

export default ServiceRegister;
