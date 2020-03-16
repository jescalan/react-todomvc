import './global.css'
import './style.css'
import React from 'react'
import { KeyCode } from '../../utils/constants'
import { getHashPath } from '../../utils/page-address'
import Todos from '../../utils/todo-list'
import TodoItem from '../todo-item'
import Footer from '../footer'

class App extends React.Component {
  state = {
    newTodo: '',
    filter: getHashPath() || 'active',
    items: []
  }

  todos = new Todos()

  loadItems(filter) {
    if (filter == null || filter == this.state.filter) {
      this.setState({ items: this.todos.filter(this.state.filter) })
    } else {
      this.setState({ filter, items: this.todos.filter(filter) })
    }
  }

  inputText = event => {
    this.setState({ newTodo: event.target.value })
  }

  newTodoKeyDown = event => {
    if (event.keyCode == KeyCode.Enter) {
      event.preventDefault()
      var title = this.state.newTodo.trim()
      if (title) {
        this.todos.add(title)
        this.setState({ newTodo: '' })
        const filter =
          this.state.filter == 'completed' ? 'active' : this.state.filter
        this.loadItems(filter)
      }
    }
  }

  toggle = todo => {
    return () => {
      this.todos.toggle(todo)
      this.loadItems()
    }
  }

  update = todo => {
    return newName => {
      this.todos.rename(todo.id, newName)
      this.loadItems()
    }
  }

  destroy = todo => {
    return () => {
      this.todos.delete(todo)
      this.loadItems()
    }
  }

  hashchange = () => {
    this.loadItems(getHashPath())
  }

  componentDidMount() {
    this.loadItems()
    window.addEventListener('hashchange', this.hashchange)
  }

  componentWillUnmount() {
    window.removeEventListener('hashchange', this.hashchange)
  }

  render() {
    const { newTodo, filter, items } = this.state
    return (
      <div id='page-info'>
        <h1>todos</h1>
        <section className='todo-app'>
          <label className='indicator'>❯</label>
          <input
            placeholder='What needs to be done?'
            value={newTodo}
            onChange={this.inputText}
            onKeyDown={this.newTodoKeyDown}
            autoFocus={true}
          />
          <ul>
            {items.map((todo, index) => (
              <TodoItem
                key={index}
                todo={todo}
                filter={filter}
                onToggle={this.toggle(todo)}
                onUpdate={this.update(todo)}
                onDestroy={this.destroy(todo)}
              />
            ))}
          </ul>
          <Footer filter={filter} itemCount={items.length} />
        </section>
        <footer className='info'>
          <p>Double-click to edit a todo</p>
          <p>
            Created by <a href='https://github.com/J-F-Liu'>Junfeng Liu</a>
          </p>
          <p>
            Part of <a href='http://todomvc.com'>TodoMVC</a>
          </p>
        </footer>
      </div>
    )
  }
}

export default App
