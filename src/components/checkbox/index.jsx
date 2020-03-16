import './style.css'
import React from 'react'

export default function Checkbox({ checked, onToggle }) {
  return (
    <input
      type='checkbox'
      checked={checked || false}
      className={`component-checkbox${checked ? ' checked' : ''}`}
      onChange={onToggle}
    />
  )
}
