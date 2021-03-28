const mode = "staging";

export const apiBaseUrl = () => {
  return mode === "test"
    ? "http://localhost:7071"
    : "https://zeereportingapi.azurewebsites.net";
};
