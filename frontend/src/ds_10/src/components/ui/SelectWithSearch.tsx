import { Eraser, Search, X } from 'lucide-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ScrollArea } from './scroll-area'

const SelectWithSearch = ({ options, onClick, onReset }: { options: string[], onClick: (value: string) => void, onReset: () => void }) => {

    const [filteredOptions, setFilteredOptions] = useState<string[]>(options)

    useEffect(() => {
        setFilteredOptions(options)
    }, [options])

    const updateFilteredOptions = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchInput = event.target.value
        const filteredOptions = options.filter((str) => str.includes(searchInput))
        setFilteredOptions(filteredOptions)
    }

    const inputRef = useRef<HTMLInputElement>(null)

    return (
        <div className='divide-y flex flex-col w-60 max-h-80 select-none'>
            <div className='flex gap-1 w-full items-center px-4 py-1 text-accent-foreground'>
                <Search size={24} strokeWidth={1.5} />
                <input ref={inputRef} onChange={updateFilteredOptions} className='py-1 px-2 outline-none w-full' placeholder='Искать...'></input>
                <X size={24} strokeWidth={1.5} className='cursor-pointer'
                    onClick={() => {
                        inputRef.current.value = ''
                        inputRef.current.focus()
                        setFilteredOptions(options)
                    }}
                />
            </div>
            <ScrollArea className='flex flex-col p-1 gap-1 flex-1'>
                {filteredOptions.length == 0 && <div className='p-1 px-3 text-center text-accent-foreground'>Нет результатов</div>}
                {filteredOptions.map((option) => {
                    return (
                        <div key={`option-${option}`} className='p-1 px-3 cursor-pointer hover:bg-accent rounded transition-all' onClick={() => onClick(option)}>{option}</div>
                    )
                })}
            </ScrollArea>
            <div onClick={onReset} className='flex gap-1 items-center m-1 p-1 px-3 cursor-pointer hover:bg-accent rounded transition-all bg-rose-400 hover:bg-rose-600 text-white'>
                <Eraser />
                Сбросить
            </div>
        </div>
    )
}

export default SelectWithSearch