import { apiUrl } from "../config.json";

const apiEndpoint = `${apiUrl}/users`;

export function register(user) {
  console.log(JSON.stringify(user));
  return fetch(apiEndpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => response.json())
    .then(jsonResponse => jsonResponse)
    .catch(Promise.reject);
}

export function getAllUsers() {
  return fetch(apiEndpoint)
    .then(response => response.json())
    .then(data => data)
    .catch(Promise.reject);
}

export function getUsers(buildingId) {
  return fetch(`${apiEndpoint}/${buildingId}`)
    .then(response => response.json())
    .then(data => data)
    .catch(Promise.reject);
}
