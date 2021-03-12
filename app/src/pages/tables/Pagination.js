import React, { useContext, useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle, Container } from "reactstrap";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import { UserContext } from "../../contexts/UserContext";

const PaginationTable = () => {
  const { authToken } = useContext(UserContext);
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = () => {
    //localhost:7071
    fetch("https://zeereportingapi.azurewebsites.net/api/getCustomers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: "",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCustomers(data);
      })
      .catch((error) => console.log("TODO: toast"));
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const tableColumns = [
    {
      dataField: "id",
      text: "ID",
      sort: true,
    },
    {
      dataField: "customerName",
      text: "Customer Name",
      sort: true,
    },
    {
      dataField: "ownerName",
      text: "Owner Name",
      sort: true,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h5">Sales at varying stores</CardTitle>
        {/* <h6 className="card-subtitle text-muted">
          Pagination by react-bootstrap-table2
        </h6> */}
      </CardHeader>
      <CardBody>
        <BootstrapTable
          keyField="name"
          data={customers}
          columns={tableColumns}
          bootstrap4
          bordered={false}
          pagination={paginationFactory({
            sizePerPage: 5,
            sizePerPageList: [5, 10, 25, 50],
          })}
        />
      </CardBody>
    </Card>
  );
};

const Tables = () => (
  <Container fluid className="p-0">
    <h1 className="h3 mb-3">Sales</h1>

    <PaginationTable />
  </Container>
);

export default Tables;
