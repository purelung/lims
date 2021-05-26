import React, { useContext, useEffect, useState } from "react";
import { Overlay, Spinner, showToast } from "./";
import { UserContext } from "../contexts/UserContext";
import { useQuery, useQueryClient } from "react-query";
import { Container, Button } from "reactstrap";
import PrimeDataTable from "./PrimeDataTable";
import { zeeFetch, fetchOptions } from "../utilities/fetchHelper";

export const Report = ({
  children,
  isLoading,
  title,
  rows,
  onRowSelected,
  rowGroup,
  keepExpanded,
}) => {
  return (
    <div>
      {isLoading ? (
        <Overlay height="100vh" width="100vw">
          <Spinner />
        </Overlay>
      ) : (
        <div />
      )}
      <PrimeDataTable
        title={title}
        rows={rows}
        onRowSelected={onRowSelected}
        rowGroup={rowGroup}
        keepExpanded={keepExpanded}
      >
        {children}
      </PrimeDataTable>
    </div>
  );
};

export const QueryReport = ({
  children,
  title,
  queryPath,
  onRowSelected,
  rowGroup,
  keepExpanded,
}) => {
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();

  // const [data, setData] = useState([]);
  // const [error, setError] = useState([]);
  // const [isLoading, setIsLoading] = useState([]);

  // const fetchData = async () => {
  //   setIsLoading(true);

  //   try {
  //     const data = await zeeFetch(user.authToken, queryPath);
  //     setData(data);
  //   } catch (error) {
  //     showToast("error", "Unable to retrieve rankings.  Check console logs");
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const { isLoading, error, data } = useQuery({
    queryKey: queryPath,
    queryFn: async () => zeeFetch(user.authToken, queryPath),
    ...fetchOptions,
  });

  if (error) {
    showToast(
      "error",
      "Unable to retrieve data from server.  Check console logs"
    );
    console.log(error);
  }

  const rows = data ?? [];

  return (
    <Container fluid className="p-0">
      <Button
        style={{ marginBottom: 15 }}
        color="primary"
        onClick={() => queryClient.invalidateQueries(queryPath)}
      >
        Refresh
      </Button>
      <Report
        isLoading={isLoading}
        rows={data}
        title={title}
        onRowSelected={onRowSelected}
        rowGroup={rowGroup}
        keepExpanded={keepExpanded}
      >
        {children}
      </Report>
    </Container>
  );
};
