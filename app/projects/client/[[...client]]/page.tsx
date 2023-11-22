import getCompanyProjects from '@/api-calls/getCompanyProjects'
import { type Project } from '@/interfaces/project'
import styles from '@/app/projects/(list)/projectslist.module.css'
import EachProject from '../../(list)/EachProject'
import HeaderDescriptor from '../../(list)/HeaderDescriptor'
import TitleWrapper from '../../../../components/Header title/TitleWrapper'
import { type ClientNameProps } from '@/interfaces/props/ClientNameProps'
import { projectSortValues } from '@/app/dashboard/@admin/@projects/sortValues'
import generateQueryParams from '../queryParams'
import QueryParamsPagination from '@/components/Advanced query params based pagination/QueryParamsPagination'

const CompanyProjectsPage: React.FC<ClientNameProps> = async (props) => {
  const clientId = props.params.client[0]

  const queryParams = generateQueryParams(props.searchParams)

  const { data } = await getCompanyProjects(clientId, queryParams)

  const projects = (data?.data as Project[]) ?? []
  const totalPages = data?.pages ?? 0
  const totalProjects = data?.count ?? 0

  if (parseInt(props.searchParams.page) > totalPages) {
    props.searchParams.page = totalPages.toString()
  }

  if (parseInt(props.searchParams.pagesize) > totalProjects) {
    props.searchParams.pagesize = totalProjects.toString()
  }

  // Access the company name from one of the projects (its fine they all have the same company name)
  const companyName = projects[0].company.name.split('.').join('') // ! Remove dots from company name ("Inc.")
  const clientName = projects.length > 0 && companyName

  const title = `You are viewing ${clientName} projects.`

  const urlForQueryParams = `/projects/client/${clientId}/${clientName}?orderby=${props.searchParams.orderby}&sort=${props.searchParams.sort}`

  const baseUrl = `/projects/client/${clientId}/${clientName}/`

  return (
    <main className={styles.main}>
      <TitleWrapper title={title} icon="emoji_objects" showButton={false} />
      <section className={styles.projectswrapper}>
        <HeaderDescriptor
          dashboard={false}
          entity="projects"
          width="300px"
          sortValues={projectSortValues}
          pushSearchParams
          url={baseUrl}
          searchParams={props.searchParams}
        />
        <div className={styles.projectscontainer}>
          <QueryParamsPagination
            url={urlForQueryParams}
            totalPages={totalPages}
            searchParams={props.searchParams}
            entityName="Projects"
            totalEntitesCount={totalProjects}
          />
          {Array.isArray(projects) && (
            <ul>
              {projects.map((project: Project, index: number) => (
                <li key={index}>
                  <EachProject project={project} showCompanyName={false} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  )
}

export default CompanyProjectsPage
