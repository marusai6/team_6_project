import React from 'react'
import './output.css'
import './styles.css'

import { Provider } from "react-redux"
import { store } from "./src/state/store"
import { HashRouter, Route, Routes } from "react-router-dom"
import MainPage from './src/pages/MainPage';

const BASE_URL = '/ds/ds_10/dashboards'

function App() {

  return (
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path={BASE_URL}>
            <Route index element={<MainPage />} />
            <Route path={'*'} element={<h1>Not Found</h1>} />
          </Route>
        </Routes>
      </HashRouter>
    </Provider>
  )
}

export default App
