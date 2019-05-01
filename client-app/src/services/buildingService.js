import { getCustomHeader } from "./authService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/buildings";

export function getBuildings() {
  return fetch(apiEndpoint)
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(Promise.reject);
}

export function getBuilding(buildingId) {
  return fetch(apiEndpoint + "/" + buildingId)
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(Promise.reject);
}

export function getBuildingFrom(businessId) {
  return fetch(apiEndpoint + "/from/" + businessId)
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(Promise.reject);
}

export function saveBuilding(building) {
  const headers = getCustomHeader();
  if (building._id) {
    const body = { ...building };
    delete body._id;
    return fetch(apiEndpoint + "/" + building._id, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: headers
    })
      .then(response => response.json())
      .then(jsonResponse => {
        return jsonResponse;
      })
      .catch(Promise.reject);
  }
  return fetch(apiEndpoint, {
    method: "POST",
    body: JSON.stringify(building),
    headers: headers
  })
    .then(response => response.json())
    .then(jsonResponse => {
      return jsonResponse;
    })
    .catch(Promise.reject);
}

export function deleteBuilding(buildingId) {
  const headers = getCustomHeader();
  return fetch(apiEndpoint + "/" + buildingId, {
    method: "DELETE",
    headers: headers
  })
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(Promise.reject);
}
