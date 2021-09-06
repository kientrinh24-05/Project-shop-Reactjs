import React from 'react'
import * as sly from './Select.styled'
import PropTypes from 'prop-types'

export default function Select({ onChange, value = '', title, options = [], titleValue = '', ...props }) {
  const handleChange = event => {
    const value = event.target.value
    onChange && onChange(value)
  }
  return (
    <sly.Select onChange={handleChange} value={value} {...props}>
      <option disabled value={titleValue}>
        {title}
      </option>

      {options.map(({ name, value }, index) => (
        <option value={value} key={index}>
          {name}
        </option>
      ))}
    </sly.Select>
  )
}
Select.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      titleValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  ),
  titleValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
