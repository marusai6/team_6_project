import React from 'react'
import './output.css'
import './styles.css'

import { Provider } from "react-redux"
import { store } from "./src/state/store"
import { HashRouter, Route, Routes } from "react-router-dom"
import Layout from './Layout'
import MainDashboard from './src/components/dashboards/MainDashboard'
import RecruitmentPage from './src/components/dashboards/RecruitmentPage'
import FilterOptionsProvider from './src/providers/FilterOptionsProvider'
import FiltersGlobalStateProvider from './src/providers/FiltersGlobalStateProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const BASE_URL = '/ds/ds_10/dashboards'


const queryClient = new QueryClient()

function App() {

  return (
    <Provider store={store}>
      <FilterOptionsProvider>
        <FiltersGlobalStateProvider>
          <QueryClientProvider client={queryClient}>
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
            <ReactQueryDevtools initialIsOpen={true} />
          </QueryClientProvider>
        </FiltersGlobalStateProvider>
      </FilterOptionsProvider>
    </Provider>
  )
}

export default App
