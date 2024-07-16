import { BookOpenCheck, CalendarDays, ChevronLeft, ChevronRight, CircleUserRound, ListCollapse, Network } from 'lucide-react'
import React, { useState } from 'react'
import Popover from './ui/Popover'
import { departments, employee, knowledgeFields, skills } from '../data/data'
import { cn } from '../lib/utils'
import SelectWithSearch from './SelectWithSearch'
import DatePicker from './DatePicker'
import { urlState, UrlState } from 'bi-internal/core'

type filterItemDataType = filterSelectItemType | filterDateItemType

type filterSelectItemType = {
    id: string
    title: string
    icon: JSX.Element
    options: string[]
    popoverContentType: 'SelectWithSearch'
}

type filterDateItemType = {
    id: string,
    title: string
    icon: JSX.Element
    popoverContentType: 'DatePicker'
}

const filtersData: filterItemDataType[] = [
    {
        id: 'department',
        title: "Подразделение",
        icon: <Network className='text-primary' size={20} strokeWidth={1.5} />,
        options: departments,
        popoverContentType: 'SelectWithSearch'
    },
    {
        id: 'knowledgeField',
        title: "Область знаний",
        icon: <ListCollapse className='text-primary' size={20} strokeWidth={1.5} />,
        options: knowledgeFields,
        popoverContentType: 'SelectWithSearch',
    },
    {
        id: 'skill',
        title: "Навык",
        icon: <BookOpenCheck className='text-primary' size={20} strokeWidth={1.5} />,
        options: skills,
        popoverContentType: 'SelectWithSearch',
    },
    {
        id: 'date',
        title: "Период",
        icon: <CalendarDays className='text-primary' size={20} strokeWidth={1.5} />,
        popoverContentType: 'DatePicker',
    },
    {
        id: 'employee',
        title: "Сотрудник",
        icon: <CircleUserRound className='text-primary' size={20} strokeWidth={1.5} />,
        options: employee,
        popoverContentType: 'SelectWithSearch',
    },
]

const Filters = () => {
    return (
        <ul className='flex divide-x border rounded w-fit'>
            {filtersData.map((filter) =>
                <FilterItem filterItemData={filter} />
            )}
        </ul>
    )
}

const FilterItem = ({ filterItemData }: { filterItemData: filterItemDataType }) => {

    const [open, setOpen] = useState(false)

    const onItemClick = (value: string) => {
        urlState.updateModel({ [filterItemData.id]: value })
        setOpen(false)
    }

    return (
        <Popover setOpen={setOpen}>
            <Popover.Trigger setOpen={setOpen}>
                <li className={cn('flex gap-2 items-center px-4 py-3 text-black hover:text-primary bg-background hover:bg-secondary cursor-pointer transition-all select-none', open && 'bg-secondary text-primary')}>
                    {filterItemData.icon}
                    <h3 className='text-lg'>{filterItemData.title}</h3>
                </li>
            </Popover.Trigger>
            <Popover.Content open={open} align='center'>

                {filterItemData.popoverContentType === 'SelectWithSearch' &&
                    <SelectWithSearch options={filterItemData.options} onClick={onItemClick} />}

                {filterItemData.popoverContentType === 'DatePicker' &&
                    <DatePicker />}

            </Popover.Content>
        </Popover>
    )
}

export default Filters