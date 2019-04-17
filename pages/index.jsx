import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import TableList from "../src/views/TableList/TableList";
import withAuth from '../components/hoc/withAuth'
import { getUserProfiles } from "../actions"


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
    const {profiles} = this.props;
    return (
      <BaseLayout>
        <TableList profiles={profiles} />
      </BaseLayout>
    );
  }
}

export default withAuth('admin')(Index);
