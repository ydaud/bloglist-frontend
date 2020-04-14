import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from "react-router-dom"
import store from './store'
import App from './App'
import Container from '@material-ui/core/Container'
import './index.css'

ReactDOM.render(
  <Container>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </Container>,
  document.getElementById('root'))
