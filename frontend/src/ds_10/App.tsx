import React, { useEffect, useState } from 'react'
import './output.css'
import './styles.css'
import { AreaChart, BarChart, BarList, DonutChart, Legend } from '@tremor/react';

// @ts-ignore
import { KoobDataService } from 'bi-internal/services'
import { barChartData, barListData, chartdata, donutData } from '../ds_res/src/data/data';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ds_res/src/components/Card"

import { ScrollArea } from "../ds_res/src/components/scroll-area"

import { currencyDataFormatter, defaultDataFormatter } from '../ds_res/src/lib/utils';

const { koobDataRequest3 } = KoobDataService

function App() {
  // const [data, setData] = useState([])

  // useEffect(() => {
  //   koobDataRequest3(
  //     'course_2024.Student6',
  //     ['categoryname'],
  //     ['sum(order_unitprice)'],
  //     {
  //       customer_country: ['=', 'Мексика'],
  //     },
  //     { schema_name: 'ds_10' },
  //     'course_2024.Student6'
  //   ).then(res => {
  //     const mappedData = res.map((el, i) => {
  //       return {
  //         value: el.order_unitprice,
  //         name: el.categoryname,
  //       }
  //     })
  //     console.log(res)
  //     setData(mappedData)
  //   })
  // }, [])

  return (


    <ScrollArea className="h-full w-full rounded-md border p-4">
      <h1 className='text-3xl text-center'>Тестовая визуализация на фейк данных</h1>
      <div className="grid grid-cols-12 gap-4 my-4 mx-4">
        <Card className="col-span-4">

          <CardHeader>
            <CardTitle>Круговая диаграмма</CardTitle>
            <CardDescription>Количество сотрудников</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col items-center justify-center space-y-6">
              <DonutChart
                data={donutData}
                category="sales"
                index="name"
                valueFormatter={defaultDataFormatter}
                colors={['blue', 'cyan', 'indigo', 'violet', 'fuchsia']}
                className="w-40 z-10"
              />
              <Legend
                categories={['DevOps-инженеры', 'Аналитики', 'Дата-инженеры', 'JS-разработчики', 'Тестировщики']}
                colors={['blue', 'cyan', 'indigo', 'violet', 'fuchsia']}
                className="max-w-xs"
              />
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

  )
}

export default App
