import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import ProfileTable from "../components/tables/ProfileTable";
import LineChart from "../components/charts/LineChart";
import withAuth from "../components/hoc/withAuth";
import Error from "next/error"
import { getUserProfiles } from "../actions";

class Index extends React.Component {
  static async getInitialProps({ req }) {
    let profiles = [];
    let error;

    try {
      profiles = await getUserProfiles(req);
    } catch (err) {
      error = err.response.status;
    }

    return { profiles, error };
  }
  render() {
    const { profiles, error } = this.props;
    if (error) {
      return (
        <BaseLayout>
          <Error status={error} />
        </BaseLayout>
      );
    }
    return (
      <BaseLayout>
        <ProfileTable profiles={profiles} />
        <LineChart profiles={profiles} />
      </BaseLayout>
    );
  }
}

export default withAuth("admin")(Index);
