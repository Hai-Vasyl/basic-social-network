import React, { useState, useEffect } from "react"
import { LOGIN_USER, REGISTER_USER } from "../fetching/queries"
import { useLazyQuery } from "@apollo/client"
import { AiOutlineLogin, AiOutlineCheckCircle } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { SET_AUTH } from "../redux/auth/authTypes"
import { AUTHFORM_TOGGLE } from "../redux/toggle/toggleTypes"
import { IAuthErrors } from "../interfaces"
import { RootStore } from "../redux/store"
import Button from "./Button"
import Field from "./Field"
// @ts-ignore
import styles from "../styles/auth.module"
// @ts-ignore
import stylesButton from "../styles/button.module"
// @ts-ignore
import stylesField from "../styles/field.module"

const Auth: React.FC = () => {
  const {
    toggle: { authForm },
  } = useSelector((state: RootStore) => state)
  const dispatch = useDispatch()
  const [isLogin, setIslogin] = useState(true)
  const [form, setForm] = useState([
    { param: "username", type: "text", value: "", title: "Username", msg: "" },
    {
      param: "email",
      type: "email",
      value: "",
      title: "Email address",
      msg: "",
    },
    {
      param: "password",
      type: "password",
      value: "",
      title: "Password",
      msg: "",
    },
  ])

  const [login, logFetch] = useLazyQuery(LOGIN_USER)
  const [register, regFetch] = useLazyQuery(REGISTER_USER)

  useEffect(() => {
    if (logFetch.error || regFetch.error) {
      setForm((prevForm) =>
        prevForm.map((field) => {
          return { ...field, msg: "" }
        })
      )

      const errors: IAuthErrors = JSON.parse(
        logFetch.error?.message || regFetch.error?.message || ""
      )
      setForm((prevForm) =>
        prevForm.map((field) => {
          let newField = field
          Object.keys(errors).forEach((key: string) => {
            if (key === field.param) {
              errors[key].msg &&
                errors[key].msg.forEach((msg) => {
                  newField.msg += ` ${msg}`
                })
              newField.msg = newField.msg.trim()
            }
          })
          return newField
        })
      )
    } else if (
      (logFetch.data && logFetch.data.login) ||
      (regFetch.data && regFetch.data.register)
    ) {
      dispatch({
        type: SET_AUTH,
        payload: {
          auth: logFetch.data.login || regFetch.data.register,
          init: false,
        },
      })
      dispatch({ type: AUTHFORM_TOGGLE })
    }
  }, [logFetch, regFetch, dispatch])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevForm) =>
      prevForm.map((field) => {
        if (event.target.name === field.param) {
          return { ...field, value: event.target.value, msg: "" }
        }
        return field
      })
    )
  }

  const flipForm = () => {
    setForm((prevForm) =>
      prevForm.map((field) => {
        return { ...field, msg: "" }
      })
    )
    setIslogin((prevIsLogin) => !prevIsLogin)
  }

  const handleSubmit = (
    event:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    const [username, email, password] = form

    if (isLogin) {
      login({ variables: { email: email.value, password: password.value } })
    } else {
      register({
        variables: {
          username: username.value,
          email: email.value,
          password: password.value,
        },
      })
    }
  }

  const fields = form.map((field) => {
    return (
      <Field
        key={field.param}
        field={field}
        change={handleChange}
        exClass={
          isLogin && field.param === "username" ? stylesField.field__close : ""
        }
      />
    )
  })

  return (
    <div className={`${styles.form} ${authForm && styles.form__active}`}>
      <h3 className={`popup-title ${styles.form__title}`}>
        {isLogin ? "Login" : "Register"}
      </h3>
      <form className={styles.form__fields} onSubmit={handleSubmit}>
        {fields}
        <button className='btn-handler'></button>
      </form>
      <div className={styles.form__btns}>
        <Button
          click={handleSubmit}
          exClass={stylesButton.btn_primary}
          Icon={isLogin ? AiOutlineLogin : AiOutlineCheckCircle}
          title={isLogin ? "Sign In" : "Sign Up"}
        />
        <Button
          click={flipForm}
          exClass={stylesButton.btn_simple}
          Icon={isLogin ? AiOutlineCheckCircle : AiOutlineLogin}
          title={isLogin ? "Sign Up" : "Sign In"}
        />
      </div>
    </div>
  )
}

export default Auth
