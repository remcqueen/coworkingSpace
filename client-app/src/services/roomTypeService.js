import { apiUrl } from "../config.json";

const apiEndpoint = `${apiUrl}/roomTypes`;

export function getRoomTypes() {
  return fetch(apiEndpoint)
    .then(response => response.json())
    .then(data => data)
    .catch(Promise.reject);
}
