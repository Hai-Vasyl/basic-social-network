import React from "react"
import { render } from "react-dom"
import App from "./App"
import "./styles/index.scss"
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { BrowserRouter as Router } from "react-router-dom"
import store from "./redux/store"
import { Provider } from "react-redux"

const httpLink = createHttpLink({
  uri: "http://localhost:5000",
})

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

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
