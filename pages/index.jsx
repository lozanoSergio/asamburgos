import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import dynamic from 'next/dynamic'
const Dashboard = dynamic(import("../src/views/Dashboard/Dashboard"), { ssr: false })


class Index extends React.Component {
  render() {
    return (
      <BaseLayout />
    );
  }
}

export default Index;
