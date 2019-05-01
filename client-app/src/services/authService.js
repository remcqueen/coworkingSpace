import jwtDecode from "jwt-decode";
import { apiUrl } from "../config.json";

const apiEndpoint = `${apiUrl}/auth`;
const tokenKey = "token";

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function getCustomHeader() {
  const jwt = getJwt();
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("x-auth-token", jwt);
  return headers;
}

export async function login(data) {
  const jwt = await fetch(apiEndpoint, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .catch(Promise.reject);
  localStorage.setItem(tokenKey, jwt.token);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt
};
