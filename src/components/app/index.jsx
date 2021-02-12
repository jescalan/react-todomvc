import './global.css'
import './style.css'
import React, { useEffect, useState } from 'react'
import { KeyCode } from '../../utils/constants'
import { getHashPath } from '../../utils/page-address'
import Todos from '../../utils/todo-list'
import TodoItem from '../todo-item'
import Footer from '../footer'

const TODOS = new Todos()

export default function App() {
  const [newTodo, setNewTodo] = useState('')
  const [filter, setFilter] = useState(getHashPath() || 'active')
  const [items, setItems] = useState([])

  function loadItems(_filter) {
    if (typeof _filter === undefined) return setItems(TODOS.filter(filter))

    setFilter(_filter)
    setItems(TODOS.filter(_filter))
  }

  function inputText(event) {
    setNewTodo(event.target.value.trim())
  }

  function newTodoKeyDown(event) {
    if (event.keyCode === KeyCode.Enter) {
      event.preventDefault()
      if (newTodo.length) {
        TODOS.add(newTodo)
        setNewTodo('')
        const applyFilter = filter === 'completed' ? 'active' : filter
        loadItems(applyFilter)
      }
    }
  }

  function toggle(todo) {
    TODOS.toggle(todo)
    loadItems()
  }

  function update(todo, newName) {
    TODOS.rename(todo.id, newName)
    loadItems()
  }

  function destroy(todo) {
    TODOS.delete(todo)
    loadItems()
  }

  useEffect(() => {
    loadItems()

    function hashchange() {
      loadItems(getHashPath())
    }
    window.addEventListener('hashchange', hashchange)
    return () => window.removeEventListener('hashchange', hashchange)
  }, [])

  return (
    <div id="page-info">
      <h1>todos</h1>
      <section className="todo-app">
        <label className="indicator">❯</label>
        <input
          placeholder="What needs to be done?"
          value={newTodo}
          onChange={inputText}
          onKeyDown={newTodoKeyDown}
          autoFocus={true}
        />
        <ul>
          {items.map((todo, index) => (
            <TodoItem
              key={index}
              todo={todo}
              filter={filter}
              onToggle={toggle.bind(null, todo)}
              onUpdate={update.bind(null, todo)}
              onDestroy={destroy.bind(null, todo)}
            />
          ))}
        </ul>
        <Footer filter={filter} itemCount={items.length} />
      </section>
      <footer className="info">
        <p>Double-click to edit a todo</p>
        <p>
          Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    </div>
  )
}
