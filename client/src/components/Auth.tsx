import React, { useState, useEffect } from "react"
import { LOGIN_USER, REGISTER_USER } from "../fetching/queries"
import { useLazyQuery } from "@apollo/client"
import { AiOutlineLogin, AiOutlineCheckCircle } from "react-icons/ai"
import { useSelector, useDispatch } from "react-redux"
import { RootStore } from "../redux/store"
import { SET_AUTH } from "../redux/auth/authTypes"
import { IAuthErrors } from "../interfaces"
import "../styles/auth.scss"

const Auth: React.FC = () => {
  const {
    auth: { token, user },
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
      param: "firstname",
      type: "text",
      value: "",
      title: "First name",
      msg: "",
    },
    { param: "lastname", type: "text", value: "", title: "Last name", msg: "" },
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
    setIslogin((prevIsLogin) => !prevIsLogin)
  }

  const handleSubmit = (
    event:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    const [username, email, firstname, lastname, password] = form

    if (isLogin) {
      login({ variables: { email: email.value, password: password.value } })
    } else {
      register({
        variables: {
          username: username.value,
          email: email.value,
          password: password.value,
          firstname: firstname.value,
          lastname: lastname.value,
        },
      })
    }
  }

  const fields = form.map((field) => {
    return (
      <label
        key={field.param}
        className={`field ${
          isLogin &&
          (field.param === "firstname" ||
            field.param === "lastname" ||
            field.param === "username") &&
          "field--close"
        }`}>
        <span className='field__title'>{field.title}</span>
        <input
          className='field__input'
          name={field.param}
          type={field.type}
          value={field.value}
          onChange={handleChange}
          autoComplete='off'
        />
        <span
          className={`field__msg ${field.msg.length && "field__msg--error"}`}>
          {field.msg}
        </span>
      </label>
    )
  })

  return (
    <div className='form'>
      <h3 className='form__title'>{isLogin ? "Login" : "Register"}</h3>
      <form className='form__fields' onSubmit={handleSubmit}>
        {fields}
        <button className='btn-handler'></button>
      </form>
      <div className='form__btns'>
        <button className='btn btn-primary' onClick={handleSubmit}>
          {isLogin ? (
            <AiOutlineLogin className='btn__icon' />
          ) : (
            <AiOutlineCheckCircle className='btn__icon' />
          )}
          <span className='btn__title'>{isLogin ? "Sign In" : "Sign Up"}</span>
        </button>
        <button className='btn btn-simple' onClick={flipForm}>
          {isLogin ? (
            <AiOutlineCheckCircle className='btn__icon' />
          ) : (
            <AiOutlineLogin className='btn__icon' />
          )}
          <span className='btn__title'>{isLogin ? "Sign Up" : "Sign In"}</span>
        </button>
      </div>
    </div>
  )
}

export default Auth
