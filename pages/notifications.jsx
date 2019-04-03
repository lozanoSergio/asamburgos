import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import Notifications from "../src/views/Notifications/Notifications";

class Notification extends React.Component {
  render() {
    return (
      <BaseLayout>
        <Notifications />
      </BaseLayout>
    );
  }
}

export default Notification;
