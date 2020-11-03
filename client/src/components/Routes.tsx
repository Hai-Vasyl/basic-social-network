import React, { ReactNode } from "react"
import { Route, Switch } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootStore } from "../redux/store"
import { IRoute } from "../interfaces"
import { routes } from "../modules/routes"

const Routes = () => {
  const {
    auth: { token, user },
  } = useSelector((state: RootStore) => state)

  const mapReduce = (routes: IRoute[]): ReactNode => {
    return routes.map(({ exact, path, Component }) => {
      return (
        <Route
          key={path}
          exact={exact}
          path={path}
          component={(props: any) => <Component {...props} />}
        />
      )
    })
  }

  return (
    <>
      {token ? (
        user.typeUser === "admin" ? (
          <Switch>{mapReduce(routes.admin)}</Switch>
        ) : (
          <Switch>{mapReduce(routes.user)}</Switch>
        )
      ) : (
        <Switch>{mapReduce(routes.unregistered)}</Switch>
      )}
    </>
  )
}

export default Routes
