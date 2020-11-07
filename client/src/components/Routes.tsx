import React, { ReactNode } from "react"
import { Route, Switch } from "react-router-dom"
import { RootStore } from "../redux/store"
import { IRoute } from "../interfaces"
import { routes } from "../modules/routes"
import { useSelector, useDispatch } from "react-redux"
import { RESET_TOGGLE } from "../redux/toggle/toggleTypes"

const Routes = () => {
  const {
    auth: { token, user },
    toggle: { dropDown, authForm },
  } = useSelector((state: RootStore) => state)
  const dispatch = useDispatch()

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
      <div
        className={`background ${
          (dropDown || authForm) && "background--active"
        }`}
        onClick={() => dispatch({ type: RESET_TOGGLE })}></div>
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
