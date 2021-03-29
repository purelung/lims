import React, { useContext, useEffect, useState } from "react";
import {
  Overlay,
  Spinner,
  showToast,
  DraggableMultiList,
} from "../../components";
import { apiBaseUrl } from "../../constants";
import { UserContext } from "../../contexts/UserContext";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Container,
  Label,
} from "reactstrap";
import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback,
} from "availity-reactstrap-validation";
import Select from "react-select";
import { useHistory, useLocation } from "react-router-dom";
import { roles } from "../../constants";
import qs from "qs";
import { ArrowLeftCircle } from "react-feather";
import styled from "styled-components";

const BasicForm = ({ edit, editingUserId }) => {
  const [salons, setSalons] = useState({
    items: [],
    selected: [],
  });
  const [role, setRole] = useState(undefined);
  const { user, setUserData } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  let history = useHistory();
  const [userToEdit, setUserToEdit] = useState(undefined);

  const fetchSalons = () => {
    setLoading(true);
    fetch(apiBaseUrl() + "/api/salons?franchiseId=" + user.franchiseId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.authToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSalons({
          items: data,
          selected: [],
        });
      })
      .catch((error) => {
        showToast("error", "Unable to retrieve salons.  Check console logs");
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  const fetchUser = () => {
    setLoading(true);
    fetch(apiBaseUrl() + "/api/users?userId=" + editingUserId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.authToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUserToEdit(data);
        setRole(roles.find((r) => r.value === data.user.userRoleId));
        setSalons({
          items: data.availableSalons,
          selected: data.selectedSalons,
        });
      })
      .catch((error) => {
        showToast("error", "Unable to retrieve user.  Check console logs");
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    edit ? fetchUser() : fetchSalons();
  }, []);

  return (
    <Card>
      {loading ? (
        <Overlay height="100vh" width="100vw">
          <Spinner />
        </Overlay>
      ) : (
        <div />
      )}
      {edit && userToEdit === undefined ? (
        <div />
      ) : (
        <div>
          <CardHeader>
            <CardTitle tag="h5">Salon User</CardTitle>
            <h6 className="card-subtitle text-muted">
              {(edit ? "Edit" : "Enter") + "  user information below"}
            </h6>
          </CardHeader>
          <CardBody>
            <AvForm
              model={edit ? userToEdit.user : {}}
              onSubmit={(event, errors, values) => {
                if (errors.length === 0) {
                  let userToSend = {
                    Id: edit ? userToEdit.user.id : 0,
                    Name: values.name,
                    Email: values.email,
                    Mobile: values.mobile,
                    UserRoleId: values.role.value,
                    FranchiseId: user.franchiseId,
                  };
                  const userWithSalons = {
                    user: userToSend,
                    availableSalons: salons.items,
                    selectedSalons: salons.selected,
                  };
                  setLoading(true);

                  fetch(apiBaseUrl() + "/api/users", {
                    method: edit ? "PUT" : "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${user.authToken}`,
                    },
                    body: JSON.stringify(userWithSalons),
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      showToast("success", "Successfully saved user");
                      setTimeout(function () {
                        history.push("/dashboard/store-admin/users");
                      }, 500);
                    })
                    .catch((error) => {
                      showToast(
                        "error",
                        "Unable to save user.  Check console logs"
                      );
                      console.log(error);
                    })
                    .finally(() => setLoading(false));
                }
              }}
            >
              <AvGroup>
                <Label>Name</Label>
                <AvInput type="name" name="name" placeholder="Name" required />
                <AvFeedback>Please enter a name.</AvFeedback>
              </AvGroup>
              <AvGroup>
                <Label>Email address</Label>
                <AvInput
                  name="email"
                  placeholder="Email"
                  type="email"
                  required
                />
                <AvFeedback>Please enter a valid email.</AvFeedback>
              </AvGroup>
              <AvGroup>
                <Label>Mobile</Label>
                <AvInput
                  type="mobile"
                  name="mobile"
                  placeholder="Mobile"
                  type="tel"
                />
                <AvFeedback>Please enter a valid phone number.</AvFeedback>
              </AvGroup>
              <AvGroup>
                <Label>Role</Label>
                <Select
                  className="react-select-container"
                  classNamePrefix="react-select"
                  options={roles.filter((r) => r.value !== 1)}
                  onChange={(r) => {
                    setRole(r);
                  }}
                  value={role}
                />
                <AvInput type="role" name="role" required value={role} hidden />
                <AvFeedback>Please select a role.</AvFeedback>
              </AvGroup>
              <AvGroup>
                <Label>Salons</Label>
                <DraggableMultiList
                  listState={salons}
                  setListState={setSalons}
                />
                <AvInput
                  type="salons"
                  name="salons"
                  required
                  value={salons.selected}
                  hidden
                />
                <AvFeedback>Please select at least one salon.</AvFeedback>
              </AvGroup>

              <Button color="primary">Submit</Button>
            </AvForm>
          </CardBody>
        </div>
      )}
    </Card>
  );
};

const StyledArrowLeftCircle = styled(ArrowLeftCircle)`
  :hover {
    color: #9d7bd8;
  }

  :active {
    color: #20c997;
  }

  margin-right: 1rem;
  padding-bottom: 0.5rem;
`;

const StyledHeader = styled.div`
  display: flex;
`;

const AddUser = () => {
  const location = useLocation();
  const edit = location.pathname.includes("edit-user");
  const editingUserId = qs.parse(location.search, { ignoreQueryPrefix: true })
    .userId;
  let history = useHistory();

  return (
    <Container fluid className="p-0">
      <StyledHeader>
        <StyledArrowLeftCircle size={30} onClick={() => history.goBack()} />
        <h1 className="h3 mb-3">{(edit ? "Edit" : "Add") + " User"}</h1>
      </StyledHeader>

      <BasicForm edit={edit} editingUserId={editingUserId} />
    </Container>
  );
};

export default AddUser;
