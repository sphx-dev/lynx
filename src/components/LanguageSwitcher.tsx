import Select from "react-select"

import { useTranslation } from "react-i18next"
import { OptionType } from "./Select"
import { useState } from "react"

const LanguageSwitcher = () => {
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null)
  const { i18n } = useTranslation()

  const changeLanguage = (option: OptionType | null) => {
    if (!option) return

    i18n.changeLanguage(option.value)
    setSelectedOption(option)
  }

  const options: OptionType[] = [
    { value: "en", label: "English" },
    { value: "es", label: "Español" },
  ]

  return (
    <Select
      options={options}
      value={selectedOption || options[0]}
      onChange={changeLanguage}
    />
  )
}

export default LanguageSwitcher
