import { decodeJwt } from "jose";
import Cookies from "js-cookie";

export function makeLoginUrl() {
  const nonce = Math.random().toString(36);
  const state = Math.random().toString(36);

  //lembrar armazenar com cookie seguro (https)
  Cookies.set("nonce", nonce);
  Cookies.set("state", state);

  const loginUrlParams = new URLSearchParams({
    client_id: "kama-bakka",
    redirect_uri: "http://localhost:3000/callback",
    response_type: "token id_token",
    // scope: "openid",
    nonce: nonce,
    state: state,
  });

  return `http://localhost:8080/realms/Kamabakka/protocol/openid-connect/auth?${loginUrlParams.toString()}`;
}

export function login(accessToken: string, idToken: string, state: string) {
  const stateCookie = Cookies.get("state");
  if (stateCookie !== state) {
    throw new Error("Invalid state");
  }

  let decodedAccessToken = null;
  let decodedIdToken = null;
  try {
    decodedAccessToken = decodeJwt(accessToken);
    decodedIdToken = decodeJwt(idToken);
  } catch (e) {
    throw new Error("Invalid token");
  }

  if (decodedAccessToken.nonce !== Cookies.get("nonce")) {
    throw new Error("Invalid nonce");
  }

  if (decodedIdToken.nonce !== Cookies.get("nonce")) {
    throw new Error("Invalid nonce");
  }

  Cookies.set("access_token", accessToken);
  Cookies.set("id_token", idToken);

  return decodedAccessToken;
}

export function getAuth() {
  const accessToken = Cookies.get("access_token");

  if (!accessToken) return null;

  try {
    return decodeJwt(accessToken);
  } catch (e) {
    console.error(e);
    return null;
  }
}

export function makeLogoutUrl() {
  const idToken = Cookies.get("id_token");
  if (!idToken) return '';

  const logoutParams = new URLSearchParams({
    client_id: "kama-bakka",
    id_token_hint: idToken,
    post_logout_redirect_uri: "http://localhost:3000/login",
  });

  Cookies.remove("access_token");
  Cookies.remove("id_token");
  Cookies.remove("nonce");
  Cookies.remove("state");

  return `http://localhost:8080/realms/fullcycle-realm/protocol/openid-connect/logout?${logoutParams.toString()}`;
}
