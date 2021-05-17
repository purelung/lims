import { apiBaseUrl } from "../constants";

export const zeeFetch = async (authToken, queryPath) => {
  const response = await fetch(apiBaseUrl() + "/api/" + queryPath, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  const data = await response.json();

  return data;
};

export const fetchOptions = {};
