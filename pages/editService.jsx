import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import ServiceForm from "../components/forms/ServiceForm";
import ServiceTable from "../components/tables/ServiceTable";
import GridContainer from "../src/components/Grid/GridContainer";
import GridItem from "../src/components/Grid/GridItem";
import withAuth from '../components/hoc/withAuth';
import { Router } from "../routes";
import { getServices, getServiceById, updateService } from "../actions";

class EditService extends React.Component {

  static async getInitialProps({ query, req }) {
    let servicies = [];
    let service = {};

    try {
      servicies = await getServices(req);
    } catch (err) {
      console.log(err);
    }

    try {
        service = await getServiceById(req, query.id);
      } catch (err) {
        console.log(err);
      }

    return { servicies, service };
  }

  constructor(props) {
    super(props);

    this.state = {
      error: undefined
    };

    this.updateService = this.updateService.bind(this);
    
  }

  updateService = (serviceData, { setSubmitting }) => {
    setSubmitting(true);
    updateService(serviceData)
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
    const { servicies, service } = this.props;
    return (
      <BaseLayout>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12} lg={12} xl={4}>
            <ServiceForm
              edit
              onSubmit={this.updateService}
              initialValues={service}
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

export default withAuth("admin")(EditService);
