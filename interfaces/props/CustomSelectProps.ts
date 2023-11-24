export interface Option {
  value: number // ? Pretty much the key but too late to change it
  label: string
  info?: string
  picture?: string // * Optional: display pictures in the CustomSelect component
}

export interface CustomSelectProps {
  options: Option[]
  text: string
  onSelect: (value: Option) => void
  defaultValue: string
  optionsWidth?: string
  disabled?: boolean // ? Will use it to disable the custom select based on a condition
  clearSelectedOption?: () => void // ? Optional callback function that will clear the selected option in the parent component
  showReset?: boolean // ? Will use it to show the reset button based on a condition
  isPaginated?: boolean // ? Sometimes, the options might be a lot, so we need to paginate it
  iconSize?: string // ? The size of the icon. Only makes sense to use it when isPaginated is true. Setting it without isPaginated will have no effect
  pageSize?: number // ? Dependant of isPaginated
  onPageChange?: (page: number) => void // ? Dependant of isPaginated
  // * If using showPictures, make sure to set a picture for each option
  showPictures?: boolean // ? Alternate listing with pictures
}
