import getProject from '@/api-calls/getProject'
import styles from './project.module.css'
import { type Images } from '@/interfaces/images'
import { relativeTime } from '@/utility/relativeTime'
import { type Employee } from '@/interfaces/employee'
import { type Company } from '@/interfaces/company'
import EntityPriority from '@/components/Generic Entity Renderer/EntityPriority'
import ProjectEmployees from './ProjectEmployees'
import ExpectedDeliveryDate from './ExpectedDeliveryDate'
import Image from 'next/image'
import ProjectCreator from './ProjectCreator'

interface ProjectIdProps {
  children: React.ReactNode
  tasks: React.ReactNode
  params: { projectId: string }
}

const ProjectId: React.FC<ProjectIdProps> = async (props) => {
  const { children, tasks, params } = props

  const { data } = await getProject(params.projectId)

  const project = data
  const images = project?.images as Images
  const employees = project?.team as Employee[]
  const company = project?.company as Company
  const projectCreator = project?.creator as Employee

  const employeeCount = data?.employeeCount ?? 0
  const projectId = data?.projectId ?? 0

  const tasksCount = data?.tasksCount ?? 0

  return (
    <section className={styles.contentwrapper}>
      {children}
      <article className={styles.projectwrapper}>
        <article className={styles.project}>
          <div className={styles.headerwrapper}>
            <h1>{project?.name}</h1>
            <h3>
              <span className={styles.grayedtext}>Company: </span>
              {company.name}
            </h3>
          </div>
          <div className={styles.projectcontainer}>
            <section className={styles.projectsidea}>
              <p className={styles.grayedtext}>Description</p>
              <p>{project?.description}</p>
              {Array.isArray(images) && (
                <ul>
                  {images.map((image: Images) => (
                    <li key={image.imageId}>
                      <Image
                        src={image.imageUrl}
                        alt={image.publicId}
                        width={125}
                        height={125}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </section>
            <aside className={styles.projectsideb}>
              <p className={styles.grayedtext}>Priority</p>
              <EntityPriority priority={project?.priority ?? 0} />
              <p className={styles.grayedtext}>Created by</p>
              <ProjectCreator
                profilePicture={projectCreator.profilePicture}
                username={projectCreator.username}
                creator={projectCreator}
              />
              <p className={styles.grayedtext}>Status</p>
              <p>{project?.lifecycle}</p>
              <p className={styles.grayedtext}>Date</p>
              <p>
                Created{' '}
                {relativeTime(new Date(project?.created ?? '').getTime())}
              </p>
              <ExpectedDeliveryDate project={project} />
            </aside>
          </div>
        </article>
        {Array.isArray(employees) && (
          <ProjectEmployees
            employees={employees}
            projectId={projectId}
            employeeCount={employeeCount}
          />
        )}
      </article>
      {tasksCount > 0 && tasks}
    </section>
  )
}

export default ProjectId
