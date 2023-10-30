import React from 'react'
import { type Project } from '@/interfaces/project'
import getProjects from '@/api-calls/getProjects'
import styles from './projectslist.module.css'
import HeaderDescriptor from './HeaderDescriptor'
import EachProject from './EachProject'
import RippleButton from '@/components/ripplebutton/RippleButton'
import TitleWrapper from './_header/TitleWrapper'

const ProjectsPage = async (props: {
  children: React.ReactNode
}): Promise<JSX.Element> => {
  const { data } = await getProjects('1', '3') // Page 1 (always) 3 projects per company
  const projects = data as Project[]

  return (
    <>
      {props.children}
      <main className={styles.main}>
        <TitleWrapper title="Projects overview" />
        <section className={styles.projectswrapper}>
          <HeaderDescriptor dashboard={false} isProject />
          {Object.entries(projects).map(([companyName, projects]) => (
            <React.Fragment key={companyName}>
              <div key={companyName} className={styles.companywrapper}>
                <h1>{companyName}</h1>
                {Array.isArray(projects) && projects.length > 0 && (
                  <div>
                    <RippleButton
                      text="More projects..."
                      href={`/projects/company/${projects[0].company.companyId}/${companyName}`}
                      width="125px"
                      textColor="white"
                      backgroundColor="#80B3FF"
                    />
                  </div>
                )}
              </div>
              {Array.isArray(projects) && (
                <ul>
                  {projects.map((project: Project, index: number) => (
                    <li key={index}>
                      <EachProject project={project} showCompanyName={false} />
                    </li>
                  ))}
                </ul>
              )}
            </React.Fragment>
          ))}
        </section>
      </main>
    </>
  )
}

export default ProjectsPage
