import { useState } from 'react'
import styles from './select.module.css'

interface Option {
  value: number
  label: string
  info: string
}

interface CustomSelectProps {
  options: Option[]
  text: string
  onSelect: (value: number) => void
}

const CustomSelect = ({ text, options, onSelect }: CustomSelectProps): JSX.Element => {
  const [toggle, setToggle] = useState<boolean>(false)
  const [selectedOption, setSelectedOption] = useState<Option | null>(null)

  const handleToggleDropdown = (): void => {
    setToggle(!toggle)
  }

  const handleOptionClick = (option: Option): void => {
    setSelectedOption(option)
    onSelect(option.value)
    setToggle(false)
  }

  return (
    <div className={styles.customselect}>
      <div onClick={handleToggleDropdown} className={styles.optionselected}>
      <p>{selectedOption !== null ? selectedOption.label : `Select a ${text}...`}</p>
        <span className="material-symbols-outlined">expand_more</span>
      </div>
      {toggle && Array.isArray(options) && (
        <ul>
          {options.map((option) => (
            <li onClick={() => { handleOptionClick(option) }} key={option.value}>
              <h4>{option.label}</h4>
              <p>{option.info}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CustomSelect
