import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import dynamic from 'next/dynamic'
const Dashboard = dynamic(import("../src/views/Dashboard/Dashboard"), { ssr: false })
import TableList from "../src/views/TableList/TableList";


class Index extends React.Component {
  render() {
    return (
      <BaseLayout>
        <TableList />
      </BaseLayout>
    );
  }
}

export default Index;
