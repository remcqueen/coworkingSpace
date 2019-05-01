import { getCustomHeader } from "./authService";
import { apiUrl } from "../config.json";

const apiEndpoint = `${apiUrl}/organisations`;

export function getOrganisations() {
  return fetch(apiEndpoint)
    .then(response => response.json())
    .then(data => data)
    .catch(Promise.reject);
}

export function saveOrganisation(organisation) {
  const headers = getCustomHeader();
  return fetch(apiEndpoint, {
    method: "POST",
    body: JSON.stringify(organisation),
    headers: headers
  })
    .then(response => response.json())
    .then(data => data)
    .catch(Promise.reject);
}
