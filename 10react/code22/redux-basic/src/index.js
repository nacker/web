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

// App 组件
import App from './components/App'

import configStore from './configStore'

const store = configStore()

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
