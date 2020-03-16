import React from 'react'

export default function Checkbox({ checked, onToggle }) {
  return (
    <Input
      type='checkbox'
      checked={checked || false}
      className={checked ? 'checked' : ''}
      onChange={onToggle}
    />
  )
}
