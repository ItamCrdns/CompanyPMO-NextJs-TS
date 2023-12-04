import styles from '@/app/projects/(list)/projectslist.module.css'
import LoggedInCard from './LoggedInCard'

interface TitleWrapperProps {
  title: string
  icon: string
  showButton?: boolean
  buttonText?: string
  buttonHref?: string
  buttonWidth?: string
  isDashboard?: boolean
  showPictures?: boolean // ? Will be used to show pictures in the options dropdown
  isPage?: boolean
}

// ? TitleWrapper component holds a big title for an entity and a button that can contain options, a button, and some text

const TitleWrapper: React.FC<TitleWrapperProps> = (props) => {
  return (
    <div className={styles.titlewrapper}>
      <span>
        <span
          style={{ fontSize: '50px' }}
          className='material-symbols-outlined'
        >
          {props.icon}
        </span>
        <h1>{props.title}</h1>
      </span>
      <LoggedInCard
        optionsText='Filters'
        isDashboard={props.isDashboard}
        isPage={props.isPage}
        showButton={props.showButton}
        buttonText={props.buttonText}
        buttonHref={props.buttonHref}
        buttonWidth={props.buttonWidth}
        showPictures={props.showPictures}
      />
    </div>
  )
}

export default TitleWrapper
