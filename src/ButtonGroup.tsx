import React from 'react'
import capitalize from 'lodash/capitalize'
import './ButtonGroup.css'

interface Props {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  refetch: () => void
  nextDisabled: boolean
  country: string
  setCountry: React.Dispatch<React.SetStateAction<string>>
  category: string
  setCategory: React.Dispatch<React.SetStateAction<string>>
}

const COUNTIES = [
  { code: 'ca', name: 'Canada' },
  { code: 'us', name: 'US' },
  { code: 'gb', name: 'UK' },
  { code: 'ru', name: 'Russia' },
  { code: 'au', name: 'Australia' },
  { code: 'it', name: 'Italy' },
]

const CATEGORIES = [
  'business',
  'general',
  'entertainment',
  'health',
  'science',
  'sports',
  'technology',
]

const ButtonGroup: React.FC<Props> = (props: Props) => {
  const {
    page,
    setPage,
    refetch,
    nextDisabled,
    country,
    setCountry,
    setCategory,
    category,
  } = props

  return (
    <div className="btns">
      <button
        className="btn prev"
        onClick={() => page > 1 && setPage((state) => state - 1)}
        disabled={page === 1}
      >
        Previous
      </button>
      <button className="btn refresh" onClick={refetch}>
        Refresh!
      </button>
      <select
        name="country"
        onChange={(e) => {
          setCountry(e.target.value)
        }}
      >
        {COUNTIES.map((cty) => (
          <option
            key={cty.code}
            value={cty.code}
            selected={country === cty.code}
          >
            {cty.name}
          </option>
        ))}
      </select>
      <select name="category" onChange={(e) => setCategory(e.target.value)}>
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat} selected={category === cat}>
            {capitalize(cat)}
          </option>
        ))}
      </select>
      <button
        className="btn next"
        disabled={nextDisabled}
        onClick={() => !nextDisabled && setPage((state) => state + 1)}
      >
        Next
      </button>
    </div>
  )
}

export default ButtonGroup
