import React, { useContext } from "react";
import { Overlay, Spinner, showToast } from "./";
import { UserContext } from "../contexts/UserContext";
import { useQuery } from "react-query";
import { Container } from "reactstrap";
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
    <Container fluid className="p-0">
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
    </Container>
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

  return (
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
  );
};
