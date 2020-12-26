import React from "react"
import { render } from "react-dom"
import App from "./App"
import "./styles/index.scss"
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  // createHttpLink,
  HttpLink,
  split,
  from,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { BrowserRouter as Router } from "react-router-dom"
import store from "./redux/store"
import { Provider } from "react-redux"
import { ApolloLink } from "apollo-link"
import { createHttpLink } from "apollo-link-http"
import { getMainDefinition } from "@apollo/client/utilities"
import { WebSocketLink } from "@apollo/client/link/ws"
import { createUploadLink } from "apollo-upload-client"

// const httpLink = new HttpLink({
//   uri: "http://localhost:5000",
// })

// const authLink = setContext((_, { headers }) => {
//   const auth = localStorage.getItem("auth") || ""

//   let authtoken = ""
//   if (auth.length) {
//     const { token }: { token: string } = JSON.parse(auth)
//     authtoken = token.length ? token : ""
//   }
//   return {
//     headers: {
//       ...headers,
//       authorization: `Bearer ${authtoken}`,
//     },
//   }
// })

// const websocketLink = new WebSocketLink({
//   uri: `ws://localhost:5000/graphql`,
//   options: {
//     reconnect: true,
//   },
// })

// const client = new ApolloClient({
//     link: [authLink.concat(httpLink), websocketLink],
//     cache: new InMemoryCache(),

/////////////////////////////////

// const httpLink = createHttpLink({
//   uri: "http://localhost:5000",
// })

// const link = new WebSocketLink({
//   uri: `ws://localhost:5000/graphql`,
//   options: {
//     reconnect: true,
//   },
// })

// const authLink = setContext((_, { headers }) => {
//   const auth = localStorage.getItem("auth") || ""

//   let authtoken = ""
//   if (auth.length) {
//     const { token }: { token: string } = JSON.parse(auth)
//     authtoken = token.length ? token : ""
//   }
//   return {
//     headers: {
//       ...headers,
//       authorization: `Bearer ${authtoken}`,
//     },
//   }
// })

// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// })

// const client = new ApolloClient({
//   link: [authLink.concat(httpLink), websocketLink],
//   cache: new InMemoryCache(),
// })
//////////////////////////////////////////////////

// const httpLink = new HttpLink({
//     uri: "http://localhost:5000",
//   })
const httpLink = createUploadLink({
  uri: "http://localhost:5000",
})

const websocketLink = new WebSocketLink({
  uri: `ws://localhost:5000/graphql`,
  options: {
    reconnect: true,
  },
})

// const middlewareLink = new ApolloLink((operation, forward) => {
//   operation.setContext({
//     headers: {
//       authorization: `Bearer ${
//         JSON.parse(localStorage.getItem("auth") || "").token
//       }`,
//     },
//   })
//   return forward(operation)
// })

const authLink = setContext((_, { headers }) => {
  const auth = localStorage.getItem("auth") || ""

  let authtoken = ""
  if (auth.length) {
    const { token }: { token: string } = JSON.parse(auth)
    authtoken = token.length ? token : ""
  }
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${authtoken}`,
    },
  }
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    )
  },
  websocketLink,
  //@ts-ignore
  authLink.concat(httpLink)
)

// use with apollo-client
// const link = middlewareLink.concat(httpLink);

const client = new ApolloClient({
  // link: [authLink.concat(httpLink), websocketLink],
  link: splitLink,
  cache: new InMemoryCache(),
})

render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
)
