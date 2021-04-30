import React, { useContext, useEffect, useState } from "react";
import { Overlay, Spinner, showToast } from "../../components";
import { apiBaseUrl } from "../../constants";
import { UserContext } from "../../contexts/UserContext";

import { Col, Container, Row } from "reactstrap";
import PrimeDataTable from "./PrimeDataTable";

const SalonRankings = () => {
  const [rankings, setRankings] = useState([]);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const fetchRankings = () => {
    setLoading(true);
    fetch(apiBaseUrl() + "/api/salon-rankings", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.authToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setRankings(data);
      })
      .catch((error) => {
        showToast("error", "Unable to retrieve rankings.  Check console logs");
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchRankings();
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
      <PrimeDataTable title={"Salon Rankings"} rows={rankings} />
    </Container>
  );
};

export default SalonRankings;
