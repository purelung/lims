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
import { useHistory } from "react-router-dom";

const roles = [
  { value: "2", label: "Owner" },
  { value: "3", label: "SalonAdmin" },
  { value: "4", label: "User" },
];

const mockSalons = [
  { id: "82165", content: "82165-New Rochelle,NY-Palmer Ctr-SCF" },
  { id: "82318", content: "82318-Brewster,NY-Lakeview Plz-SCF" },
  { id: "83115", content: "83115-Liverpool,NY-Grt Northern-SCF" },
  { id: "83116", content: "83117-Syracuse,NY-Fairmont Fair-SCF" },
];

const BasicForm = () => {
  const [salons, setSalons] = useState({
    items: [],
    selected: [],
  });
  const [role, setRole] = useState(undefined);
  const { user, setUserData } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  let history = useHistory();

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

  useEffect(() => {
    fetchSalons();
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
      <CardHeader>
        <CardTitle tag="h5">Salon User</CardTitle>
        <h6 className="card-subtitle text-muted">
          Enter user information below
        </h6>
      </CardHeader>
      <CardBody>
        <AvForm
          onSubmit={(event, errors, values) => {
            if (errors.length === 0) {
              const newUser = {
                Name: values.name,
                Email: values.email,
                Mobile: values.mobile,
                Role: values.role.value,
                //TODO: add salons
              };
              setLoading(true);

              fetch(apiBaseUrl() + "/api/users", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${user.authToken}`,
                },
                body: JSON.stringify(newUser),
              })
                .then((response) => response.json())
                .then((data) => {
                  showToast("success", "Successfully saved user");
                  setTimeout(function () {
                    history.goBack();
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
            <AvInput name="email" placeholder="Email" type="email" required />
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
              options={roles}
              onChange={(r) => {
                setRole(r);
              }}
            />
            <AvInput type="role" name="role" required value={role} hidden />
            <AvFeedback>Please select a role.</AvFeedback>
          </AvGroup>
          <AvGroup>
            <Label>Salons</Label>
            <DraggableMultiList listState={salons} setListState={setSalons} />
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
    </Card>
  );
};

const AddUser = () => (
  <Container fluid className="p-0">
    <h1 className="h3 mb-3">Add User</h1>
    <BasicForm />
  </Container>
);

export default AddUser;
