import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import ProfileTable from "../components/tables/ProfileTable";
import LineChart from "../components/charts/LineChart";
import withAuth from "../components/hoc/withAuth";
import { getUserProfiles } from "../actions";

class Index extends React.Component {
  static async getInitialProps({ req }) {
    let profiles = [];

    try {
      profiles = await getUserProfiles(req);
    } catch (err) {
      console.log(err);
    }

    return { profiles };
  }
  render() {
    const { profiles } = this.props;
    return (
      <BaseLayout>
        <ProfileTable profiles={profiles} />
        <LineChart profiles={profiles} />
      </BaseLayout>
    );
  }
}

export default withAuth("admin")(Index);
