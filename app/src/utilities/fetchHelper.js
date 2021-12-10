import { apiBaseUrl } from "../constants";

export const zeeFetch = async (authToken, queryPath, options = {}) => {
  let url = apiBaseUrl() + "/api/" + queryPath;

  const { startDate, endDate, storeId } = options;

  if (options) {
    url = `${url}?`;
  }

  if (startDate) {
    url = `${url}startDate=${startDate.toLocaleDateString("en-US")}&`;
  }

  if (endDate) {
    url = `${url}endDate=${endDate.toLocaleDateString("en-US")}&`;
  }

  if (storeId) {
    url = `${url}storeId=${storeId}&`;
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  const data = await response.json();

  return data;
};

export const fetchOptions = {
  retry: false,
  staleTime: 1000 * 60 * (4 * 60),
  refetchOnWindowFocus: false,
  refetchOnMount: false,
};
