const mode = "staging";

export const apiBaseUrl = () => {
  return mode === "test"
    ? "http://localhost:7071"
    : "https://zeereportingapi.azurewebsites.net";
};

export const roles = [
  { value: 1, label: "SuperAdmin" },
  { value: 2, label: "Owner" },
  { value: 3, label: "SalonAdmin" },
  { value: 4, label: "User" },
];
