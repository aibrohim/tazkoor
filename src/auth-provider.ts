// pretend this is firebase, netlify, or auth0's code.
// you shouldn't have to implement something like this in your own app

import { UserData, UserPlans } from "consts";

const localStorageKey = '__auth_provider_token__';

const getUser = function(): UserData | null {
  try {
    return JSON.parse(window.localStorage.getItem(localStorageKey) || "");
  } catch {
    return null;
  }
}

interface Data {
  user: {
    avatar: string;
    email: string;
    id: number;
    is_verified: boolean;
    name: string;
    plan: UserPlans;
  }
  token: string;
}

function handleUserResponse(data: Data) {
  window.localStorage.setItem(localStorageKey, JSON.stringify({
    ...data.user,
    token: data.token
  }));
  return data;
}

interface Login {
  email: string;
  password: string;
}

function login({email, password}: Login) {
  return client('login', {login: email, password}).then(handleUserResponse);
}

interface Register {
  name: string;
  email: string;
  password: string;
}

function register({name, email, password}: Register) {
  return client('register', {name, email, password}).then(handleUserResponse);
}

async function logout() {
  window.localStorage.removeItem(localStorageKey);
}

// an auth provider wouldn't use your client, they'd have their own
// so that's why we're not just re-using the client
const authURL = process.env.REACT_APP_API_URL;

interface DataType {
  [x:string]: any
}

async function client(endpoint: string, data: DataType) {
  const config = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json'},
  };

  return window.fetch(`${authURL}/${endpoint}`, config).then(async response => {
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
}

export { getUser, login, register, logout, localStorageKey};
