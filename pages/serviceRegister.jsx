import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import ServiceForm from "../components/forms/ServiceForm";
import ServiceTable from "../components/tables/ServiceTable";
import GridContainer from "../src/components/Grid/GridContainer";
import GridItem from "../src/components/Grid/GridItem";
import withAuth from '../components/hoc/withAuth';
import { Router } from "../routes";
import { createService, getServices } from "../actions";

const INITIAL_SERVICE_VALUES = {
  name: "",
  voluntaryName: "",
  periodicity: "",
  place: "",
  startDate: null,
  endDate: null
};

class ServiceRegister extends React.Component {

  static async getInitialProps({ req }) {
    let servicies = [];

    try {
      servicies = await getServices(req);
    } catch (err) {
      console.log(err);
    }

    return { servicies };
  }

  constructor(props) {
    super(props);

    this.state = {
      error: undefined
    };

    this.saveService = this.saveService.bind(this);
    
  }

  saveService = (serviceData, { setSubmitting }) => {
    setSubmitting(true);
    createService(serviceData)
      .then(service => {
        setSubmitting(false);
        this.setState({ error: undefined });
        Router.push("/registrar-servicios");
      })
      .catch(err => {
        const error = err.message || "Server Error!";
        setSubmitting(false);
        this.setState({ error });
      });
  }
  render() {
    const {servicies} = this.props;
    return (
      <BaseLayout>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12} lg={12} xl={4}>
            <ServiceForm
              onSubmit={this.saveService}
              initialValues={INITIAL_SERVICE_VALUES}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12} lg={12} xl={8}>
            <ServiceTable servicies={servicies} />
          </GridItem>
        </GridContainer>
      </BaseLayout>
    );
  }
}

export default withAuth("admin")(ServiceRegister);
