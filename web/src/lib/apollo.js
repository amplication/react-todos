import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const apiUrl = "http://localhost:3000/graphql";
const jwtKey = "accessToken";

const httpLink = createHttpLink({
  uri: apiUrl,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(jwtKey);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const isStoredJwt = () => Boolean(localStorage.getItem(jwtKey));
export const setStoredJwt = (accessToken) =>
  localStorage.setItem(jwtKey, accessToken);
export { gql } from "@apollo/client";
