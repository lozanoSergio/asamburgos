import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import ServiceForm from "../components/forms/ServiceForm";
import ServiceTable from "../components/tables/ServiceTable";
import GridContainer from "../src/components/Grid/GridContainer";
import GridItem from "../src/components/Grid/GridItem";

const INITIAL_SERVICE_VALUES = {
  serviceName: "",
  voluntaryName: "",
  periodicity: "",
  place: "",
  startDate: null,
  endDate: null
};

class ServiceRegister extends React.Component {
  saveServiceData = servicedata => {
    console.log(servicedata);
  };
  render() {
    return (
      <BaseLayout>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12} lg={6} xl={4}>
            <ServiceForm
              onSubmit={this.saveServiceData}
              initialValues={INITIAL_SERVICE_VALUES}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12} lg={6} xl={8}>
            <ServiceTable />
          </GridItem>
        </GridContainer>
      </BaseLayout>
    );
  }
}

export default ServiceRegister;
