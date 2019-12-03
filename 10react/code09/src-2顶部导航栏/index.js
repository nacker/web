import React from 'react'
import ReactDOM from 'react-dom'

// 导入 antd-mobile 的样式文件
import 'antd-mobile/dist/antd-mobile.css'

// 导入字体图标库的样式
import './assets/fonts/iconfont.css'

// 导入全局样式
import './index.css'

// 导入根组件
import App from './App'

// 渲染根组件
ReactDOM.render(<App />, document.getElementById('root'))
