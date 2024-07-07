import React, { useEffect, useState } from 'react'
import './output.css'
import './styles.css'
import { AreaChart, BarChart, BarList } from '@tremor/react';

// @ts-ignore
import { KoobDataService } from 'bi-internal/services'
import { barChartData, barListData, chartdata } from '../ds_res/src/data/data';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ds_res/src/components/card"

import { ScrollArea } from "../ds_res/src/components/scroll-area"

import { urlState, UrlState } from 'bi-internal/core';

import { currencyDataFormatter, defaultDataFormatter } from '../ds_res/src/lib/utils';
import DonutChartComponent from '../ds_res/src/components/DonutChartComponent';
import { Popover } from '../ds_res/src/components/Popover';

const { koobDataRequest3 } = KoobDataService

function App() {

  // Checking URL (test)
  useEffect(() => {
    const urlModel = UrlState.getModel()
    console.log(`urlModel: ${JSON.stringify(urlModel, null, 2)}`)
  }, [])

  const [data, setData] = useState<{ name: string, value: number }[]>([])
  const [countryFilter, setCountryFilter] = useState<string | null>()

  useEffect(() => {
    const filterObject = countryFilter ? { customer_country: ['=', countryFilter] } : null
    koobDataRequest3(
      'course_2024.Student6',
      ['categoryname'],
      ['sum(order_totalprice)'],
      filterObject,

      // @ts-ignore
      { schema_name: 'ds_10' },
      'course_2024.Student6'
    ).then(res => {
      const mappedData = res.map((el) => {
        return {
          value: el.order_totalprice,
          name: el.categoryname,
        }
      })
      console.log(res)
      setData(mappedData)
    })
  }, [countryFilter])


  const [open, setOpen] = useState(false)

  const countryOptions = ['Мексика', 'Италия', 'Германия', 'Франция']

  return (
    <>

      <ScrollArea className="h-full w-full rounded-md border p-4 relative">
        <div className="grid grid-cols-12 gap-4 my-4 mx-4">
          <Card className="col-span-4">

            <CardHeader>
              <CardTitle>{countryFilter ? `Заказы по стране: ${countryFilter}` : 'Заказы по всем странам'}</CardTitle>
              <CardDescription>Круговая диаграмма</CardDescription>
            </CardHeader>

            <CardContent>

              <div className='space-y-4'>
                <Popover open={open} setOpen={setOpen}>
                  <div className='flex flex-col gap-1'>
                    {countryOptions.map((country) => {
                      return (
                        <div key={`Country-${country}`} className='w-full rounded hover:bg-accent hover:text-accent-foreground cursor-pointer px-4 py-2' onClick={() => { setOpen(false); setCountryFilter(country) }}>
                          {country}
                        </div>
                      )
                    })}
                  </div>
                </Popover>

                {data && <DonutChartComponent data={data} dataFormatter={defaultDataFormatter} />}
              </div>

            </CardContent>
          </Card>

          <Card className="col-span-8">
            <CardHeader>
              <CardTitle>График</CardTitle>
              <CardDescription>Прибыль</CardDescription>
            </CardHeader>
            <CardContent>
              <AreaChart
                className="h-80"
                data={chartdata}
                index="date"
                categories={['Проект 1', 'Проект 2']}
                colors={['indigo', 'rose']}
                valueFormatter={currencyDataFormatter}
                yAxisWidth={90}
              />
            </CardContent>
          </Card>


          <Card className="col-span-9">
            <CardHeader>
              <CardTitle>Столбчатая диаграмма</CardTitle>
              <CardDescription>Количество сотрудников</CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart
                className="mt-6"
                data={barChartData}
                index="name"
                categories={[
                  'Команда A',
                  'Команда B',
                  'Команда C',
                  'Команда D',
                  'Команда E',
                  'Команда F',
                ]}
                colors={['blue', 'teal', 'amber', 'rose', 'indigo', 'emerald']}
                valueFormatter={defaultDataFormatter}
                yAxisWidth={60}
              />
            </CardContent>
          </Card>



          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Дэшборд</CardTitle>
              <CardDescription>Навыки сотрудников</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-tremor-default flex items-center justify-between text-tremor-content dark:text-dark-tremor-content">
                <span>Навык</span>
                <span>Сотр.</span>
              </p>

              <BarList data={barListData} className="mx-auto max-w-sm" />
            </CardContent>
          </Card>

        </div>

      </ScrollArea>
    </>


  )
}

export default App
