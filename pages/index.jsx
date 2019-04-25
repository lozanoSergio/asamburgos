import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import ProfileTable from "../components/tables/ProfileTable";
import LineChart from "../components/charts/LineChart";
import withAuth from "../components/hoc/withAuth";
import { getUserProfiles } from "../actions";

class Index extends React.Component {
  static async getInitialProps({ req }) {
    let profiles = [];
    let dates = [];

    try {
      profiles = await getUserProfiles(req);
    } catch (err) {
      console.log(err);
    }

    if (profiles) {
      profiles.filter(profile => dates.push(profile.createdAt));
    }

    return { profiles, dates };
  }
  render() {
    const { profiles, dates } = this.props;
    return (
      <BaseLayout>
        <LineChart dates={dates} />
        <ProfileTable profiles={profiles} />
      </BaseLayout>
    );
  }
}

export default Index;
