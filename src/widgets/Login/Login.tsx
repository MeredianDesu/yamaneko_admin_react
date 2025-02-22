/* eslint-disable no-console */
import { httpApi } from 'api/httpApi'
import { LOGIN } from 'api/routes'
import { useAuth } from 'features/Auth/useAuth'
import { getFormValues } from 'features/Login/sendForm'
import { type SyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import emailImg from 'shared/assets/icons/email.svg'
import passwordImg from 'shared/assets/icons/password.svg'
import { Input } from 'shared/components/Input/Input'
import { notification } from 'shared/components/Notification/Notification'
import { contentText } from 'shared/constants/contentText'

import styles from './LogIn.module.scss'

export const Login = () => {
  const navigate = useNavigate()
  const { login, logout } = useAuth()

  const onSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const values = Array.from(form.elements)
      .filter((field) => {
        const input = field as HTMLInputElement
        return input.name && input.value !== undefined
      })
      .map((field) => {
        const input = field as HTMLInputElement
        return { name: input.name, value: input.value }
      })

    const formData = getFormValues(values)

    const sendCredentials = async () => {
      await httpApi
        .post(LOGIN, {
          ...formData,
        })
        .then((response) => {
          if (response.status === 200) {
            login(response.data.accessToken)
            navigate('/dashboard')
            notification({ message: 'Log in successfully!', type: 'success' })
          }
        })
        .catch((error) => {
          logout()
          notification({ message: error.message, type: 'error' })
        })
    }

    sendCredentials()
  }

  return (
    <div className={styles.container}>
      <form className={styles.login_form} onSubmit={onSubmit}>
        <h2>YAMANEKO admin</h2>
        <Input
          className={styles.input}
          name="email"
          type="email"
          placeholder={contentText.emailPlaceholder}
          autoComplete="off"
          src={emailImg}
        />
        <Input
          className={styles.input}
          name="password"
          type="password"
          placeholder={contentText.passwordPlaceholder}
          autoComplete="off"
          src={passwordImg}
        />
        <button className={styles.log_in} type="submit">
          {contentText.login}
        </button>
      </form>
    </div>
  )
}
