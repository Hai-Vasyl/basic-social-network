import React, { useRef } from "react"
// @ts-ignore
// import styles from "../styles/chat.module"
import ButtonTab from "./ButtonTab"
import { BsSearch, BsX } from "react-icons/bs"
// @ts-ignore
import styles from "../styles/searchsimple.module"

interface SearchSimpleProps {
  searchStr: string
  IconBtn: any
  placeholder: string
  clickBtn(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): any
  changeForm(event: React.ChangeEvent<HTMLInputElement>): any
  clearForm(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): any
}

const SearchSimple: React.FC<SearchSimpleProps> = ({
  searchStr,
  IconBtn,
  placeholder,
  changeForm,
  clearForm,
  clickBtn,
}) => {
  const searchInput = useRef<HTMLInputElement | null>(null)

  const handleFocusForm = () => {
    searchInput.current?.focus()
  }

  return (
    <div className={styles.searchbar}>
      <ButtonTab click={clickBtn} Icon={IconBtn} />
      <div
        className={styles.searchbar__container}
        onSubmit={(event) => event.preventDefault()}
      >
        <input
          type='text'
          className={styles.searchbar__input}
          value={searchStr}
          onChange={changeForm}
          placeholder={placeholder}
          ref={searchInput}
        />
        <button
          className={styles.searchbar__btn_search}
          onClick={!!searchStr ? clearForm : handleFocusForm}
        >
          {!!searchStr ? <BsX /> : <BsSearch />}
        </button>
      </div>
    </div>
  )
}

export default SearchSimple
