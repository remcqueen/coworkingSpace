import { apiUrl } from "../config.json";
import { getCustomHeader } from "./authService";

const apiEndpoint = apiUrl + "/businesses";

export function getAllBusinesses() {
  return fetch(apiEndpoint)
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(Promise.reject);
}

export function getBusinesses(buildingId) {
  return fetch(apiEndpoint + "/" + buildingId)
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(Promise.reject);
}

export function saveBusiness(business) {
  const headers = getCustomHeader();
  return fetch(apiEndpoint, {
    method: "POST",
    body: JSON.stringify(business),
    headers: headers
  })
    .then(response => response.json())
    .then(jsonResponse => {
      return jsonResponse;
    })
    .catch(Promise.reject);
}
