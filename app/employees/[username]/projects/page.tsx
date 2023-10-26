import getUserProjects from '@/api-calls/getUserProjects'
import ProjectList from './ProjectList'
import styles from '../employee.module.css'
import Link from 'next/link'
import { type SearchParams } from '@/interfaces/searchParams'

interface Props {
  params: { username: string }
  searchParams: SearchParams
}

const EmployeeProjects: React.FunctionComponent<Props> = async ({
  params,
  searchParams
}) => {
  const { username } = params
  let { page } = searchParams

  if (page === undefined || page === null) {
    // Set the value to 1 if the user removes the page?=# from the URL
    page = '1'
  }

  const { data } = await getUserProjects(username, page, '10')

  const projects = data?.data ?? []
  const totalPages = data?.pages ?? 0

  return (
    <section className={styles.projectsinterceptionwrapper}>
      <section className={styles.projects}>
        <Link
          href={`/employees/${username}`}
          className={`material-symbols-outlined ${styles.closebutton}`}
        >
          close
        </Link>
        <ProjectList
          projects={projects}
          username={username}
          totalPages={totalPages}
          searchParams={searchParams}
        />
      </section>
    </section>
  )
}

export default EmployeeProjects
