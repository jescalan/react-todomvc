import './style.css'
import React from 'react'

function Footer({ filter, itemCount }) {
  const selected = self => (self == filter ? 'selected' : '')
  const words = { all: 'in total', active: 'left', completed: 'finished' }
  return (
    <footer className='component-footer'>
      <label>
        <strong>{itemCount}</strong>&nbsp;
        {itemCount == 1 ? 'item' : 'items'}&nbsp;
        {words[filter]}
      </label>
      <div className='links'>
        <a className={selected('all')} href='#all'>
          All
        </a>
        <a className={selected('active')} href='#active'>
          Active
        </a>
        <a className={selected('completed')} href='#completed'>
          Completed
        </a>
      </div>
      <label />
    </footer>
  )
}

export default Footer
