import { BookOpenCheck, CalendarDays, ChevronLeft, ChevronRight, CircleUserRound, Eraser, ListCollapse, Network, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import Popover from './ui/Popover'
import { departments, employee, knowledgeFields, skills } from '../data/data'
import { cn, getCurrentPeriod } from '../lib/utils'
import SelectWithSearch from './ui/SelectWithSearch'
import DatePicker from './DatePicker'
import { urlState, UrlState } from 'bi-internal/core'
import { easeIn, motion } from 'framer-motion'

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
        id: 'date',
        title: "Период",
        icon: <CalendarDays className='text-primary' size={20} strokeWidth={1.5} />,
        popoverContentType: 'DatePicker',
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
        id: 'department',
        title: "Подразделение",
        icon: <Network className='text-primary' size={20} strokeWidth={1.5} />,
        options: departments,
        popoverContentType: 'SelectWithSearch'
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
        <motion.ul
            layout
            transition={{ duration: 0.2, ease: 'linear' }}
            className='flex divide-x border rounded w-fit'>
            {filtersData.map((filter) =>
                <FilterItem filterItemData={filter} />
            )}
        </motion.ul>
    )
}

const FilterItem = ({ filterItemData }: { filterItemData: filterItemDataType }) => {

    const [open, setOpen] = useState(false)

    const urlModel = UrlState.getModel()
    const urlValue = urlModel[filterItemData.id]

    const onItemClick = (value: string) => {
        urlState.updateModel({ [filterItemData.id]: value })
        setOpen(false)
    }


    return (
        <Popover setOpen={setOpen}>
            <Popover.Trigger setOpen={setOpen}>
                <li className={cn('flex gap-2 items-center px-4 py-3 text-black hover:text-primary bg-white hover:bg-secondary cursor-pointer transition-all select-none', open && 'bg-secondary text-primary')}>
                    {filterItemData.icon}
                    <motion.h3
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.2, ease: 'easeIn' }}
                        key={urlValue}
                        className='text-lg'
                    >
                        {filterItemData.popoverContentType === 'DatePicker' ? `${UrlState.getModel().halfyear}-е полугодие ${UrlState.getModel().year}` : urlValue || filterItemData.title}
                    </motion.h3>
                    {filterItemData.popoverContentType === 'DatePicker' && <Trash2 size={20} strokeWidth={1.5} className='text-rose-600' onClick={(e) => { e.stopPropagation(); urlState.updateModel(getCurrentPeriod()) }} />}
                </li>
            </Popover.Trigger>
            <Popover.Content open={open} align='center'>

                {filterItemData.popoverContentType === 'SelectWithSearch' &&
                    <SelectWithSearch options={filterItemData.options} onClick={onItemClick} onReset={() => { setOpen(false); urlState.updateModel({ [filterItemData.id]: undefined }, false) }} />}

                {filterItemData.popoverContentType === 'DatePicker' &&
                    <DatePicker />}

            </Popover.Content>
        </Popover>
    )
}

export default Filters