"use client"

import { ModeToggle } from "@/components/ModeToggle";
import { barChartData, barListData, chartdata, donutData } from "@/data/data";
import { AreaChart, BarChart, BarList, DonutChart, Legend } from '@tremor/react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const currencyDataFormatter = (number: number) =>
  `${Intl.NumberFormat('ru').format(number).toString()} руб`;

const defaultDataFormatter = (number: number) =>
  `${Intl.NumberFormat('ru').format(number).toString()}`;


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center xl:px-40 md:px-24 px-4">
      <header className="w-full">
        <div className="flex flex-row gap-4 justify-between items-center border-b w-full py-4">
          <ul className="flex gap-6">
            <li className="cursor-pointer">Статистика</li>
            <li className="cursor-pointer">Меню</li>
            <li className="cursor-pointer">Разделы</li>
          </ul>
          <ModeToggle />
        </div>
      </header>

      <div className="grid grid-cols-12 gap-4 my-4">
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

    </main>
  );
}
