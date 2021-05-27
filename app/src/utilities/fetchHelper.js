import { apiBaseUrl } from "../constants";

export const zeeFetch = async (authToken, queryPath, options = {}) => {
  let url = apiBaseUrl() + "/api/" + queryPath;

  const { startDate, endDate } = options;

  console.log(options);

  if (options) {
    url = `${url}?`;
  }

  if (startDate) {
    url = `${url}startDate=${startDate.toISOString().split("T")[0]}&`;
  }

  if (endDate) {
    url = `${url}endDate=${endDate.toISOString().split("T")[0]}&`;
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
};
