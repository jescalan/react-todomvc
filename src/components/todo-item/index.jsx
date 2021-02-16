import './style.css'
import React, { useState } from 'react'
import { format } from 'date-fns'
import Checkbox from '../checkbox'
import { KeyCode } from '../../utils/constants'

export default function TodoItem({
  todo,
  filter,
  onToggle,
  onUpdate,
  onDestroy,
}) {
  const [editText, setEditText] = useState('')
  const [editing, setEditing] = useState(false)

  function intoEdit() {
    setEditing(true)
    setEditText(todo.name)
  }

  function inputText(event) {
    setEditText(event.target.value)
  }

  function submitText() {
    if (editText) {
      onUpdate(editText.trim())
      setEditing(false)
    } else {
      onDestroy()
    }
  }

  function handleKeyDown(event) {
    if (event.which === KeyCode.Escape) {
      setEditing(false)
    } else if (event.which === KeyCode.Enter) {
      submitText()
    }
  }

  return editing ? (
    <li className="component-item-editing">
      <input
        autoFocus
        value={editText}
        onBlur={submitText}
        onChange={inputText}
        onKeyDown={handleKeyDown}
      />
    </li>
  ) : (
    <li className="component-item">
      <Checkbox checked={todo.completed} onToggle={onToggle} />
      <div className="container">
        <label
          className={todo.completed && filter != 'completed' ? 'completed' : ''}
          onDoubleClick={intoEdit}
        >
          {todo.name}
        </label>
        <label className="time">
          {format(
            todo.completed && filter == 'completed'
              ? todo.completedAt
              : todo.createdAt,
            'yyyy-MM-dd HH:mm'
          )}
        </label>
      </div>
      <button className="destroy" onClick={onDestroy}>
        ×
      </button>
    </li>
  )
}
