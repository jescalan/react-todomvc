import './style.css'
import React from 'react'
import { format } from 'date-fns'
import Checkbox from '../checkbox'
import { KeyCode } from '../../utils/constants'

class TodoItem extends React.Component {
  state = {
    editText: '',
    editing: false
  }

  intoEdit = () => {
    this.setState({ editText: this.props.todo.name, editing: true })
  }

  inputText = event => {
    this.setState({ editText: event.target.value })
  }

  submitText = () => {
    var name = this.state.editText.trim()
    if (name) {
      this.props.onUpdate(name)
      this.setState({ editing: false })
    } else {
      this.props.onDestroy()
    }
  }

  handleKeyDown = event => {
    if (event.which === KeyCode.Escape) {
      this.setState({ editing: false })
    } else if (event.which === KeyCode.Enter) {
      this.submitText()
    }
  }

  render() {
    const { todo, filter, onToggle, onDestroy } = this.props
    const { editText, editing } = this.state
    return editing ? (
      <li className='component-item-editing'>
        <input
          autoFocus
          value={editText}
          onBlur={this.submitText}
          onChange={this.inputText}
          onKeyDown={this.handleKeyDown}
        />
      </li>
    ) : (
      <li className='component-item'>
        <Checkbox checked={todo.completed} onToggle={onToggle} />
        <div className='container'>
          <label
            className={
              todo.completed && filter != 'completed' ? 'completed' : ''
            }
            onDoubleClick={this.intoEdit}
          >
            {todo.name}
          </label>
          <label className='time'>
            {format(
              todo.completed && filter == 'completed'
                ? todo.completedAt
                : todo.createdAt,
              'yyyy-MM-dd HH:mm'
            )}
          </label>
        </div>
        <button className='destroy' onClick={onDestroy}>
          ×
        </button>
      </li>
    )
  }
}

export default TodoItem
