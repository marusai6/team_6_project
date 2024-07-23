import React from 'react'
import './output.css'
import './styles.css'

import { Provider } from "react-redux"
import { store } from "./src/state/store"
import { HashRouter, Route, Routes } from "react-router-dom"
import Layout from './Layout'
import MainDashboard from './src/components/dashboards/MainDashboard'
import RecruitmentPage from './src/components/dashboards/RecruitmentPage'
import FilterOptionsProvider from './src/providers/FIlterOptionsProvider'

export const BASE_URL = '/ds/ds_10/dashboards'

function App() {

  return (
    <Provider store={store}>
      <FilterOptionsProvider>
        <HashRouter>
          <Routes>
            <Route path={BASE_URL} element={<Layout />}>
              <Route index element={<MainDashboard />} />
              <Route path={'employees'} element={<RecruitmentPage />} />
              <Route path={'settings'} element={<h1>Настройки</h1>} />
              <Route path={'*'} element={<h1>Not Found</h1>} />
            </Route>
          </Routes>
        </HashRouter>
      </FilterOptionsProvider>
    </Provider>
  )
}

export default App
