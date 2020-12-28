import React from "react"
// @ts-ignore
import styles from "../styles/chatinfo.module"
import { IOwner } from "../interfaces"
import UserCard from "./UserCard"

interface IUserLinksProps {
  members: IOwner[]
  owner: IOwner
  isLink?: boolean
}

const UserLinks: React.FC<IUserLinksProps> = ({
  members,
  owner,
  isLink = false,
}) => {
  return (
    <div className={styles.access_block}>
      <div className={styles.access_block__section}>
        <div className={styles.access_block__title}>Chat owner</div>
        <UserCard user={owner} isEnvChat isLink={isLink} />
      </div>
      <div className={styles.access_block__section}>
        <div className={styles.access_block__title}>Chat members</div>
        {members.length ? (
          members.map((user) => {
            return (
              <UserCard key={user.id} user={user} isEnvChat isLink={false} />
            )
          })
        ) : (
          <div className='plug-text'>No members</div>
        )}
      </div>
    </div>
  )
}

export default UserLinks
