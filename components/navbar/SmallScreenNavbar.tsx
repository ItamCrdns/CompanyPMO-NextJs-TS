import Button from '../button/button'
import Link from 'next/link'
import Image from 'next/image'
import styles from './navbar.module.css'
import { type Employee } from '@/context/AuthContext'
import { navItems } from './SmallScreenNavLinks'
import useLogout from './logout'

interface SmallScreenNavbarProps {
  toggle: boolean
  employee: Employee
}

const SmallScreenNavbar = ({
  toggle,
  employee
}: SmallScreenNavbarProps): JSX.Element => {
  const { handleLogout } = useLogout()

  return (
    <section
      className={`${styles.overlay} ${toggle ? styles.fadeIn : styles.fadeOut}`}
    >
      {employee.employeeId !== 0
        ? (
        <section className={styles.useroverlay}>
          <section className={styles.usercontainer}>
            {employee.profilePicture !== null
              ? (
              <Image
                src={employee.profilePicture}
                alt={employee.username}
                width={50}
                height={50}
                style={{ borderRadius: '50%' }}
              />
                )
              : (
              <div className={styles.nouser}>?</div>
                )}
            <section className={styles.userinfo}>
              <span>
                Welcome, <span>{employee.username}</span>
              </span>
              <Link href={`/profile/${employee.username}`}>Your profile</Link>
            </section>
            <div onClick={handleLogout}>
              <Button
                text={
                  <span style={{ fontSize: '14px' }}>
                    <span
                      style={{ margin: '-2.25rem' }}
                      className="material-symbols-outlined"
                    >
                      logout
                    </span>
                    Logout
                  </span>
                }
                backgroundColor="rgb(255, 80, 120)"
                effectColor="rgb(255, 50, 120)"
                textColor="white"
              />
            </div>
          </section>
        </section>
          )
        : (
        <section className={styles.useroverlay}>
          <section className={styles.usercontainer}>
            <span>You are not logged in.</span>
            <Button
              text='Login'
              backgroundColor="#90E0EF"
              effectColor="#CAF0F8"
              textColor="white"
              href='/login'
            />
          </section>
        </section>
          )}
      <section className={styles.items}>{navItems}</section>
    </section>
  )
}

export default SmallScreenNavbar
