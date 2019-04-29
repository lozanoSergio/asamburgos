import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import ServiceForm from "../components/forms/ServiceForm";
import ServiceTable from "../components/tables/ServiceTable";
import UsersListCard from "../components/cards/UsersListCard";
import GridContainer from "../src/components/Grid/GridContainer";
import GridItem from "../src/components/Grid/GridItem";
import withAuth from "../components/hoc/withAuth";
import { Router } from "../routes";
import { getServices, getServiceById, updateService, getUsersInService } from "../actions";

class EditService extends React.Component {
  static async getInitialProps({ query, req }) {
    let servicies = [];
    let service = {};
    let users = [];
    let error;

    try {
      servicies = await getServices(req);
    } catch (err) {
      error = err.response.status;
    }

    try {
      service = await getServiceById(req, query.id);
    } catch (err) {
      error = err.response.status;
    }

    try {
      users = await getUsersInService(req, query.id);
    } catch (err) {
      error = err.response.status;
    }

    return { servicies, service, error, users };
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
  };
  render() {
    const { servicies, service, error, users } = this.props;

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
                <ServiceForm
                  edit
                  onSubmit={this.updateService}
                  initialValues={service}
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
            <ServiceTable servicies={servicies} />
          </GridItem>
        </GridContainer>
      </BaseLayout>
    );
  }
}

export default withAuth("admin")(EditService);
