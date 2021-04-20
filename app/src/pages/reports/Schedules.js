import React, { useContext, useEffect, useState } from "react";
import { Overlay, Spinner, showToast } from "../../components";
import { apiBaseUrl } from "../../constants";
import { UserContext } from "../../contexts/UserContext";

import { Col, Container, Row } from "reactstrap";
import AgGrid from "./AgGrid";

const Schedules = () => {
  const [schedules, setSchedules] = useState([]);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const fetchSchedules = () => {
    setLoading(true);
    fetch(apiBaseUrl() + "/api/schedules", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.authToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSchedules(data);
      })
      .catch((error) => {
        showToast("error", "Unable to retrieve schedules.  Check console logs");
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  return (
    <Container fluid className="p-0">
      {loading ? (
        <Overlay height="100vh" width="100vw">
          <Spinner />
        </Overlay>
      ) : (
        <div />
      )}


      <AgGrid title={"Schedules"} rows={schedules} />

    </Container>
  );
};

export default Schedules;
