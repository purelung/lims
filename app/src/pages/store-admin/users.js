import React, { useContext, useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle, Container } from "reactstrap";
import { Overlay, Spinner, showToast } from "../../components";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { apiBaseUrl } from "../../constants";
import { UserPlus, Edit2, Trash } from "react-feather";
import styled from "styled-components";
import { UserContext } from "../../contexts/UserContext";
import { useHistory } from "react-router-dom";
import { roles } from "../../constants";

const StyledCardHeader = styled(CardHeader)`
  display: flex;
`;

const StyledEdit = styled(Edit2)`
  :hover {
    color: #9d7bd8;
  }

  :active {
    color: #20c997;
  }
`;

const StyledUserPlus = styled(UserPlus)`
  margin-left: auto;
  background-color: #2c7be5;
  marign: 1rem;
  border-radius: 2rem;
  padding: 0.5rem;
  color: white;

  :hover {
    background-color: #9d7bd8;
  }

  :active {
    background-color: #20c997;
  }
`;

const Table = () => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  let history = useHistory();

  const fetchUsers = () => {
    setLoading(true);
    fetch(apiBaseUrl() + "/api/users?franchiseId=" + user.franchiseId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.authToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(
          data
            .filter((u) => u.userRoleId > 1)
            .map((u) => ({
              ...u,
              role: roles.find((r) => u.userRoleId === r.value).label,
            }))
        );
      })
      .catch((error) => {
        showToast("error", "Unable to retrieve users.  Check console logs");
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const tableColumns = [
    {
      dataField: "id",
      text: "ID",
      sort: true,
    },
    {
      dataField: "name",
      text: "Name",
      sort: true,
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
    },
    {
      dataField: "mobile",
      text: "Mobile",
      sort: true,
    },
    {
      dataField: "role",
      text: "Role",
      sort: true,
    },
    {
      dataField: "",
      text: "Actions",
      align: "right",
      headerAlign: "right",
      formatter: (cell, row, rowIndex, formateExtraData) => {
        return (
          <div>
            <StyledEdit
              className="align-middle mr-1"
              size={18}
              onClick={() =>
                history.push(
                  "/store-admin/edit-user?userId=" + row.id
                )
              }
            />
          </div>
        );
      },
    },
  ];

  return (
    <Card>
      {loading ? (
        <Overlay height="100vh" width="100vw">
          <Spinner />
        </Overlay>
      ) : (
        <div />
      )}
      <StyledCardHeader>
        <CardTitle tag="h5">Manage franchise users</CardTitle>
        <StyledUserPlus
          size={40}
          onClick={() => history.push("/dashboard/store-admin/add-user")}
        />
      </StyledCardHeader>
      <CardBody>
        <BootstrapTable
          keyField="id"
          data={users}
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

const Users = () => (
  <Container fluid className="p-0">
    <h1 className="h3 mb-3">Users</h1>
    <Table />
  </Container>
);

export default Users;
