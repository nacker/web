import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

// 导入路由
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'

// store
import { createStore } from 'redux'
import reducer from './reducers'

// App 组件
import App from './components/App'

// 初始化状态
const initialState = JSON.parse(localStorage.getItem('todos'))

// 创建store
const store = createStore(reducer, initialState)

store.subscribe(() => {
  localStorage.setItem('todos', JSON.stringify(store.getState()))
})

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/all" />} />
        <Route exact path="/:filter?" component={App} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
)
