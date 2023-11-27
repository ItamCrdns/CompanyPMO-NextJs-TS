import Image from 'next/image'
import styles from './select.module.css'
import SelectPaginationUI from './SelectPaginationUI'
import { type SelectUIProps } from './SelectUI'
import { type Option } from '@/interfaces/props/CustomSelectProps'
import { updateStateWithQueryParams } from './updateStateWithQueryParams'
import RippleButton from '../ripplebutton/RippleButton'

const OptionsListUI: React.FC<Partial<SelectUIProps>> = (props) => {
  const showPicture = props.showPictures !== null && props.showPictures === true

  const handleSingleSelection = (option: Option): void => {
    props.handleOptionClick?.(option)
  }

  // * Convert the string to an array of strings
  const selectedEmployeesStrings = Array.from(
    props.selectedOptions?.split('-') ?? []
  )

  // * then, convert the array of strings to an array of numbers
  const selectedEmployees = selectedEmployeesStrings.map((e) => parseInt(e))

  const defaultEmployees = props.defaultEntities ?? []

  updateStateWithQueryParams(defaultEmployees, props)

  const handleMultipleSelection = (option: Option): void => {
    props.handleMultipleOptionClick?.(option)
  }

  const handleClick = (option: Option): void => {
    props.multiple === true
      ? handleMultipleSelection(option)
      : handleSingleSelection(option)
  }

  const handleClose = (): void => {
    props.handleToggleDropdown?.(false)
  }

  if (props.toggle === true && props.shouldShowDropdown === true && Array.isArray(props.options)) {
    return (
      <div
        style={{ width: props.optionsWidth ?? '' }}
        className={styles.optionswrapper}
      >
        <ul>
          {props.options.map((opt) => (
            <li
              onClick={() => {
                handleClick(opt)
              }}
              key={opt.value}
              style={{
                background: selectedEmployees?.some((e) => e === opt.value) // * Highlight selected options
                  ? 'var(--banner-color)'
                  : ''
              }}
            >
              {showPicture && (
                <Image
                  src={opt.picture ?? ''}
                  alt={opt.label ?? ''}
                  width={25}
                  height={25}
                />
              )}
              <h4>{opt.label}</h4>
              <p style={{ textAlign: 'right' }}>{opt.info}</p>
            </li>
          ))}
        </ul>
        <SelectPaginationUI
          pageSize={props.pageSize}
          onPageChange={props.onPageChange}
          isPaginated={props.isPaginated}
        />
        {props.showCloseButton === true && (
          <RippleButton
            text="Close"
            backgroundColor="rgb(255, 80, 120)"
            textColor="white"
            func={handleClose}
          />
        )}
      </div>
    )
  }
}

export default OptionsListUI
