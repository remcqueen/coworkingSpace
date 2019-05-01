import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/bookings";

export function makeBooking(data) {
  console.log(JSON.stringify(data));
  return fetch(apiEndpoint, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(Promise.reject);
}

export function getBookings() {
  return fetch(apiEndpoint)
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(Promise.reject);
}

export function deleteBooking(bookingId) {
  return fetch(apiEndpoint + "/" + bookingId, {
    method: "DELETE"
  })
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(Promise.reject);
}
