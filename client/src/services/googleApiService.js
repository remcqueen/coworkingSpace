import { apiUrl } from "../config.json";

const apiEndpoint = `${apiUrl}/googleApi`;

export function getAddress(data) {
  return fetch(apiEndpoint + "/" + data)
    .then(response => response.json())
    .then(data => data)
    .catch(Promise.reject());
}
