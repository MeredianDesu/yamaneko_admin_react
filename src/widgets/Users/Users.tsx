import { httpApi } from 'api/httpApi'
import { TEAM, USERS } from 'api/routes'
import { type IUser } from 'entities/users/userResponse'
import { useEffect, useState } from 'react'
import { notification } from 'shared/components/Notification/Notification'
import { type Action, Table } from 'shared/components/Table/Table'
import { contentText } from 'shared/constants/contentText'

import styles from './Users.module.scss'

export const Users = () => {
  const [userData, setUserData] = useState<IUser[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchUserData = async () => {
      await httpApi
        .get(USERS)
        .then((response) => {
          setUserData(response.data)
          setIsLoading(false)
        })
        .catch((error) => {
          setIsLoading(false)
          notification({ message: error.message, type: 'error' })
        })
    }

    fetchUserData()
  }, [])

  const actionsList: Action[] = [
    {
      name: 'Promote',
      aOnClick: async (userId: number | string, userName: string) => {
        console.log(`USER ID ${userId}`)
        await httpApi
          .post(TEAM, { name: userName, user: userId })
          .then(() => {
            notification({ message: `User ${userName}[${userId}] promoted!`, type: 'info' })
          })
          .catch((error) => {
            notification({ message: error.message, type: 'error' })
          })
      },
    },
    {
      name: 'Demote',
      aOnClick: async (userId: number | string, userName: string) => {
        await httpApi
          .delete(`${TEAM}/${userId}`)
          .then(() => {
            notification({ message: `User ${userName}[${userId}] demoted!`, type: 'info' })
          })
          .catch((error) => {
            notification({ message: error.message, type: 'error' })
          })
      },
    },
  ]

  if (!isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.head}>
            <span className={styles.page_name}>{contentText.usersHeader}</span>
            <span className={styles.page_subject}>{contentText.usersDesc}</span>
          </div>
          <div className={styles.users_data}>
            <div className={styles.head_bar}>
              <span>
                {contentText.userTableName}
                <span className={styles.users_count}> {userData.length}</span>
              </span>
            </div>
            <Table
              className={styles.table_container}
              displayedValues={['id', 'username', 'email', 'roles']}
              data={userData}
              clickable={false}
              actions={actionsList}
            />
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.head}>
            <span className={styles.page_name}>{contentText.usersHeader}</span>
            <span className={styles.page_subject}>{contentText.usersDesc}</span>
          </div>
          <div className={styles.users_data}>
            <div className={styles.head_bar}>
              <span>Loading users...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
