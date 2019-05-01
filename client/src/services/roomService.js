import { apiUrl } from "../config.json";
import { getCustomHeader } from "./authService";

const apiEndpoint = `${apiUrl}/rooms`;

export function getRooms() {
  return fetch(apiEndpoint)
    .then(response => response.json())
    .then(data => data)
    .catch(Promise.reject);
}

export function getRoomFrom(buildingId) {
  return fetch(`${apiEndpoint}/building/${buildingId}`)
    .then(response => response.json())
    .then(data => data)
    .catch(Promise.reject);
}

export function saveRoom(room) {
  const headers = getCustomHeader();
  return fetch(apiEndpoint, {
    method: "POST",
    body: JSON.stringify(room),
    headers
  })
    .then(response => response.json())
    .then(data => data)
    .catch(Promise.reject);
}

export function deleteRoom(roomId) {
  const headers = getCustomHeader();
  return fetch(`${apiEndpoint}/${roomId}`, {
    method: "DELETE",
    headers: headers
  })
    .then(response => response.json())
    .then(data => data)
    .catch(Promise.reject);
}
