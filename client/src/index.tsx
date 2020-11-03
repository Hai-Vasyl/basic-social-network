import React from "react"
import { render } from "react-dom"
import App from "./App"
import "./styles/index.scss"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import { BrowserRouter as Router } from "react-router-dom"
import store from "./redux/store"
import { Provider } from "react-redux"

const client = new ApolloClient({
  uri: "http://localhost:5000",
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
