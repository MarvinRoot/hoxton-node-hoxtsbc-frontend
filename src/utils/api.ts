import { RequestBody } from "./types";

export const host = `http://localhost:4000`;

export const sendRequest = async (endpoint: string, method: string, bodyParam?: RequestBody, token?: string) => {
  const headers: any = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  if (token) headers.authorization = token;

  const body = bodyParam ? JSON.stringify(bodyParam) : undefined

  const result = await fetch(`${host}/${endpoint}`, {
    method,
    headers,
    body,
  });

  return result.json()
}

export const handleLogout = async () => {
  localStorage.removeItem('token')

  window.location.href = '/';
};

export const handleSignUp = async (body: RequestBody) => {
  await sendRequest('signup', 'POST', body);
  window.location.href = '/';
}

export const handleLogin = async (body: RequestBody) => {
  const result = await sendRequest('login', 'POST', body);

  const { data, token, error } = result;
  localStorage.setItem('token', token)
  return { data, error }
}

export const signInWithJWT = async () => {

  let token = localStorage.getItem('token');
  if (!token || token === 'undefined') return;

  const result = await sendRequest('banking-info', 'GET', undefined, token);

  return result || null;
}
