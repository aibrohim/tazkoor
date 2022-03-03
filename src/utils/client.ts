import * as auth from "../auth-provider";

const apiURL = process.env.REACT_APP_API_URL;

interface Args {
  data?: any,
  token?: string | null;
  headers?: any;
  method?: string;
  [x:string]: any
}

const client = function(
  endpoint: string,
  { data, token, headers: customHeaders, method, ...customConfig }:Args = {}
) {
  const config = {
    method: method ? method : data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : null,
    headers: {
      Authorization: token ? token : "",
      "Content-Type": data ? "Application/json" : "",
      ...customHeaders
    },
    ...customConfig,
  };

  return window
    .fetch(`${apiURL}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await auth.logout();
        window.location.assign(window.location.toString());
        return Promise.reject({ message: 'Please re-authenticate.', code: 401 });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
}

export { client };