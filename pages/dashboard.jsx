import React from "react";
import { getUserProfiles } from '../actions'

class Dashboard extends Component {
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
    return <div />;
  }
}

export default Dashboard;
